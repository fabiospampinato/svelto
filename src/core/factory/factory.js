
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

(function ( $, _, Svelto, Instances, Widgets, Readify, Widgetize ) {

  'use strict';

  /* FACTORY */

  let Factory = {

    /* API */

    instanciate ( Widget, options, element ) {

      let name = Widget.config.name;

      return $.data ( element, `instance.${name}` ) || new Widget ( options, element );

    },

    make ( Widget, config, namespace = Widgets, instances = Instances ) {

      for ( let maker of this.makers.order ) {

        this.makers[maker]( Widget, config, namespace, instances );

      }

    },

    unmake ( Widget, namespace = Widgets, instances = Instances ) {

      for ( let unmaker of this.unmakers.order ) {

        this.unmakers[unmaker]( Widget, namespace, instances );

      }

    },

    /* MAKERS */

    makers: {

      order: ['configure', 'namespace', 'instances', 'plugin', 'ready', 'widgetize'], // The order in which the makers will be called

      configure ( Widget, config = {} ) {

        config.Name = _.upperFirst ( config.name );

        Widget.config = config;

      },

      namespace ( Widget, config, namespace ) {

        if ( !_.isObject ( namespace ) ) return;

        namespace[Widget.config.Name] = Widget;

      },

      instances ( Widget, config, namespace, instances ) {

        if ( !_.isObject ( instances ) ) return;

        instances[Widget.config.Name] = [];

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

      order: ['widgetize', 'ready', 'plugin', 'instances', 'namespace', 'configure'], // The order in which the unmakers will be called

      configure ( Widget ) {

        delete Widget.config.Name;
        delete Widget.config;

      },

      namespace ( Widget, namespace ) {

        if ( !_.isObject ( namespace ) ) return;

        delete namespace[Widget.config.Name];

      },

      instances ( Widget, namespace, instances ) {

        if ( !_.isObject ( instances ) ) return;

        _.forEachRight ( instances[Widget.config.Name], instance => instance.destroy () );

        delete instances[Widget.config.Name];

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

}( Svelto.$, Svelto._, Svelto, Svelto.Instances, Svelto.Widgets, Svelto.Readify, Svelto.Widgetize ));
