
/* =========================================================================
 * Svelto - Core - Factory
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require core/widgetize/widgetize.js
 *=========================================================================*/

(function ( $, _, Svelto, Widgetize ) {

  'use strict';

  /* FACTORY */

  let Factory = {

    /* VARIABLES */

    initializers: ['configure', 'namespace', 'ready', 'widgetize', 'plugin'], // `Factory` methods, in order, to call when initing a `Widget`

    /* METHODS */

    init ( Widget, config, namespace ) {

      for ( let initializer of this.initializers ) {

        this[initializer]( Widget, config, namespace );

      }

    },

    instance ( Widget, options, element ) {

      let name = Widget.config.name;

      return $.data ( element, `instance.${name}` ) || new Widget ( options, element );

    },

    /* WORKERS */

    configure ( Widget, config = {} ) {

      Widget.config = config;

    },

    namespace ( Widget, config, namespace ) {

      if ( !_.isObject ( namespace ) ) return;

      let name = _.upperFirst ( Widget.config.name );

      namespace[name] = Widget;

    },

    ready ( Widget ) {

      $(Widget.ready);

    },

    widgetize ( Widget ) {

      if ( !Widget.config.plugin || !_.isString ( Widget.config.selector ) ) return;

      Widgetize.add ( Widget.config.selector, Widget.widgetize, Widget.config );

    },

    plugin ( Widget ) {

      if ( !Widget.config.plugin ) return;

      /* NAME */

      let name = Widget.config.name;

      /* JQUERY PLUGIN */

      $.fn[name] = function ( options, ...args ) {

        let isMethodCall = ( _.isString ( options ) && options.charAt ( 0 ) !== '_' ); // Methods starting with '_' are private

        for ( let element of this ) {

          let instance = Factory.instance ( Widget, options, element );

          if ( isMethodCall && _.isFunction ( instance[options] ) ) {

            let returnValue = instance[options]( ...args );

            if ( !_.isUndefined ( returnValue ) ) {

              return returnValue;

            }

          }

        }

        return this;

      };

    }

  };

  /* EXPORT */

  Svelto.Factory = Factory;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgetize ));
