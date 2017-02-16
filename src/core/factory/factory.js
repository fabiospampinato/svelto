
/* =========================================================================
 * Svelto - Core - Factory
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require core/readify/readify.js
 * @require core/widgetize/widgetize.js
 *=========================================================================*/

(function ( $, _, Svelto, Widgets, Readify, Widgetize ) {

  'use strict';

  /* FACTORY */

  let Factory = {

    /* API */

    instanciate ( Widget, options, element ) {

      let name = Widget.config.name;

      return $.data ( element, `instance.${name}` ) || new Widget ( options, element );

    },

    make ( Widget, config, namespace = Widgets ) {

      for ( let maker of this.makers.order ) {

        this.makers[maker]( Widget, config, namespace );

      }

    },

    unmake ( Widget, namespace = Widgets ) {

      for ( let unmaker of this.unmakers.order ) {

        this.unmakers[unmaker]( Widget, namespace );

      }

    },

    /* MAKERS */

    makers: {

      order: ['configure', 'namespace', 'plugin', 'ready', 'widgetize'], // The order in which the makers will be called

      configure ( Widget, config = {} ) {

        Widget.config = config;

      },

      namespace ( Widget, config, namespace ) {

        if ( !_.isObject ( namespace ) ) return;

        let name = _.upperFirst ( Widget.config.name );

        namespace[name] = Widget;

      },

      plugin ( Widget ) {

        if ( !Widget.config.plugin ) return;

        /* NAME */

        let name = Widget.config.name;

        /* JQUERY PLUGIN */

        $.fn[name] = function ( options, ...args ) {

          let isMethodCall = ( _.isString ( options ) && options.charAt ( 0 ) !== '_' ); // Methods starting with '_' are private

          for ( let element of this ) {

            let instance = Factory.instanciate ( Widget, options, element );

            if ( isMethodCall && _.isFunction ( instance[options] ) ) {

              let returnValue = instance[options]( ...args );

              if ( !_.isUndefined ( returnValue ) ) return returnValue;

            }

          }

          return this;

        };

      },

      ready ( Widget ) {

        Readify.add ( Widget );

      },

      widgetize ( Widget ) {

        Widgetize.add ( Widget );

      }

    },

    /* UNMAKERS */

    unmakers: {

      order: ['widgetize', 'ready', 'plugin', 'namespace', 'configure'], // The order in which the unmakers will be called

      configure ( Widget ) {

        delete Widget.config;

      },

      namespace ( Widget, namespace ) {

        if ( !_.isObject ( namespace ) ) return;

        let name = _.upperFirst ( Widget.config.name );

        delete namespace[name];

      },

      plugin ( Widget ) {

        if ( !Widget.config.plugin ) return;

        delete $.fn[Widget.config.name];

      },

      ready ( Widget ) {

        Readify.remove ( Widget );

      },

      widgetize ( Widget ) {

        Widgetize.remove ( Widget );

      }

    }

  };

  /* EXPORT */

  Svelto.Factory = Factory;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Readify, Svelto.Widgetize ));
