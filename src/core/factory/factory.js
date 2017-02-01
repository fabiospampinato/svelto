
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

    make ( Widget, config, namespace ) {

      for ( let maker of this.makers.order ) {

        this.makers[maker]( Widget, config, namespace );

      }

    },

    /* MAKERS */

    makers: {

      order: ['configure', 'namespace', 'ready', 'widgetize', 'plugin'], // The order in which the makers will be called

      configure ( Widget, config = {} ) {

        Widget.config = config;

      },

      namespace ( Widget, config, namespace ) {

        if ( !_.isObject ( namespace ) ) return;

        let name = _.upperFirst ( Widget.config.name );

        namespace[name] = Widget;

      },

      ready ( Widget ) {

        Readify.add ( Widget );

      },

      widgetize ( Widget ) { //TODO: Maybe add native support for Widgets to Widgetize and make this method as simple as `ready`

        if ( !Widget.config.plugin || !_.isString ( Widget.config.selector ) ) return;

        let widgetize = Widget.widgetize || Widget.__proto__.widgetize || Widgets.Widget.widgetize; //IE10 support -- static property

        Widgetize.add ( Widget.config.selector, widgetize, Widget );

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

      }

    }

  };

  /* EXPORT */

  Svelto.Factory = Factory;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Readify, Svelto.Widgetize ));
