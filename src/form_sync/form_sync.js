
/* =========================================================================
 * Svelto - Form Sync
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//TODO: Maybe sync at init time also

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let groups = [];

  /* CONFIG */

  let config = {
    name: 'formSync',
    selector: 'form[data-sync-group]',
    options: {
      attributes: {
        name: 'name'
      },
      datas: {
        group: 'sync-group'
      },
      selectors: {
        form: 'form',
        elements: 'input, textarea, select',
        checkable: '[type="radio"], [type="checkbox"]',
        radio: '[type="radio"]',
        checkbox: '[type="checkbox"]',
        textfield: 'input, textarea'
      }
    }
  };

  /* FORM SYNC */

  class FormSync extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$form = this.$element;
      this.group = this.$form.data ( this.options.datas.group );

      this.isNewGroup = ( groups.indexOf ( this.group ) === -1 );

    }

    _init () {

      if ( this.isNewGroup ) {

        groups.push ( this.group );

        this.___syncer ();

      }

    }

    /* PRIVATE */

    ___syncer () {

      let $forms = $(this.options.selectors.form + '[data-' + this.options.datas.group + '="' + this.group + '"]'),
          $elements = $forms.find ( this.options.selectors.elements );

      for ( let element of $elements ) {

        let $element = $(element),
            name = $element.attr ( this.options.attributes.name ),
            isCheckable = $element.is ( this.options.selectors.checkable ),
            isRadio = isCheckable && $element.is ( this.options.selectors.radio ),
            isTextfield = $element.is ( this.options.selectors.textfield ),
            events = isTextfield ? 'input change' : 'change',
            $currentForm = $element.parents ( this.options.selectors.form ),
            $otherForms = $forms.not ( $currentForm ),
            $otherElements  = $otherForms.find ( '[' + this.options.attributes.name + '="' + name + '"]' );

        $element.on ( events, () => {

          let currentValue = $element.val (),
              currentChecked = !!$element.prop ( 'checked' );

          for ( let otherElement of $otherElements ) {

            let $otherElement = $(otherElement),
                otherValue = $otherElement.val (),
                otherChecked = !!$otherElement.prop ( 'checked' );

            if ( isRadio ) {

              if ( currentValue !== otherValue || currentChecked === otherChecked ) return;

            } else if ( currentValue === otherValue && currentChecked === otherChecked ) {

              return;

            }

            if ( isCheckable ) {

              $otherElement.prop ( 'checked', currentChecked ).trigger ( 'change' );

            } else {

              $otherElement.val ( currentValue ).trigger ( 'change' );

            }

          }

        });

      }

    }

  }

  /* BINDING */

  Svelto.FormSync = FormSync;
  Svelto.FormSync.config = config;

  /* FACTORY */

  $.factory ( Svelto.FormSync );

}( Svelto.$, Svelto._, window, document ));
