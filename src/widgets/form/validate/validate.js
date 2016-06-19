
/* =========================================================================
 * Svelto - Widgets - Form Validate
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/validator/validator.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//TODO: Add support for multiple checkboxes validation
//TODO: Add meta validators that accepts other validators as arguments, for example not[email], oppure not[matches[1,2,3]] oppure or[email,url] etc... maybe write it this way: or[matches(1-2-3)/matches(a-b-c)], or just use a smarter regex
//TODO: Maybe make it generic (so that it can be used in single elements) and just call it `validate`

(function ( $, _, Svelto, Widgets, Factory, Validator ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formValidate',
    plugin: true,
    selector: 'form.validate',
    templates: {
      message: '<p class="form-validate-message <%= o.validity %>">' +
                 '<%= o.message %>' +
               '</p>',
      messages: '<ul class="form-validate-message <%= o.validity %>">' +
                  '<% for ( var i = 0, l = o.messages.length; i < l; i++ ) { %>' +
                    '<li><%= o.messages[i] %></li>' +
                  '<% } %>' +
                '</ul>'
    },
    options: {
      validators: { // If not found here it will use `Validator`'s validators
        required ( value ) {
          return !Validator.empty ( value );
        },
        values ( value, ...values ) {
          return Validator.included ( value, values );
        },
        field ( value, fieldName ) {
          let fieldValue = _.find ( this.elements, { name: fieldName } ).value;
          return ( value === fieldValue );
        },
        checked () {
          return this.element.$element.prop ( 'checked' );
        },
        regex ( value, regex ) {
          return !!value.match ( new RegExp ( regex ) );
        }
      },
      messages: {
        form: {
          invalid: 'The form contains some errors',
        },
        validators: {
          invalid: {
            general: 'This value is not valid',
            alpha: 'Only alphabetical characters are allowed',
            alphanumeric: 'Only alphanumeric characters are allowed',
            hexadecimal: 'Only hexadecimal characters are allowed',
            number: 'Only numbers are allowed',
            integer: 'Only integers numbers are allowed',
            float: 'Only floating point numbers are allowed',
            min: 'The number must be at least $2',
            max: 'The number must be at maximum $2',
            range: 'The number must be between $2 and $3',
            minLength: 'The length must be at least $2',
            maxLength: 'The length must be at maximum $2',
            rangeLength: 'The length must be between $2 and $3',
            exactLength: 'The length must be exactly $2',
            email: 'Enter a valid email address',
            creditCard: 'Enter a valid credit card number',
            ssn: 'Enter a valid Social Security Number',
            ipv4: 'Enter a valid IPv4 address',
            url: 'Enter a valid URL',
            required: 'This field is required',
            values: 'This value is not allowed',
            field: 'The two fields don\'t match',
            checked: 'This must be checked'
          }
        }
      },
      characters: {
        separators: {
          validations: '|',
          arguments: ','
        }
      },
      regexes: {
        validation: /^([^\[]+)(?:\[(.*)\])?$/
      },
      datas: {
        id: '_fveid',
        validations: 'validations',
        messages: {
          invalid: 'invalid',
          valid: 'valid'
        }
      },
      classes: {
        invalid: 'invalid',
        valid: 'valid'
      },
      selectors: {
        element: 'input:not([type="button"]), textarea, select',
        textfield: 'input:not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea',
        wrapper: '.checkbox, .colorpicker, .datepicker, .editor, .radio, .select, .slider, .switch'
      }
    }
  };

  /* FORM VALIDATE */

  class FormValidate extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$form = this.$element;
      this.$elements = this.$form.find ( this.options.selectors.element );
      this.$textfields = this.$elements.filter ( this.options.selectors.textfield );

      this.___elements ();

    }

    _events () {

      this.___change ();
      this.___focus ();
      this.___blur ();
      this.___submit ();

    }

    /* ELEMENTS */

    ___elements () {

      this.elements = {};

      for ( let element of this.$elements ) {

        let $element = $(element),
            $wrappers = $element.parents ( this.options.selectors.wrapper ),
            isWrapped = !!$wrappers.length,
            $wrapper = isWrapped ? $wrappers.first () : $element,
            id = $.guid++,
            validationsStr = $element.data ( this.options.datas.validations ),
            validations = false;

        if ( validationsStr ) {

          validations = {};

          let validationsArr = validationsStr.split ( this.options.characters.separators.validations );

          for ( let validationStr of validationsArr ) {

            let matches = validationStr.match ( this.options.regexes.validation );

            if ( !matches ) continue;

            let validationName = matches[1],
                validationArgs = matches[2] ? matches[2].split ( this.options.characters.separators.arguments ) : [],
                validator = this.options.validators[validationName] || Validator[validationName];

            if ( !validator ) continue;

            validations[validationName] = {
              args: validationArgs,
              validator: validator
            };

          }

          if ( _.isEmpty ( validations ) ) {

            validations = false;

          }

        }

        element[this.options.datas.id] = id;

        this.elements[id] = {
          id: id,
          $element: $element,
          $wrapper: $wrapper,
          $message: false,
          name: element.name,
          value: $element.val (),
          validations: validations,
          isDirty: false,
          isValid: undefined,
          messages: {
            invalid: isWrapped ? $element.data ( this.options.datas.messages.invalid ) || $wrapper.data ( this.options.datas.messages.invalid ) : $element.data ( this.options.datas.messages.invalid ),
            valid: isWrapped ? $element.data ( this.options.datas.messages.valid ) || $wrapper.data ( this.options.datas.messages.valid ) : $element.data ( this.options.datas.messages.valid )
          }
        };

      }

    }

    /* UPDATE */

    _updateElement ( elementObj ) {

      /* FORM */

      this._isValid = undefined;

      /* ELEMENT */

      elementObj.isDirty = true;
      elementObj.isValid = undefined;

      this._validateWorker ( elementObj );

      /* OTHERS */

      for ( let id in this.elements ) {

        if ( this.elements.hasOwnProperty ( id ) ) {

          if ( id === elementObj.id ) continue;

          let otherElementObj = this.elements[id],
              isDepending = otherElementObj.validations && 'field' in otherElementObj.validations && otherElementObj.validations.field.args.indexOf ( elementObj.name ) !== -1,
              hasSameName = !_.isEmpty ( elementObj.name ) && otherElementObj.name === elementObj.name;

          if ( isDepending || hasSameName ) {

            otherElementObj.isValid = undefined;

            this._validateWorker ( otherElementObj );

          }

        }

      }

    }

    _updateElements () {

      for ( let id in this.elements ) {

        if ( this.elements.hasOwnProperty ( id ) ) {

          this._updateElement ( this.elements[id] );

        }

      }

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$elements, 'change', this.__change );

    }

    __change ( event ) {

      this._updateElement ( this.elements[event.currentTarget[this.options.datas.id]] );

    }

    /* FOCUS */

    ___focus () {

      this._on ( this.$textfields, 'focus', this.__focus );

    }

    __focus ( event ) {

      let elementObj = this.elements[event.currentTarget[this.options.datas.id]];

      elementObj.isValid = undefined;

      this.__indeterminate ( elementObj );

    }

    /* BLUR */

    ___blur () {

      this._on ( this.$textfields, 'blur', this.__blur );

    }

    __blur ( event ) {

      let elementObj = this.elements[event.currentTarget[this.options.datas.id]];

      this._validateWorker ( elementObj );

    }

    /* SUBMIT */

    ___submit () {

      this._on ( true, 'submit', this.__submit );

    }

    __submit ( event ) {

      this._updateElements ();

      if ( !this.isValid () ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        $.toast ( this.options.messages.form.invalid );

      }

    }

    /* VALIDATION */

    _validateWorker ( elementObj ) {

      if ( _.isUndefined ( elementObj.isValid ) ) {

        let result = this._validate ( elementObj ),
            isValid = ( result === true );

        elementObj.isValid = isValid;

        if ( isValid ) {

          this.__valid ( elementObj );

        } else {

          this.__invalid ( elementObj, result );

        }

      }

    }

    _validate ( elementObj ) {

      let errors = [],
          validations = elementObj.validations;

      if ( elementObj.isDirty ) {

        elementObj.value = elementObj.$element.val ();

        elementObj.isDirty = false;

      }

      if ( validations ) {

        for ( let name in validations ) {

          if ( validations.hasOwnProperty ( name ) ) {

            let validation = validations[name],
                isValid = validation.validator.apply ( { elements: this.elements, element: elementObj }, [elementObj.value].concat ( validation.args ) );

            if ( !isValid ) {

              let error = _.format ( this.options.messages.validators.invalid[name] || this.options.messages.validators.invalid.general, elementObj.value, ...validation.args );

              errors.push ( error );

            }

          }

        }

      }

      return _.isEmpty ( errors ) ? true : errors;

    }

    /* STATE */

    __indeterminate ( elementObj ) {

      elementObj.$wrapper.removeClass ( this.options.classes.invalid + ' ' + this.options.classes.valid );

      this._updateMessage ( elementObj, false );

    }

    __valid ( elementObj ) {

      elementObj.$wrapper.removeClass ( this.options.classes.invalid ).addClass ( this.options.classes.valid );

      this._updateMessage ( elementObj, elementObj.messages.valid );

    }

    __invalid ( elementObj, errors ) {

      elementObj.$wrapper.removeClass ( this.options.classes.valid ).addClass ( this.options.classes.invalid );

      this._updateMessage ( elementObj, elementObj.messages.invalid || errors );

    }

    /* ERRORS */

    _updateMessage ( elementObj, message ) {

      if ( elementObj.$message ) {

        elementObj.$message.remove ();

      }

      if ( message ) {

        let validity = elementObj.isValid ? this.options.classes.valid : this.options.classes.invalid,
            msgHtml = _.isString ( message )
                        ? this._template ( 'message', { message: message, validity: validity } )
                        : message.length === 1
                          ? this._template ( 'message', { message: message[0], validity: validity } )
                          : this._template ( 'messages', { messages: message, validity: validity } );

        elementObj.$message = $(msgHtml);

        elementObj.$wrapper.after ( elementObj.$message );

      } else {

        elementObj.$message = false;

      }

    }

    /* API */

    isValid () {

      if ( _.isUndefined ( this._isValid ) ) {

        for ( let id in this.elements ) {

          if ( this.elements.hasOwnProperty ( id ) ) {

            let elementObj = this.elements[id];

            if ( _.isUndefined ( elementObj.isValid ) ) {

              this._validateWorker ( elementObj );

            }

            if ( !elementObj.isValid ) {

              this._isValid = false;

            }

          }

        }

        if ( _.isUndefined ( this._isValid ) ) {

          this._isValid = true;

        }

      }

      return this._isValid;

    }

  }

  /* FACTORY */

  Factory.init ( FormValidate, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Validator ));
