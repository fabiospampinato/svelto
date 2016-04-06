
/* =========================================================================
 * Svelto - Widgets - Select
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require widgets/popover/popover.js
 * ========================================================================= */

//TODO: Add support for selecting multiple options (with checkboxes maybe)
//TODO: Add an input field for searching through the options

(function ( $, _, Svelto, Widgets, Factory, Browser, Pointer, Colors ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'select',
    plugin: true,
    selector: '.select',
    templates: {
      base: '<div class="popover select-popover card <%= o.size %> <%= o.color %> <%= o.css %> <%= o.guc %>">' +
              '<div class="card-block">' +
                '<% for ( var i = 0, l = o.options.length; i < l; i++ ) { %>' +
                  '<% print ( self[ o.options[i].value ? "option" : "optgroup" ] ( { opt: o.options[i], color: o.color } ) ) %>' +
                '<% } %>' +
              '</div>' +
            '</div>',
      optgroup: '<div class="divider">' +
                  '<%= o.opt.prop %>' +
                '</div>',
      option: '<div class="button <%= o.color %>" data-value="<%= o.opt.prop %>">' +
                '<%= o.opt.value %>' +
              '</div>'
    },
    options: {
      native: Browser.is.touchDevice, // Don't show the popover and use the native select, by default on touch devices
      popover: {
        size: '',
        color: Colors.white,
        css: Widgets.Popover.config.options.classes.affixed + ' bordered'
      },
      classes: {
        selected: 'active highlighted highlight-left',
        affixed: Widgets.Popover.config.options.classes.affixed
      },
      datas: {
        value: 'value'
      },
      selectors: {
        select: 'select',
        option: 'option',
        valueholder: '.select-value, label',
        button: '.button'
      },
      callbacks: {
        change: _.noop,
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* SELECT */

  class Select extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$wrp = this.$element;
      this.$select = this.$wrp.find ( this.options.selectors.select );
      this.$options = this.$select.find ( this.options.selectors.option );
      this.$valueholder = this.$wrp.find ( this.options.selectors.valueholder ).first ();

      this.selectOptions = [];

      this.$popover = false;

    }

    _init () {

      this._updateValueholder ();

      if ( !this.options.native ) {

        this.$select.addClass ( this.options.classes.hidden );

        this.___selectOptions ();
        this.___popover ();

      }

    }

    _events () {

      this.___change ();

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$select, 'change', this.__change );

    }

    __change () {

      this._update ();

      this._trigger ( 'change' );

    }

    /* BUTTON TAP */

    ___buttonTap () {

      if ( !Browser.is.touchDevice ) {

        /* BUTTON TAP */

        this._on ( this.$popover, Pointer.tap, this.options.selectors.button, this.__buttonTap );

      }

    }

    __buttonTap ( event ) {

      this.$popover.popover ( 'close' );

      this.set ( $(event.currentTarget).data ( this.options.datas.value ) );

    }

    /* OPTIONS */

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

        let value = $option.text ();

        if ( value ) {

          this.selectOptions.push ({
            value: $option.text (),
            prop: $option.attr ( 'value' )
          });

        }

      }

    }

    /* POPOVER */

    ___popover () {

      let html = this._template ( 'base', _.extend ( { guc: this.guc, options: this.selectOptions }, this.options.popover ) );

      this.$popover = $(html).appendTo ( this.$layout );
      this.$buttons = this.$popover.find ( this.options.selectors.button );

      this.$popover.popover ({
        positionate: {
          axis: 'y',
          strict: true
        },
        callbacks: {
          beforeopen: this.__setPopoverWidth.bind ( this ),
          open: this.__popoverOpen.bind ( this ),
          close: this.__popoverClose.bind ( this )
        }
      });

      this.$wrp.attr ( `data-${Widgets.Targeter.config.options.datas.target}`, '.' + this.guc ).popoverToggler ();

      this._updatePopover ();

    }

    __setPopoverWidth () {

      if ( this.$popover.is ( '.' + this.options.classes.affixed ) ) {

        this.$popover.css ( 'min-width', this.$wrp.outerWidth () );

      }

    }

    __popoverOpen () {

      this.___buttonTap ();

      this._trigger ( 'open' );

    }

    __popoverClose () {

      this._reset ();

      this.___change ();

      this._trigger ( 'close' );

    }

    /* UPDATE */

    _updateValueholder () {

      let value = this.$select.val ();

      if ( _.isString ( value ) && value.length ) {

        let $selectedOption = this.$options.filter ( `[value="${value}"]` ).first ();

        this.$valueholder.text ( $selectedOption.text () );

      }

    }

    _updatePopover () {

      this.$buttons.removeClass ( this.options.classes.selected );

      this.$buttons.filter ( '[data-' + this.options.datas.value + '="' + this.$select.val () + '"]' ).first ().addClass ( this.options.classes.selected );

    }

    _update () {

      this._updateValueholder ();

      if ( !Browser.is.touchDevice ) {

        this._updatePopover ();

      }

    }

    /* API */

    get () {

      return this.$select.val ();

    }

    set ( value ) {

      let $button = this.$buttons.filter ( '[data-' + this.options.datas.value + '="' + value + '"]' ).first ();

      if ( !$button.length ) return;

      this.$select.val ( value ).trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.init ( Select, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer, Svelto.Colors ));
