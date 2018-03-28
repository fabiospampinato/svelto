
// @require ../remote_trigger.js
// @require ./modal.js

(function ( $, _, Svelto, Widgets, Factory ) {

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

  Factory.make ( RemoteModalTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
