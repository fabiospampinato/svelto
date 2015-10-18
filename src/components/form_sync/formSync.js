
/* =========================================================================
 * Svelto - Form Sync
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//TODO: Maybe sync at the init time also
//TODO: Update to a widget

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var groups = [];

  /* FORM SYNC */

  $.fn.formSync () {

    this.each ( () => {

      var $form = $(this),
          group = $form.data ( 'sync-group' );

      if ( groups.indexOf ( group ) !== -1 ) return;

      groups.push ( group );

      var $forms = $('form[data-sync-group="' + group + '"]'),
          $eles = $forms.find ( 'input, textarea, select' );

      $eles.each ( () => {

        var $ele = $(this),
            name = $ele.attr ( 'name' ),
            isCheckable = $ele.is ( '[type="radio"], [type="checkbox"]' ),
            isRadio = isCheckable && $ele.is ( '[type="radio"]' ),
            isTextfield = $ele.is ( 'input, textarea' ),
            events = isTextfield ? 'input change' : 'change',
            $currentForm = $ele.parent ( 'form' ),
            $otherForms = $forms.not ( $currentForm ),
            $otherEles = $otherForms.find ( '[name="' + name + '"]' );

        $ele.on ( events, () => {

          var currentValue = $ele.val (),
              currentChecked = !!$ele.prop ( 'checked' );

          $otherEles.each ( () => {

            var $otherEle = $(this),
                otherValue = $otherEle.val (),
                otherChecked = !!$otherEle.prop ( 'checked' );

            if ( isRadio ) {

              if ( currentValue !== otherValue || currentChecked === otherChecked ) return;

            } else if ( currentValue === otherValue && currentChecked === otherChecked ) {

              return;

            }

            if ( isCheckable ) {

              $otherEle.prop ( 'checked', currentChecked ).trigger ( 'change' );

            } else {

              $otherEle.val ( currentValue ).trigger ( 'change' );

            }

          });

        });

      });

    });

  };

  /* READY */

  $(function () {

    $('form[data-sync-group]').formSync ();

  });

}( jQuery, _, window, document ));
