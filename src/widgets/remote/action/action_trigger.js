
/* =========================================================================
 * Svelto - Widgets - Remote - Action (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote_trigger.js
 * @require ./action.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteActionTrigger',
    plugin: true,
    selector: '.remote-action-trigger',
    options: {
      widget: Widgets.RemoteAction
    }
  };

  /* REMOTE ACTION TRIGGER */

  class RemoteActionTrigger extends Widgets.RemoteTrigger {}

  /* FACTORY */

  Factory.make ( RemoteActionTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
