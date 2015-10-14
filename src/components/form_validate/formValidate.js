
/* =========================================================================
 * Svelto - formValidate v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//TODO: Make it working
//TODO: Add special validators that accepts other validators as arguments, for example not[email], oppure not[matches[1,2,3]] oppure oneOf[email,url,alphanumeric] etc... maybe write it this way: oneOf[matches(1-2-3)/matches(a-b-c)]

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* FORM VALIDATE */

  $.factory ( 'svelto.formValidate', {

    /* OPTIONS */

    options: {
      validators: {
        required: function ( val ) {
            return ( val.trim() != "" ) ? true : "This field is required";
        },
        email: function ( val ) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return ( val.match(re) ) ? true : "Enter a valid email";
        },
        captcha: function ( val, captcha ) {
            return ( val == captcha ) ? true : "The captcha is wrong";
        },
        matches: function ( val, allowed ) {
            return ( $.isArray ( allowed ) ? $.inArray ( val, allowed ) !== -1 : val == allowed ) ? true : "This value is not allowed";
        },
        notMatches: function ( val, disallowed ) {
            return ( $.isArray ( disallowed ) ? $.inArray ( val, disallowed ) === -1 : val != disallowed ) ? true : "This value is not allowed";
        },
        matchesField: function ( val, field_name ) {
            var field = $(this),
                other_field = field.closest("form").find('[name='+field_name+']');
            return ( val == other_field.val() ) ? true : "The two fields don't match each other";
        },
        matchesPassword: function ( val, field_name ) {
            var field = $(this),
                other_field = field.closest("form").find('[name='+field_name+']');
            return ( val == other_field.val() ) ? true : "The two passwords don't match each other";
        },
        creditCard: function ( val ) {
            var re = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
            return ( val.match(re) ) ? true : "Enter a valid credit card number";
        },
        ip: function ( val ) {
            var re_ipv4 = /^(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)$/,
                re_ipv6 = /^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/;
            return ( val.match(re_ipv4) || val.match(re_ipv6) ) ? true: "Enter a valid IP address";
        },
        alpha: function ( val ) {
            var re = /^[a-zA-Z]+$/;
            return ( val.match(re) ) ? true : "Only alphabetical characters are allowed";
        },
        alphanumeric: function ( val ) {
            var re = /^([a-zA-Z0-9]+)$/;
            return ( val.match(re) ) ? true : "Only alphanumeric characters are allowed";
        },
        numeric: function ( val ) {
            var re = /^-?[0-9]+$/;
            return ( val.match(re) ) ? true : "Only numerical characters are allowed";
        },
        integer_nr: function ( val ) {
            var re = /^(?:-?(?:0|[1-9][0-9]*))$/;
            return ( val.match(re) ) ? true : "Only integers are allowed";
        },
        float_nr: function ( val ) {
            var re = /^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;
            return ( val.match(re) ) ? true : "Only float numbers are allowed";
        },
        hexcolor: function ( val ) {
            var re = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
            return ( val.match(re) ) ? true : "Enter a valid hex color";
        },
        resolution: function ( val ) {
            var re = /^(\d+x\d+)/i;
            return ( val.match(re) ) ? true : "Enter a valid resolution";
        },
        url: function ( val ) {
            var re = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
            return ( val.match(re) ) ? true : "Enter a valid url";
        },
        date: function ( val ) {
            var re = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
            return ( val.match(re) ) ? true : "Enter a valid date";
        },
        phone: function ( val ) {
            var re = /^[2-9]\d{2}-\d{3}-\d{4}$/;
            return ( val.match(re) ) ? true : "Enter a valid phone number";
        },
        min: function ( val, min_value ) {
            return ( val >= min_value ) ? true : "The minimum allowed value is: " + min_value;
        },
        max: function ( val, max_value ) {
            return ( val <= max_value ) ? true : "The maximum allowed value is: " + max_value;
        },
        range: function ( val, range ) {
            var min_value = range[0],
                 max_value = range[1];
            return ( val >= min_value && val <= max_value ) ? true : "The value must be between " + min_value + " and " + max_value;
        },
        minLength: function ( val, min_value ) {
            return ( val.length >= min_value ) ? true : "The minimum allowed length is: " + min_value;
        },
        maxLength: function ( val, max_value ) {
            return ( val.length <= max_value ) ? true : "The maximum allowed length is: " + max_value;
        },
        rangeLength: function ( val, range ) {
            var min_value = range[0],
                 max_value = range[1];
            return ( val.length >= min_value && val.length <= max_value ) ? true : "The length must be between " + min_value + " and " + max_value;
        },
        exactLength: function ( val, length ) {
            return ( val.length == length ) ? true : "The length bust be exactly equals to: " + length;
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
        elements: 'input, textarea',
        submitter: ':submit',
      },
      callbacks: {
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$form = this.$element;
      this.$elements = this.$element.find ( this.options.selectors.elements );
      this.$submitters = this.$element.find ( this.options.selectors.submitter );

    },

    _init: function () {

      this._validateForm ();

    },

    _events: function () {

      /* SUBMIT */

      this._on ( 'submit', this.__submit );

    },

    /* SUBMIT */

    __submit: function ( event ) {

      if ( this._validateForm () !== true ) {

        event.prenvetDefault ();
        event.stopImmediatePropagation ();

        $.noty ( 'The form contains come errors, check it again' );

      }

    },

    _validateForm: function () {

      var errors = {};

      for ( var i = 0, l = this.$elements.length; i < l; i++ ) {

        var $element = this.$elements.eq ( i ),
            name = $element.attr ( 'name' ),
            validations = $element.data ( this.options.datas.validations );

        if ( !validations ) continue;

        var result = this._validateElement ( $element, validations );

        if ( result !== true ) {

          errors[name] = result;

        }

      }

      return ( _.size ( errors ) === 0 ) ? true : errors;

    },

    _validateElement: function ( $element, validations ) {

      var errors = {};

      validations = validations.split ( this.options.characters.separators.validations );

      for ( var i = 0, l = validations.length; i < l; i++ ) {

        var validation = validations[i],
            matches = validation.match ( this.options.regexes.validation );

        if ( !matches ) continue;

        var name = matches[1],
            args = matches[2] ? matches[2].split ( this.options.characters.separators.arguments ) : undefined,
            validator = this.options.validators[name];

        if ( !validator ) continue;

        var result = validator.apply ( this.$form, args ? [$element].concat ( args ) : [$element] );

        if ( result !== true ) {

          errors[name] = result;

        }

      }

      return ( _.size ( errors ) === 0 ) ? true : errors;

    },

    __invalid: function ( errors ) {

      this.$submitters.addClass ( this.options.classes.disabled );

    },

    __valid : function () {

      this.$submitters.removeClass ( this.options.classes.disabled );

    }

  });

  /* READY */

  $(function () {

    $('.form.validate').formValidate ();

  });

}( jQuery, _, window, document ));
