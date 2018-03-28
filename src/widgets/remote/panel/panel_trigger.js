
// @require ../remote_trigger.js
// @require ./panel.js

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remotePanelTrigger',
    plugin: true,
    selector: '.remote-panel-trigger',
    options: {
      widget: Widgets.RemotePanel,
      direction: undefined,
      type: undefined
    }
  };

  /* REMOTE PANEL TRIGGER */

  class RemotePanelTrigger extends Widgets.RemoteTrigger {

    /* SPECIAL */

    _init () {

      super._init ();

      this.options.direction = this.$trigger.data ( Widgets.Panel.config.options.datas.direction ) || this.options.direction;
      this.options.type = this.$trigger.data ( Widgets.Panel.config.options.datas.type ) || this.options.type;

    }

    /* OPTIONS */

    _getOptions () {

      let {direction, type} = this.options;

      return _.merge ( super._getOptions (), { direction, type } );

    }

  }

  /* FACTORY */

  Factory.make ( RemotePanelTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
