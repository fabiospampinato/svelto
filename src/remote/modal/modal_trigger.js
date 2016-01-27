
/* =========================================================================
 * Svelto - Remote - Modal (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../remote_trigger.js
 * @requires modal.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteModalTrigger',
    plugin: true,
    selector: '.remote-modal-trigger',
    options: {
      widget: Widgets.RemoteModal
    }
  };

  /* REMOTE MODAL TRIGGER */

  class RemoteModalTrigger extends Widgets.RemoteTrigger {}

  /* FACTORY */

  Factory.init ( RemoteModalTrigger, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
