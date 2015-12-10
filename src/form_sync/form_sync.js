
/* =========================================================================
 * Svelto - Form Sync
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//TODO: Maybe sync at init time also
//FIXME: Probably not good performance, expecially when syncing live stuff, like a live colorpicker

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formSync',
    selector: 'form[data-sync-group]',
    options: {
      live: false,
      attributes: {
        name: 'name'
      },
      datas: {
        group: 'sync-group'
      },
      selectors: {
        form: 'form',
        elements: 'input[name], textarea[name], select[name]',
        checkable: '[type="radio"], [type="checkbox"]',
        radio: '[type="radio"]',
        checkbox: '[type="checkbox"]',
        textfield: 'input:not(button):not([type="checkbox"]):not([type="radio"]), textarea'
      }
    }
  };

  /* FORM SYNC */

  class FormSync extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$form = this.$element;
      this.$elements = this.$form.find ( this.options.selectors.elements );

      this.group = this.$form.data ( this.options.datas.group );

    }

    _events () {

      /* CHANGE */

      this._on ( this.$elements, 'change', this.__sync );

      /* INPUT */

      if ( this.options.live ) {

        this._on ( this.$elements.filter ( this.options.selectors.textfield ), 'input', this.__sync );

      }

    }

    /* SYNC */

    __sync ( event, data ) {

      if ( data && data._synced ) return;

      let $element = $(event.target),
          name = $element.attr ( this.options.attributes.name ),
          $otherElements = $(this.options.selectors.form + '[data-' + this.options.datas.group + '="' + this.group + '"]').not ( this.$form ).find ( '[' + this.options.attributes.name + '="' + name + '"]').not ( $element );

      if ( $otherElements.length > 0 ) {

        let value = $element.val (),
            checked = !!$element.prop ( 'checked' );

        for ( let otherElement of $otherElements ) {

          let $otherElement = $(otherElement),
              otherValue = $otherElement.val (),
              otherChecked = !!$otherElement.prop ( 'checked' );

          if ( value === otherValue && checked === otherChecked ) continue;

          if ( $element.is ( this.options.selectors.radio ) && ( value !== otherValue || checked === otherChecked ) ) continue;

          if ( $element.is ( this.options.selectors.checkable ) ) {

            $otherElement.prop ( 'checked', checked ).trigger ( 'change', { _synced: true } );

          } else {

            $otherElement.val ( value ).trigger ( 'change', { _synced: true } );

          }

        }

      }

    }

  }

  /* BINDING */

  Svelto.FormSync = FormSync;
  Svelto.FormSync.config = config;

  /* FACTORY */

  $.factory ( Svelto.FormSync );

}( Svelto.$, Svelto._, window, document ));
