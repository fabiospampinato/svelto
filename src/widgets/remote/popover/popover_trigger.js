
/* =========================================================================
 * Svelto - Widgets - Remote - Popover (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote_trigger.js
 * @require ./popover.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remotePopoverTrigger',
    plugin: true,
    selector: '.remote-popover-trigger',
    options: {
      widget: Widgets.RemotePopover
    }
  };

  /* REMOTE POPOVER TRIGGER */

  class RemotePopoverTrigger extends Widgets.RemoteTrigger {

    /* OPTIONS */

    _getOptions () {

      return _.merge ( super._getOptions (), {
        positionate: {
          $anchor: this.$trigger
        }
      });

    }

  }

  /* FACTORY */

  Factory.make ( RemotePopoverTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
