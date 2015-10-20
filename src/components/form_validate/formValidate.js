
/* =========================================================================
 * Svelto - formValidate
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//TODO: Show error message
//TODO: Add meta validators that accepts other validators as arguments, for example not[email], oppure not[matches[1,2,3]] oppure oneOf[email,url,alphanumeric] etc... maybe write it this way: oneOf[matches(1-2-3)/matches(a-b-c)]

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formValidate',
    options: {
      validators: {
        /* TYPE */
        alpha ( value ) {
          var re = /^[a-zA-Z]+$/;
          return value.match ( re ) ? true : 'Only alphabetical characters are allowed';
        },
        alphanumeric ( value ) {
          var re = /^([a-zA-Z0-9]+)$/;
          return value.match ( re ) ? true : 'Only alphanumeric characters are allowed';
        },
        hexadecimal ( value ) {
          var re = /^[0-9a-fA-F]+$/;
          return value.match ( re ) ? true : 'Only hexadecimal characters are allowed';
        },
        number ( value ) {
          var re = /^-?[0-9]+$/; //FIXME: It is supposed to match both integers and floats, but it doesn't
          return value.match ( re ) ? true : 'Only numbers are allowed';
        },
        integer ( value ) {
          var re = /^(?:-?(?:0|[1-9][0-9]*))$/;
          return value.match ( re ) ? true : 'Only integers numbers are allowed';
        },
        float ( value ) {
          var re = /^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/; //FIXME: We are also matching the scientific notation here, this might be unwanted, expecially if a language that doesn't support this notation has to take care of it
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
          var re = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
          return value.match ( re ) ? true : 'Enter a valid email address';
        },
        cc ( value ) {
          var re = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
          return value.match ( re ) ? true : 'Enter a valid credit card number';
        },
        ssn ( value ) {
          var re = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
          return value.match ( re ) ? true : 'Enter a valid Social Security Number';
        },
        ipv4 ( value ) {
          var re = /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;
          return value.match ( re ) ? true : 'Enter a valid IPv4 address';
        },
        url ( value ) {
          var re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
          return value.match ( re ) ? true : 'Enter a valid URL';
        },
        /* OTHERS */
        required ( value ) {
          return ( value.trim ().length > 0 ) ? true : 'This field is required';
        },
        matches ( value ) {
          var matches = _.slice ( arguments, 1 );
          return ( matches.indexOf ( value.toLowerCase () ) !== -1 ) ? true : 'This value is not allowed';
        },
        matchesField ( value, fieldName ) {
          var fieldValue = _.find ( this, { name: fieldName } ).value;
          return ( value === fieldValue ) ? true : 'The two fields don\'t match';
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
        validations: 'validations'
      },
      classes: {
        disabled: 'disabled',
        invalid: 'invalid',
        valid: 'valid'
      },
      selectors: {
        element: 'input, textarea',
        wrapper: '.input-wrp, .textarea-wrp, .button.checkbox, .button.radio, .select-btn, .slider, .switch, .datepicker, .colorpicker',
        submitter: 'input[type="submit"], button[type="submit"]'
      },
      callbacks: {
        //TODO: Add some callbacks
      }
    }
  };

  /* FORM VALIDATE */

  class FormValidate extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '[data-validations]' ).parents ( 'form' ).formValidate ();

    }

    _variables () {

      this.$form = this.$element;
      this.$elements = this.$element.find ( this.options.selectors.element );
      this.$submitters = this.$element.find ( this.options.selectors.submitter );

      this.___elements ();

    }

    _events () {

      /* CHANGE */

      this._on ( this.$elements, 'change', this.__change );

      /* FOCUS */

      this._on ( this.$elements, 'focus', this.__focus );

      /* BLUR */

      this._on ( this.$elements, 'blur', this.__blur );

      /* SUBMIT */

      this._on ( 'submit', this.__submit );

    }

    /* ELEMENTS */

    ___elements () {

      this.elements = {};

      for ( let element of $elements ) {

        let $element = $(element),
            name = element.name,
            validationsStr = $element.data ( this.options.datas.validations );

        if ( validationsStr ) {

          let validations = {},
              validationsArr = validationsStr.split ( this.options.characters.separators.validations );

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

          if ( _.size ( validations ) === 0 ) {

            validations = false;

          }

        } else {

          let validations = false;

        }

        this.elements[name] = {
          $element: $element,
          $wrapper: $element.parents ( this.options.selectors.wrapper ).first (),
          name: name,
          dirty: false,
          value: $element.val (),
          validations: validations,
          isValid: undefined
        };

      }

    }

    /* CHANGE */

    __change ( event, element ) {

      var elementObj = this.elements[element.name];

      elementObj.dirty = true;

      if ( elementObj.isValid !== undefined ) {

        elementObj.isValid = undefined;

        this.__indeterminate ( elementObj );

      }

      for ( var name in this.elements ) {

        var relativeElementObj = this.elements[name];

        if ( relativeElementObj.validations && relativeElementObj.validations['matchesField'] && relativeElementObj.validations['matchesField'].args.indexOf ( elementObj.name ) !== -1 ) {

          this.__indeterminate ( relativeElementObj );

        }

      }

      if ( document.activeElement !== element ) {

        this._validateWorker ( elementObj );

      }

    }

    /* FOCUS */

    __focus ( event, element ) {

      var elementObj = this.elements[element.name];

      elementObj.isValid = undefined;

      this.__indeterminate ( elementObj );

    }

    /* BLUR */

    __blur ( event, element ) {

      var elementObj = this.elements[element.name];

      this._validateWorker ( elementObj );

    }

    /* SUBMIT */

    __submit ( event ) {

      if ( !this.isValid () ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

      }

    }

    /* ELEMENT */

    _validateWorker ( elementObj ) {

      if ( elementObj.isValid === undefined ) {

        var result = this._validate ( elementObj ),
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

      var errors = {},
          validations = elementObj.validations;

      if ( elementObj.dirty ) {

        elementObj.value = elementObj.$element.val ();

        elementObj.dirty = false;

      }

      if ( validations ) {

        for ( var name in validations ) {

          var validation = validations[name],
              result = validation.validator.apply ( this.elements, [elementObj.value].concat ( validation.args ) );

          if ( result !== true ) {

            errors[name] = !_.isString ( result ) ? 'This value is not valid' : result;

          }

        }

      }

      var isValid = ( _.size ( errors ) === 0 );

      return isValid ? true : errors;

    }

    __indeterminate ( elementObj ) {

      elementObj.$wrapper.removeClass ( this.options.classes.invalid + ' ' + this.options.classes.valid );

    }

    __valid ( elementObj ) {

      elementObj.$wrapper.removeClass ( this.options.classes.invalid ).addClass ( this.options.classes.valid );

    }

    __invalid ( elementObj, errors ) {

      elementObj.$wrapper.removeClass ( this.options.classes.valid ).addClass ( this.options.classes.invalid );

    }

    /* API */

    isValid () {

      for ( var name in this.elements ) {

        var elementObj = this.elements[name];

        if ( elementObj.isValid === undefined ) {

          this._validateWorker ( elementObj );

        }

      }

      for ( var name in this.elements ) {

        var elementObj = this.elements[name];

        if ( elementObj.isValid === false ) {

          return false;

        }

      }

      return true;

    }

  }

  /* BINDING */

  Svelto.FormValidate = FormValidate;
  Svelto.FormValidate.config = config;

  /* FACTORY */

  $.factory ( Svelto.FormValidate );

}( jQuery, _, window, document ));
