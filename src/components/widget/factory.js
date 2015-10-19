
/* =========================================================================
 * Svelto - Factory
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires Widget.js
 * @requires Widgetize.js
 * @requires ../tmpl/tmpl.js
 * @requires ../pointer/Pointer.js
 *=========================================================================*/

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* FACTORY */

  $.factory = function ( Widget ) {

    /* NAME */

    var name = Widget.config.name;

    /* CACHE TEMPLATES */

    for ( var tmplName in Widget.config.templates ) {

      $.tmpl.cache[name + '.' + tmplName] = $.tmpl ( Widget.config.templates[tmplName] );

    }

    /* WIDGETIZE */

    console.log("Widgetize function:",Widget.prototype._widgetize);
    Widgetize.add ( Widget.prototype._widgetize );

    /* BRIDGE */

    $.factory.bridge ( Widget );

  };

  /* FACTORY BRIDGE */

  $.factory.bridge = function ( Widget ) {

    /* NAME */

    var name = Widget.config.name;

    /* JQUERY PLUGIN */

    $.fn[name] = function ( options, ...args ) { //FIXME: We should be able to extend options, not the entire config

      var isMethodCall = _.isString ( options ),
          returnValue = this;

      if ( isMethodCall ) {

        if ( options.charAt ( 0 ) !== '_' ) { //INFO: Not a private method or property

          /* METHOD CALL */

          this.each ( function () {

            /* VARIABLES */

            var methodValue,
                instance = $.factory.instance ( Widget, false, this );

            /* CHECKING VALID CALL */

            if ( !_.isFunction ( instance[options] ) ) return; //INFO: Not a method

            /* CALLING */

            methodValue = instance[options]( args );

            if ( !_.isUndefined ( methodValue ) ) {

              returnValue = methodValue;

              return false;

            }

          });

        }

      } else {

        /* SUPPORT FOR PASSING MULTIPLE CONFIG OBJECTS */

        if ( args.length > 0 ) {

          options = _.merge.apply ( null, [{}].concat ( [options] ).concat ( args ) );

        }

        /* INSTANCE */

        this.each ( function () {

          $.factory.instance ( Widget, options, this );

        });

      }

      return returnValue;

    };

  };

  /* FACTORY INSTANCE */

  $.factory.instance = function ( Widget, options, element ) {

    /* NAME */

    var name = Widget.config.name;

    /* INSTANCE */

    var instance = $.data ( element, 'instance.' + name );

    if ( !instance ) {

      instance = new Widget ( $.factory.config ( Widget, options ), element );

      $.data ( element, 'instance.' + name, instance );

    }

    return instance;

  };

  /* FACTORY CONFIG */

  $.factory.config = function ( Widget, options ) {

    /* VARIABLES */

    var configs = [{}],
        prototype = Widget.prototype;

    /* CHAIN */

    while ( prototype ) {

      configs.push ( prototype.constructor.config );

      prototype = Object.getPrototypeOf ( prototype );

    }

    /* CONFIG */

    if ( options ) {

      configs.push ({ options: options });

    }

    return _.merge.apply ( null, configs );

  };

}( jQuery, _, window, document ));
