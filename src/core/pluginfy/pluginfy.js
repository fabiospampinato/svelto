
/* =========================================================================
 * Svelto - Core - Pluginfy
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/helpers.js
 * ========================================================================= */

//TODO: Add support for plain functions
//FIXME: We actually `require` Factory, but requiring it creates a circular dependency...

(function ( $, _, Svelto ) {

  'use strict';

  /* PLUGINFY */

  let Pluginfy = {

    call ( Widget, options, ...args ) {

      let isMethodCall = ( _.isString ( options ) && options.charAt ( 0 ) !== '_' ); // Methods starting with '_' are private

      for ( let i = 0, l = this.length; i < l; i++ ) {

        let instance = $.widget.get ( this[0], Widget, options, true );

        if ( isMethodCall && _.isFunction ( instance[options] ) ) {

          let returnValue = instance[options]( ...args );

          if ( !_.isUndefined ( returnValue ) ) return returnValue;

        }

      }

      return this;

    },

    add ( Widget ) {

      if ( !Widget.config.plugin ) return;

      $.fn[Widget.config.name] = _.wrap ( Widget, Pluginfy.call );

    },

    remove ( Widget ) {

      if ( !Widget.config.plugin ) return;

      delete $.fn[Widget.config.name];

    }

  };

  /* EXPORT */

  Svelto.Pluginfy = Pluginfy;

}( Svelto.$, Svelto._, Svelto ));
