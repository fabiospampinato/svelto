
/* =========================================================================
 * Svelto - Select (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../dropdown/dropdown.js
 * ========================================================================= */

//TODO: Add support for selecting multiple options (with checkboxes maybe)
//TODO: Add an input field for searching through the options

//FIXME: Doesn't work when the page is scrolled (check in the components/form)
//FIXME: It shouldn't select the first one if none of them is selected

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectToggler',
    selector: '.select-toggler',
    templates: {
      base: '<div class="dropdown select-dropdown attached card outlined {%=o.guc%}">' +
              '<div class="card-block">' +
                '{% for ( var i = 0, l = o.options.length; i < l; i++ ) { %}' +
                  '{% include ( "selectToggler." + ( o.options[i].value ? "option" : "optgroup" ), o.options[i] ); %}' +
                '{% } %}' +
              '</div>' +
            '</div>',
      optgroup: '<div class="divider">' +
                  '{%=o.prop%}' +
                '</div>',
      option: '<div class="button" data-value="{%=o.prop%}">' +
                '{%=o.value%}' +
              '</div>'
    },
    options: {
      classes: {
        selected: 'active'
      },
      selectors: {
        select: 'select',
        option: 'option',
        label: '.select-label',
        valueholder: '.valueholder',
        button: '.button'
      },
      callbacks: {
        open () {},
        close () {},
        change () {}
      }
    }
  };

  /* SELECT TOGGLER */

  class SelectToggler extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$toggler = this.$element;
      this.$select = this.$toggler.find ( this.options.selectors.select );
      this.$options = this.$select.find ( this.options.selectors.option );
      this.$label = this.$toggler.find ( this.options.selectors.label );
      this.$valueholder = this.$toggler.find ( this.options.selectors.valueholder );

      this.guc = 'select-dropdown-' + this.guid;

      if ( this.$valueholder.length === 0 ) {

        this.$valueholder = this.$label;

      }

      this.selectOptions = [];

      this.$dropdown = false;
      this.$buttons = false;

    }

    _init () {

      this._updateValueholder ();

      if ( !$.browser.is.touchDevice ) {

        this.$select.addClass ( 'hidden' );

        this.___selectOptions ();
        this.___dropdown ();

      }

    }

    _events () {

      /* CHANGE */

      this._on ( this.$select, 'change', this.__change );

      if ( !$.browser.is.touchDevice ) {

        /* BUTTON TAP */

        this._on ( this.$buttons, Pointer.tap, this.__tap );

      }

    }

    /* CHANGE */

    __change () {

      this._update ();

      this._trigger ( 'change' );

    }

    /* BUTTON TAP */

    __tap ( event ) {

      this.$select.val ( $(event.currentTarget).data ( 'value' ) ).trigger ( 'change' );

    }

    /* PRIVATE */

    ___selectOptions () { //FIXME: Add support for arbitrary number of optgroups levels

      let previousOptgroup,
          currentOptgroup;

      for ( let option of this.$options ) {

        let $option = $(option),
            $parent = $option.parent ();

        if ( $parent.is ( 'optgroup' ) ) {

          currentOptgroup = $parent.attr ( 'label' );

          if ( currentOptgroup !== previousOptgroup ) {

            previousOptgroup = currentOptgroup;

            this.selectOptions.push ({
              prop: currentOptgroup
            });

          }

        }

        this.selectOptions.push ({
          value: $option.html (),
          prop: $option.attr ( 'value' )
        });

      }

    }

    ___dropdown () {

      let html = this._tmpl ( 'base', { guc: this.guc, options: this.selectOptions } );

      this.$dropdown = $(html).appendTo ( $body );
      this.$buttons = this.$dropdown.find ( this.options.selectors.button );

      let self = this;

      this.$dropdown.dropdown ({
        positionate: {
          axis: 'y',
          strict: true
        },
        selectors: {
          closer: '.button'
        },
        callbacks: {
          beforeopen () {
            self._setDropdownWidth ();
          },
          open () {
            self._trigger ( 'open' );
          },
          close () {
            self._trigger ( 'close' );
          }
        }
      });

      this.$toggler.attr ( 'data-target', '.' + this.guc ).dropdownToggler ();

      this._updateDropdown ();

    }

    _setDropdownWidth () {

      this.$dropdown.css ( 'min-width', this.$toggler.outerWidth () );

    }

    /* UPDATE */

    _updateValueholder () {

      let $value = this.$select.val ();

      if ( $value.length > 0 ) {

        let $selectedOption = this.$options.filter ( '[value="' + $value + '"]' );

        this.$valueholder.html ( $selectedOption.html () );

      }

    }

    _updateDropdown () {

      this.$buttons.removeClass ( this.options.classes.selected );

      this.$buttons.filter ( '[data-value="' + this.$select.val () + '"]' ).addClass ( this.options.classes.selected );

    }


    _update () {

      this._updateValueholder ();

      if ( !$.browser.is.touchDevice ) {

        this._updateDropdown ();

      }

    }

    /* PUBLIC */

    get () {

      return this.$select.val ();

    }

    select ( value ) {

      this.$buttons.filter ( '[data-value="' + value + '"]' ).tap ();

    }

  }

  /* BINDING */

  Svelto.SelectToggler = SelectToggler;
  Svelto.SelectToggler.config = config;

  /* FACTORY */

  $.factory ( Svelto.SelectToggler );

}( Svelto.$, Svelto._, window, document ));
