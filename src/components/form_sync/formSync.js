
/* =========================================================================
 * Svelto - Form Sync v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//TODO: maybe sync at the init time also

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var synced_groups = [];

  /* FORM SYNC */

  $.fn.formSync = function () {

    this.each ( function () {

      var $form = $(this),
        sync_group = $form.data ( 'sync-group' );

      if ( synced_groups.indexOf ( sync_group ) !== -1 ) return;

      synced_groups.push ( sync_group );

      var $forms = $('form[data-sync-group="' + sync_group + '"]'),
        $eles = $forms.find ( 'input, textarea, select' );

      $eles.each ( function () {

        var $ele = $(this),
          name = $ele.attr ( 'name' ),
          is_checkable = $ele.is ( '[type="radio"], [type="checkbox"]' ),
          is_radio = is_checkable && $ele.is ( '[type="radio"]' ),
          is_textbox = $ele.is ( 'input, textarea' ),
          events = is_textbox ? 'input change' : 'change',
          $current_form = $ele.parent ( 'form' ),
          $other_forms = $forms.not ( $current_form ),
          $other_eles = $other_forms.find ( '[name="' + name + '"]' );

        $ele.on ( events, function () {

          var current_value = $ele.val (),
            current_checked = !!$ele.prop ( 'checked' );

          $other_eles.each ( function () {

            var $other_ele = $(this),
              other_value = $other_ele.val (),
              other_checked = !!$other_ele.prop ( 'checked' );

            if ( is_radio ) {

              if ( current_value !== other_value || current_checked === other_checked ) return;

            } else if ( current_value === other_value && current_checked === other_checked ) {

              return;

            }

            if ( is_checkable ) {

              $other_ele.prop ( 'checked', current_checked ).trigger ( 'change' );

            } else {

              $other_ele.val ( current_value ).trigger ( 'change' );

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
