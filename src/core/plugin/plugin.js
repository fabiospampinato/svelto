
/* =========================================================================
 * Svelto - Core - Plugin
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/helpers.js
 * ========================================================================= */

//TODO: Add support for plain functions

(function ( $, _, Svelto ) {

  'use strict';

  /* PLUGIN */

  let Plugin = {

    call ( Widget, options, ...args ) {

      let isMethodCall = ( _.isString ( options ) && options.charAt ( 0 ) !== '_' ); // Methods starting with '_' are private

      for ( let i = 0, l = this.length; i < l; i++ ) {

        let instance = $.widget.get ( this[i], Widget, options, true );

        if ( isMethodCall && _.isFunction ( instance[options] ) ) {

          let returnValue = instance[options]( ...args );

          if ( !_.isUndefined ( returnValue ) ) return returnValue;

        }

      }

      return this;

    },

    make ( Widget ) {

      if ( !Widget.config.plugin ) return;

      $.fn[Widget.config.name] = _.wrap ( Widget, Plugin.call );

    },

    unmake ( Widget ) {

      if ( !Widget.config.plugin ) return;

      delete $.fn[Widget.config.name];

    }

  };

  /* EXPORT */

  Svelto.Plugin = Plugin;

}( Svelto.$, Svelto._, Svelto ));
