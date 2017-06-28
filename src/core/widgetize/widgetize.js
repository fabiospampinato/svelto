
/* =========================================================================
 * Svelto - Core - Widgetize
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/readify/readify.js
 * ========================================================================= */

//FIXME: We actually `require` Widget, but requiring it creates a circular dependency...

(function ( $, _, Svelto, Widgets, Readify ) {

  'use strict';

  /* WIDGETIZE */

  class Widgetize {

    constructor () {

      this.widgetizers = {};

    }

    /* UTILITIES */

    _getWidgets ( selector, $root, $parent ) {

      let isSimpleSelector = !/ |>/.test ( selector );

      if ( isSimpleSelector ) {

        let $self = $root.filter ( selector ),
            $nested = $root.find ( selector );

        return $self.length ? $self.add ( $nested ) : $nested;

      } else {

        $parent = $parent ? $parent : $root.parent ();

        let root = $root[0];

        return $parent.find ( selector ).filter ( ( index, ele ) => ele === root || $.contains ( root, ele ) );

      }

    }

    /* METHODS */

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

      if ( this._isReady ) {

        let $widgets = this._getWidgets ( selector, $.$body, $.$html );

        this.worker ( [[widgetizer, data]], $widgets );

      }

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

    ready () {

      this._isReady = true;

      this.on ( $.$body );

    }

    on ( $root ) {

      let $parent = $root.parent ();

      for ( let selector in this.widgetizers ) {

        if ( !this.widgetizers.hasOwnProperty ( selector ) ) continue;

        let widgetizers = this.widgetizers[selector],
            $widgets = this._getWidgets ( selector, $root, $parent );

        this.worker ( widgetizers, $widgets );

      }

    }

    worker ( widgetizers, $widgets ) {

      for ( let widget of $widgets ) {

        let $widget = $(widget);

        for ( let [widgetizer, data] of widgetizers ) {

          widgetizer ( $widget, data );

        }

      }

    }

  }

  /* EXPORT */

  Svelto.Widgetize = new Widgetize ();

  /* PLUGIN */

  $.fn.widgetize = function () {

    Svelto.Widgetize.on ( this );

    return this;

  };

  /* READY */

  Readify.add ( Svelto.Widgetize.ready.bind ( Svelto.Widgetize ) );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Readify ));
