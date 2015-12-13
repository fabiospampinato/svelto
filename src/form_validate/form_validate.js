
/* =========================================================================
 * Svelto - formValidate
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Maybe also disable submitters when it's not valid
//TODO: Add meta validators that accepts other validators as arguments, for example not[email], oppure not[matches[1,2,3]] oppure or[email,url,alphanumeric] etc... maybe write it this way: or[matches(1-2-3)/matches(a-b-c)], or just use a smarter regex
//FIXME: Handle the case where a textfield changes but is also focused, will happen if we are validating a live synced form

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formValidate',
    selector: 'form.validate', //FIXME: Deduce from [data-validations] on child node instead, like: $root.find ( '[data-validations]' ).parents ( 'form' ).formValidate ();
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
        /* TYPE */
        alpha ( value ) {
          let re = /^[a-zA-Z]+$/;
          return value.match ( re ) ? true : 'Only alphabetical characters are allowed';
        },
        alphanumeric ( value ) {
          let re = /^([a-zA-Z0-9]+)$/;
          return value.match ( re ) ? true : 'Only alphanumeric characters are allowed';
        },
        hexadecimal ( value ) {
          let re = /^[0-9a-fA-F]+$/;
          return value.match ( re ) ? true : 'Only hexadecimal characters are allowed';
        },
        number ( value ) {
          let re = /^-?[0-9]+.?(?:[0-9]?)+$/;
          return value.match ( re ) ? true : 'Only numbers are allowed';
        },
        integer ( value ) {
          let re = /^(?:-?(?:0|[1-9][0-9]*))$/;
          return value.match ( re ) ? true : 'Only integers numbers are allowed';
        },
        float ( value ) {
          let re = /^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/; //FIXME: We are also matching the scientific notation here, this might be unwanted, expecially if a language that doesn't support this notation has to take care of it //FIXME: We are also matching the empty string
          return value.match ( re ) ? true : 'Only floating point numbers are allowed';
        },
        /* NUMBER */
        min ( value, min ) {
          return ( Number ( value ) >= Number ( min ) ) ? true : 'The number must be at least ' + min;
        },
        max ( value, max ) {
          return ( Number ( value ) <= Number ( max ) ) ? true : 'The number must be at maximum ' + max;
        },
        range ( value, min, max ) {
          value = Number ( value );
          return ( value >= Number ( min ) && value <= Number ( max ) ) ? true : 'The number must be between ' + min + ' and ' + max;
        },
        /* STRING */
        minLength ( value, minLength ) {
          return ( value.trim ().length >= Number ( minLength ) ) ? true : 'The lenght must be at least ' + minLength;
        },
        maxLength ( value, maxLength ) {
          return ( value.trim ().length <= Number ( maxLength ) ) ? true : 'The lenght must be at maximum ' + maxLength;
        },
        rangeLength ( value, minLength, maxLength ) {
          value = value.trim ();
          return ( value.length >= Number ( minLength ) && value.length <= Number ( maxLength ) ) ? true : 'The length must be between ' + minLength + ' and ' + maxLength;
        },
        exactLength ( value, length ) {
          return ( value.trim ().length === Number ( length ) ) ? true : 'The length must be exactly ' + length;
        },
        /* THINGS */
        email ( value ) {
          let re = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
          return value.match ( re ) ? true : 'Enter a valid email address';
        },
        cc ( value ) {
          let re = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
          return value.match ( re ) ? true : 'Enter a valid credit card number';
        },
        ssn ( value ) {
          let re = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
          return value.match ( re ) ? true : 'Enter a valid Social Security Number';
        },
        ipv4 ( value ) {
          let re = /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;
          return value.match ( re ) ? true : 'Enter a valid IPv4 address';
        },
        url ( value ) {
          let re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
          return value.match ( re ) ? true : 'Enter a valid URL';
        },
        /* OTHERS */
        required ( value ) {
          return ( value.trim ().length > 0 ) ? true : 'This field is required';
        },
        matches ( value ) {
          let matches = _.slice ( arguments, 1 );
          return ( matches.indexOf ( value.toLowerCase () ) !== -1 ) ? true : 'This value is not allowed';
        },
        matchesField ( value, fieldName ) {
          let fieldValue = _.find ( this.elements, { name: fieldName } ).value;
          return ( value === fieldValue ) ? true : 'The two fields don\'t match';
        },
        checked () {
          return this.element.$element.prop ( 'checked' ) ? true : 'This must be checked';
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
        disabled: 'disabled',
        invalid: 'invalid',
        valid: 'valid'
      },
      selectors: {
        element: 'input, textarea, select',
        textfield: 'input:not(button):not([type="checkbox"]):not([type="radio"]), textarea',
        wrapper: '.checkbox, .radio, .select-toggler, .slider, .switch, .datepicker, .colorpicker',
        submitter: 'input[type="submit"], button[type="submit"]'
      }
    }
  };

  /* FORM VALIDATE */

  class FormValidate extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$form = this.$element;
      this.$elements = this.$form.find ( this.options.selectors.element );
      this.$textfields = this.$elements.filter ( this.options.selectors.textfield );
      this.$submitters = this.$form.find ( this.options.selectors.submitter );

      this.___elements ();

    }

    _events () {

      /* CHANGE */

      this._on ( this.$elements, 'change', this.__change );

      /* FOCUS */

      this._on ( this.$textfields, 'focus', this.__focus );

      /* BLUR */

      this._on ( this.$textfields, 'blur', this.__blur );

      /* SUBMIT */

      this._on ( 'submit', this.__submit );

    }

    /* ELEMENTS */

    ___elements () {

      this.elements = {};

      for ( let element of this.$elements ) {

        let $element = $(element),
            $wrappers = $element.parents ( this.options.selectors.wrapper ),
            $wrapper = ( $wrappers.length > 0 ) ? $wrappers.first () : $element,
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
                validator = this.options.validators[validationName];

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

        if ( id === elementObj.id ) continue;

        let otherElementObj = this.elements[id],
            isDepending = otherElementObj.validations && 'matchesField' in otherElementObj.validations && otherElementObj.validations.matchesField.args.indexOf ( elementObj.name ) !== -1,
            hasSameName = !_.isEmpty ( elementObj.name ) && otherElementObj.name === elementObj.name;

        if ( isDepending || hasSameName ) {

          otherElementObj.isValid = undefined;

          this._validateWorker ( otherElementObj );

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

        $.noty ( 'The form contains some errors' );

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

          let validation = validations[name],
              result = validation.validator.apply ( { elements: this.elements, element: elementObj }, [elementObj.value].concat ( validation.args ) );

          if ( result !== true ) {

            errors.push ( !_.isString ( result ) ? 'This value is not valid' : result );

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

          let elementObj = this.elements[id];

          if ( _.isUndefined ( elementObj.isValid ) ) {

            this._validateWorker ( elementObj );

          }

          if ( !elementObj.isValid ) {

            this._isValid = false;

          }

        }

        if ( _.isUndefined ( this._isValid ) ) {

          this._isValid = true;

        }

      }

      return this._isValid;

    }

  }

  /* BINDING */

  Svelto.FormValidate = FormValidate;
  Svelto.FormValidate.config = config;

  /* FACTORY */

  $.factory ( Svelto.FormValidate );

}( Svelto.$, Svelto._, window, document ));
