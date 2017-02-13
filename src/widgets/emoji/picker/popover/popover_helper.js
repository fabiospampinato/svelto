
/* =========================================================================
 * Svelto - Widgets - Emoji - Picker - Popover (Helper)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./popover.js
 * ========================================================================= */

(function ( $, _, Svelto, EmojipickerPopover ) {

  'use strict';

  /* VARIABLES */

  let instance;

  /* HELPER */

  $.emojipickerPopover = function ( anchor ) {

    if ( !instance ) {

      instance = new EmojipickerPopover ();

    }

    instance.open ( anchor );

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.EmojipickerPopover ));
