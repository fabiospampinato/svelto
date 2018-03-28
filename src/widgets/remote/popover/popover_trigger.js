
// @require ../remote_trigger.js
// @require ./popover.js

(function ( $, _, Svelto, Widgets, Factory ) {

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
