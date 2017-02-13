
/* =========================================================================
 * Svelto - Widgets - Emoji - Picker - Popover (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./popover_helper.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'emojipickerPopoverTrigger',
    plugin: true,
    selector: '.emojipicker-popover-trigger'
  };

  /* EMOJIPICKER POPOVER TRIGGER */

  class EmojipickerPopoverTrigger extends Widgets.Widget {

    /* SPECIAL */

    _events () {

      this.___tap ();

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.trigger );

    }

    /* API */

    trigger () {

      $.emojipickerPopover ( this.element );

    }

  }

  /* FACTORY */

  Factory.make ( EmojipickerPopoverTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
