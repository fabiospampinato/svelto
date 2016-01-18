
/* =========================================================================
 * Svelto - formValidate
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../validator/validator.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//TODO: Add meta validators that accepts other validators as arguments, for example not[email], oppure not[matches[1,2,3]] oppure or[email,url] etc... maybe write it this way: or[matches(1-2-3)/matches(a-b-c)], or just use a smarter regex

(function ( $, _, Svelto, Widgets, Factory, Validator ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formValidate',
    plugin: true,
    selector: 'form.validate',
    templates: {
      message: '<p class="form-validate-message {%=o.validity%}">' +
                 '{%=o.message%}' +
               '</p>',
      messages: '<ul class="form-validate-message {%=o.validity%}">' +
                  '{% for ( var i = 0, l = o.messages.length; i < l; i++ ) { %}' +
                    '<li>{%=o.messages[i]%}</li>' +
                  '{% } %}' +
                '</ul>'
    },
    options: {
      validators: {
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
            min: 'The number must be at least $1',
            max: 'The number must be at maximum $1',
            range: 'The number must be between $1 and $2',
            minLength: 'The lenght must be at least $1',
            maxLength: 'The lenght must be at maximum $1',
            rangeLength: 'The length must be between $1 and $2',
            exactLength: 'The length must be exactly $1',
            email: 'Enter a valid email address',
            cc: 'Enter a valid credit card number',
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
        element: 'input, textarea, select',
        textfield: 'input:not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea',
        wrapper: '.checkbox, .radio, .select-toggler, .slider, .switch, .datepicker, .colorpicker'
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

      /* CHANGE */

      this._on ( true, this.$elements, 'change', this.__change );

      /* FOCUS */

      this._on ( this.$textfields, 'focus', this.__focus );

      /* BLUR */

      this._on ( this.$textfields, 'blur', this.__blur );

      /* SUBMIT */

      this._on ( true, 'submit', this.__submit );

    }

    /* ELEMENTS */

    ___elements () {

      this.elements = {};

      for ( let element of this.$elements ) {

        let $element = $(element),
            $wrappers = $element.parents ( this.options.selectors.wrapper ),
            $wrapper = $wrappers.length ? $wrappers.first () : $element,
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
            invalid: $wrapper.data ( this.options.datas.messages.invalid ),
            valid: $wrapper.data ( this.options.datas.messages.valid )
          }
        };

      }

    }

    /* CHANGE */

    __change ( event ) {

      /* FORM */

      this._isValid = undefined;

      /* ELEMENT */

      let elementObj = this.elements[event.currentTarget[this.options.datas.id]];

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

    /* FOCUS */

    __focus ( event ) {

      let elementObj = this.elements[event.currentTarget[this.options.datas.id]];

      elementObj.isValid = undefined;

      this.__indeterminate ( elementObj );

    }

    /* BLUR */

    __blur ( event ) {

      let elementObj = this.elements[event.currentTarget[this.options.datas.id]];

      this._validateWorker ( elementObj );

    }

    /* SUBMIT */

    __submit ( event ) {

      if ( !this.isValid () ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        $.noty ( this.messages.invalid );

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
                        ? this._tmpl ( 'message', { message: message, validity: validity } )
                        : message.length === 1
                          ? this._tmpl ( 'message', { message: message[0], validity: validity } )
                          : this._tmpl ( 'messages', { messages: message, validity: validity } );

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
