
/* =========================================================================
 * Svelto - Factory
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../widget/widget.js
 * @requires ../widgetize/widgetize.js
 * @requires ../tmpl/tmpl.js
 * @requires ../pointer/pointer.js
 *=========================================================================*/

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* FACTORY */

  $.factory = function ( Widget ) {

    /* WIDGETIZE */

    $.factory.widgetize ( Widget );

    /* PLUGIN */

    $.factory.plugin ( Widget );

  };

  /* FACTORY WIDGETIZE */

  $.factory.widgetize = function ( Widget ) {

    if ( Widget.config.selector ) {

      Widgetize.add ( Widget.config.selector, Widget.widgetize, Widget.config.name );

    }

  };

  /* FACTORY PLUGIN */

  $.factory.plugin = function ( Widget ) {

    /* NAME */

    let name = Widget.config.name;

    /* JQUERY PLUGIN */

    $.fn[name] = function ( options, ...args ) {

      if ( _.isString ( options ) ) { //INFO: Calling a method

        if ( options.charAt ( 0 ) !== '_' ) { //INFO: Not a private method or property

          /* METHOD CALL */

          for ( let element of this ) {

            /* VARIABLES */

            let instance = $.factory.instance ( Widget, false, element );

            /* CHECKING VALID CALL */

            if ( !_.isFunction ( instance[options] ) ) continue; //INFO: Not a method

            /* CALLING */

            let returnValue = instance[options]( ...args );

            if ( !_.isUndefined ( returnValue ) ) {

              return returnValue;

            }

          }

        }

      } else {

        /* INSTANCE */

        for ( let element of this ) {

          $.factory.instance ( Widget, options, element );

        }

      }

      return this;

    };

  };

  /* FACTORY INSTANCE */

  $.factory.instance = function ( Widget, options, element ) {

    let name = Widget.config.name,
        instance = $.data ( element, 'instance.' + name );

    if ( !instance ) {

      instance = new Widget ( options, element );

    }

    return instance;

  };

}( Svelto.$, Svelto._, window, document ));
