
/* =========================================================================
 * Svelto - Widgets - Remote - Loader (Trigger)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote_trigger.js
 * @require ./loader.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteLoaderTrigger',
    plugin: true,
    selector: '.remote-loader-trigger',
    options: {
      widget: Widgets.RemoteLoader
    }
  };

  /* REMOTE LOADER TRIGGER */

  class RemoteLoaderTrigger extends Widgets.RemoteTrigger {

    trigger () {

      this.$trigger[this.options.widget.config.name] ({
        ajax: this.options.ajax,
        callbacks: {
          beforesend: () => this.$trigger.addClass ( this.options.classes.disabled ) //TODO: Replace with a linear "spinner" overlay
        }
      });

    }

  }

  /* FACTORY */

  Factory.init ( RemoteLoaderTrigger, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
