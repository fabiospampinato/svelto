
/* =========================================================================
 * Svelto - Select (Toggler)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../dropdown/dropdown.js
 * ========================================================================= */

//TODO: Add support for selecting multiple options (with checkboxes maybe)
//TODO: Add an input field for searching through the options

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectToggler',
    plugin: true,
    selector: '.select-toggler',
    templates: {
      base: '<div class="dropdown select-dropdown card {%=o.size%} {%=o.color%} {%=o.css%} {%=o.guc%}">' +
              '<div class="card-block inherit">' +
                '{% for ( var i = 0, l = o.options.length; i < l; i++ ) { %}' +
                  '{% include ( "selectToggler." + ( o.options[i].value ? "option" : "optgroup" ), { opt: o.options[i], color: o.color } ); %}' +
                '{% } %}' +
              '</div>' +
            '</div>',
      optgroup: '<div class="divider">' +
                  '{%=o.opt.prop%}' +
                '</div>',
      option: '<div class="button {%=o.color%}" data-value="{%=o.opt.prop%}">' +
                '{%=o.opt.value%}' +
              '</div>'
    },
    options: {
      dropdown: {
        size: '',
        color: 'white',
        css: 'attached outlined'
      },
      classes: {
        selected: 'active',
        attached: 'attached'
      },
      datas: {
        value: 'value'
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

      if ( !this.$valueholder.length ) {

        this.$valueholder = this.$label;

      }

      this.selectOptions = [];

      this.$dropdown = false;
      this.$buttons = false;

    }

    _init () {

      this._updateValueholder ();

      if ( !$.browser.is.touchDevice ) {

        this.$select.addClass ( this.options.classes.hidden );

        this.___selectOptions ();
        this.___dropdown ();

      }

    }

    _events () {

      /* CHANGE */

      this._on ( true, this.$select, 'change', this.__change );

      if ( !$.browser.is.touchDevice ) {

        /* BUTTON TAP */

        this._on ( this.$buttons, Pointer.tap, this.__buttonTap );

      }

    }

    /* CHANGE */

    __change () {

      this._update ();

      this._trigger ( 'change' );

    }

    /* BUTTON TAP */

    __buttonTap ( event ) {

      this.set ( $(event.currentTarget).data ( 'value' ) );

    }

    /* PRIVATE */

    ___selectOptions () { //FIXME: Add support for arbitrary number of optgroups nesting levels

      let previousOptgroup;

      for ( let option of this.$options ) {

        let $option = $(option),
            $parent = $option.parent ();

        if ( $parent.is ( 'optgroup' ) ) {

          let currentOptgroup = $parent.attr ( 'label' );

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

      let html = this._tmpl ( 'base', _.extend ( { guc: this.guc, options: this.selectOptions }, this.options.dropdown ) );

      this.$dropdown = $(html).appendTo ( $body );
      this.$buttons = this.$dropdown.find ( this.options.selectors.button );

      this.$dropdown.dropdown ({
        positionate: {
          axis: 'y',
          strict: true
        },
        callbacks: {
          beforeopen: this.__setDropdownWidth.bind ( this ),
          open: function () {
            this._trigger ( 'open' );
          }.bind ( this ),
          close: function () {
            this._trigger ( 'close' );
          }.bind ( this )
        }
      });

      this.$buttons.dropdownCloser ();

      this.$toggler.attr ( 'data-' + Svelto.Targeter.config.options.datas.target, '.' + this.guc ).dropdownToggler ();

      this._updateDropdown ();

    }

    __setDropdownWidth () {

      if ( this.$dropdown.is ( '.' + this.options.classes.attached ) ) {

        this.$dropdown.css ( 'min-width', this.$toggler.outerWidth () );

      }

    }

    /* UPDATE */

    _updateValueholder () {

      let $value = this.$select.val ();

      if ( $value.length ) {

        let $selectedOption = this.$options.filter ( '[value="' + $value + '"]' );

        this.$valueholder.html ( $selectedOption.html () );

      }

    }

    _updateDropdown () {

      this.$buttons.removeClass ( this.options.classes.selected );

      this.$buttons.filter ( '[data-' + this.options.datas.value + '="' + this.$select.val () + '"]' ).addClass ( this.options.classes.selected );

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

    set ( value ) {

      let $button = this.$buttons.filter ( '[data-' + this.options.datas.value + '="' + value + '"]' );

      if ( $button.length ) {

        this.$select.val ( value ).trigger ( 'change' );

      }

    }

  }

  /* FACTORY */

  $.factory ( SelectToggler, config, Svelto );

}( Svelto.$, Svelto._, window, document ));
