
/* =========================================================================
 * Svelto - Select
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add support for selecting multiple options (with checkboxes maybe)
//FIXME: Doesn't work when the page is scrolled (check in the components/form)

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* SELECT */

  $.factory ( 'svelto.select', {

    /* TEMPLATES */

    templates: {
      base: '<div id="{%=o.id%}" class="dropdown select-dropdown attached card outlined">' +
              '<div class="card-block">' +
                '{% for ( var i = 0, l = o.options.length; i < l; i++ ) { %}' +
                  '{% include ( "svelto.select." + ( o.options[i].value ? "option" : "optgroup" ), o.options[i] ); %}' +
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

    /* OPTIONS */

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
        open: _.noop,
        close: _.noop,
        change: _.noop
      }
    },

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.select-trigger' ).select ();

    },

    _variables () {

      this.$trigger = this.$element;
      this.$select = this.$trigger.find ( this.options.selectors.select );
      this.$options = this.$select.find ( this.options.selectors.option );
      this.$label = this.$trigger.find ( this.options.selectors.label );
      this.$valueholder = this.$trigger.find ( this.options.selectors.valueholder );

      this.id = this.$trigger.data ( 'select' );

      if ( this.$valueholder.length === 0 ) {

        this.$valueholder = this.$label;

      }

      this.selectOptions = [];

      this.$dropdown = false;
      this.$buttons = false;

    },

    _init () {

      this._updateValueholder ();

      if ( !$.browser.is.touchDevice ) {

        this.$select.addClass ( 'hidden' );

        this.___selectOptions ();
        this.___dropdown ();

      }

    },

    _events () {

      /* CHANGE */

      this._on ( this.$select, 'change', this.__change );

      if ( !$.browser.is.touchDevice ) {

        /* BUTTON TAP */

        this._on ( this.$buttons, Pointer.tap, this.__tap );

      }

    },

    /* CHANGE */

    __change () {

      this._update ();

      console.log("CHANGED!");

      this._trigger ( 'change' );

    },

    /* BUTTON TAP */

    __tap ( event, button ) {

      this.$select.val ( $(button).data ( 'value' ) ).trigger ( 'change' );

    },

    /* PRIVATE */

    ___selectOptions () { //FIXME: Add support for arbitrary number of optgroups levels

      var previousOptgroup,
          currentOptgroup;

      for ( var i = 0, l = this.$options.length; i < l; i++ ) {

        var $option = this.$options.eq ( i ),
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

    },

    ___dropdown () {

      var html = this._tmpl ( 'base', { id: this.id, options: this.selectOptions } );

      this.$dropdown = $(html).appendTo ( $body );
      this.$buttons = this.$dropdown.find ( this.options.selectors.button );

      this.$trigger.addClass ( 'dropdown-trigger' ).attr ( 'data-dropdown', this.id );

      var self = this;

      this.$dropdown.dropdown ({
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

      this._updateDropdown ();

    },

    _setDropdownWidth () {

      this.$dropdown.css ( 'min-width', this.$trigger.outerWidth () );

    },

    /* UPDATE */

    _updateValueholder () {

      var $selectedOption = this.$options.filter ( '[value="' + this.$select.val () + '"]' );

      this.$valueholder.html ( $selectedOption.html () );

    },

    _updateDropdown () {

      this.$buttons.removeClass ( this.options.classes.selected );

      this.$buttons.filter ( '[data-value="' + this.$select.val () + '"]' ).addClass ( this.options.classes.selected );

    },


    _update () {

      this._updateValueholder ();

      if ( !$.browser.is.touchDevice ) {

        this._updateDropdown ();

      }

    },

    /* PUBLIC */

    get () {

      return this.$select.val ();

    },

    select ( value ) {

      this.$buttons.filter ( '[data-value="' + value + '"]' ).tap ();

    }

  });

}( jQuery, _, window, document ));
