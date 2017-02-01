
/* =========================================================================
 * Svelto - Widgets - Form Sync
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * ========================================================================= */

//TODO: Maybe add the ability to trigger a sync when widgetizing a new form in the group, so that if we are appending a new one it gets synced (as a base or not, if not maybe we can get a data-target or the first of othe others in the group as a base)

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formSync',
    plugin: true,
    selector: 'form[data-sync-group]',
    options: {
      live: false, // Basically it triggers the syncing also when the `input` event is fired
      attributes: {
        name: 'name'
      },
      datas: {
        group: 'sync-group'
      },
      selectors: {
        form: 'form',
        elements: 'input:not([type="button"]), textarea, select',
        checkable: '[type="radio"], [type="checkbox"]',
        radio: '[type="radio"]',
        checkbox: '[type="checkbox"]',
        textfield: 'input:not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea'
      }
    }
  };

  /* FORM SYNC */

  class FormSync extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$form = this.$element;
      this.$elements = this.$form.find ( this.options.selectors.elements );

      this.group = this.$form.data ( this.options.datas.group );

    }

    _events () {

      this.___change ();
      this.___input ();

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$elements, 'change', this._debounce ( this.__sync, 100 ) );

    }

    /* INPUT */

    ___input () {

      if ( this.options.live ) {

        let $textfields = this.$elements.filter ( this.options.selectors.textfield );

        this._on ( true, $textfields, 'input', this._debounce ( this.__sync, 100 ) );

      }

    }

    /* SYNC */

    __sync ( event, data ) {

      if ( data && data._formSynced === this.group ) return;

      let $element = $(event.target),
          name = $element.attr ( this.options.attributes.name ),
          $otherElements = $(this.options.selectors.form + '[data-' + this.options.datas.group + '="' + this.group + '"]').not ( this.$form ).find ( '[' + this.options.attributes.name + '="' + name + '"]').not ( $element );

      if ( !$otherElements.length ) return;

      let value = $element.val (),
          checked = !!$element.prop ( 'checked' );

      for ( let otherElement of $otherElements ) {

        let $otherElement = $(otherElement),
            otherValue = $otherElement.val (),
            otherChecked = !!$otherElement.prop ( 'checked' );

        if ( value === otherValue && checked === otherChecked ) continue;

        if ( $element.is ( this.options.selectors.radio ) && ( value !== otherValue || checked === otherChecked ) ) continue;

        if ( $element.is ( this.options.selectors.checkable ) ) {

          $otherElement.prop ( 'checked', checked ).trigger ( 'change', { _formSynced: this.group } );

        } else {

          $otherElement.val ( value ).trigger ( 'change', { _formSynced: this.group } );

        }

      }

    }

  }

  /* FACTORY */

  Factory.make ( FormSync, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
