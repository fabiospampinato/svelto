
// @require core/widget/widget.js
// @require lib/fullscreen/fullscreen.js

(function ( $, _, Svelto, Factory, Fullscreen ) {

  /* CONFIG */

  let config = {
    name: 'fullscreenable',
    plugin: true,
    selector: '.fullscreenable'
  };

  /* FULLSCREENABLE */

  class Fullscreenable extends Svelto.Widget {

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

}( Svelto.$, Svelto._, Svelto, Svelto.Factory, Svelto.Fullscreen ));
