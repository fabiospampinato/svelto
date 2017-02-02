
/* =========================================================================
 * Svelto - Core - Widgetize
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

//FIXME: We actually `require` Widget, but requiring it creates a circular dependency...

(function ( $, _, Svelto, Widgets ) {

  'use strict';

  /* WIDGETIZE */

  class Widgetize {

    constructor () {

      this.widgetizers = {};

    }

    get () {

      return this.widgetizers;

    }

    add ( selector, widgetizer, data ) {

      if ( _.isObject ( selector ) ) {

        let Widget = selector;

        if ( !Widget.config.plugin || !_.isString ( Widget.config.selector ) ) return;

        let widgetize = Widget.widgetize || Widget.__proto__.widgetize || Widgets.Widget.widgetize; //IE10 support -- static property

        return this.add ( Widget.config.selector, widgetize, Widget );

      }

      if ( !(selector in this.widgetizers) ) {

        this.widgetizers[selector] = [];

      }

      this.widgetizers[selector].push ( [widgetizer, data] );

    }

    remove ( selector, widgetizer ) {

      if ( _.isObject ( selector ) ) {

        let Widget = selector;

        if ( !Widget.config.plugin || !_.isString ( Widget.config.selector ) ) return;

        let widgetize = Widget.widgetize || Widget.__proto__.widgetize || Widgets.Widget.widgetize; //IE10 support -- static property

        return this.remove ( Widget.config.selector, widgetize );

      }

      if ( selector in this.widgetizers ) {

        if ( widgetizer ) {

          for ( let i = 0, l = this.widgetizers[selector].length; i < l; i++ ) {

            if ( this.widgetizers[selector][i][0] === widgetizer ) {

              this.widgetizers[selector].splice ( i, 1 );

            }

          }

        }

        if ( !widgetizer || !this.widgetizers[selector].length ) {

          delete this.widgetizers[selector];

        }

      }

    }

    on ( $roots ) {

      for ( let selector in this.widgetizers ) {

        if ( !this.widgetizers.hasOwnProperty ( selector ) ) continue;

        let widgetizers = this.widgetizers[selector];

        this.worker ( widgetizers, $roots.filter ( selector ) );
        this.worker ( widgetizers, $roots.find ( selector ) );

      }

    }

    worker ( widgetizers, $widgets ) {

      for ( let widget of $widgets ) {

        for ( let [widgetizer, data] of widgetizers ) {

          widgetizer ( $(widget), data );

        }

      }

    }

  }

  /* EXPORT */

  Svelto.Widgetize = new Widgetize ();

  /* JQUERY PLUGIN */

  $.fn.widgetize = function () {

    Svelto.Widgetize.on ( this );

    return this;

  };

  /* READY */

  $(function () {

    $(document.body).widgetize ();

  });

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));
