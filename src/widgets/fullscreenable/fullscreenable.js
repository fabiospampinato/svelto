
// @require core/widget/widget.js
// @require lib/fullscreen/fullscreen.js

(function ( $, _, Svelto, Widgets, Factory, Fullscreen ) {

  /* CONFIG */

  let config = {
    name: 'fullscreenable',
    plugin: true,
    selector: '.fullscreenable'
  };

  /* FULLSCREENABLE */

  class Fullscreenable extends Widgets.Widget {

    /* API */

    isFullscreen () {

      return Fullscreen.isFullscreen;

    }

    toggle ( force = !Fullscreen.isFullscreen ) {

      if ( !!force !== Fullscreen.isFullscreen ) {

        force ? this.request () : this.exit ();

      }

    }

    request () {

      Fullscreen.request ( this.element );

    }

    exit () {

      Fullscreen.exit ();

    }

  }

  /* FACTORY */

  Factory.make ( Fullscreenable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Fullscreen ));
