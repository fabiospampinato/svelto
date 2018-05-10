
// @require core/readify/readify.js

//FIXME: We actually `require` Widget, but requiring it creates a circular dependency...

(function ( $, _, Svelto, Readify ) {

  /* WIDGETIZE */

  class Widgetize {

    constructor () {

      this.widgetizers = {};

    }

    /* METHODS */

    get () {

      return this.widgetizers;

    }

    add ( selector, widgetizer, data, ready = false ) {

      if ( _.isObject ( selector ) ) {

        let Widget = selector;

        if ( !Widget.config.plugin || !_.isString ( Widget.config.selector ) ) return;

        let widgetize = Widget.widgetize || Widget.__proto__.widgetize || Svelto.Widget.widgetize; //IE10 support -- static property

        return this.add ( Widget.config.selector, widgetize, Widget, widgetizer );

      }

      if ( !(selector in this.widgetizers) ) {

        this.widgetizers[selector] = [];

      }

      this.widgetizers[selector].push ( [widgetizer, data] );

      if ( ready || Readify.isReady () ) {

        let $widgets = $.$html.findAll ( selector );

        this.worker ( [[widgetizer, data]], $widgets );

      }

    }

    remove ( selector, widgetizer ) {

      if ( _.isObject ( selector ) ) {

        let Widget = selector;

        if ( !Widget.config.plugin || !_.isString ( Widget.config.selector ) ) return;

        let widgetize = Widget.widgetize || Widget.__proto__.widgetize || Svelto.Widget.widgetize; //IE10 support -- static property

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

      this.on ( $.$body );

    }

    on ( $root ) {

      for ( let selector in this.widgetizers ) {

        if ( !this.widgetizers.hasOwnProperty ( selector ) ) continue;

        let widgetizers = this.widgetizers[selector],
            $widgets = $root.findAll ( selector );

        this.worker ( widgetizers, $widgets );

      }

    }

    worker ( widgetizers, $widgets ) {

      for ( let ei = 0, el = $widgets.length; ei < el; ei++ ) {

        const widget = $widgets[ei];

        for ( let wi = 0, wl = widgetizers.length; wi < wl; wi++ ) {

          widgetizers[wi][0] ( widget, widgetizers[wi][1] );

        }

      }

    }

  }

  /* EXPORT */

  Svelto.Widgetize = new Widgetize ();

  /* PLUGIN */

  $.fn.widgetize = function () {

    for ( let i = 0, l = this.length; i < l; i++ ) {

      if ( this[i].nodeType !== 1 ) continue; // It doesn't make sense to widgetize other type of nodes

      Svelto.Widgetize.on ( $(this[i]) );

    }

    return this;

  };

  /* READY */

  if ( !Readify.isReady () ) {

    Readify.add ( Svelto.Widgetize.ready.bind ( Svelto.Widgetize ) );

  }

}( Svelto.$, Svelto._, Svelto, Svelto.Readify ));
