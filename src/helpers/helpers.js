
/* =========================================================================
 * Svelto - Helpers
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../svelto/svelto.js
 * @require ../widgetize/widgetize.js
 * @require ../pointer/pointer.js
 * @require vendor/screenfull.js
 * ========================================================================= */

//TODO: Move to their own folders/files

(function ( $, _, Svelto, Widgets, Factory, Widgetize, Pointer, Animations ) {

  'use strict';

  /* SCROLL TO TOP */

  //TODO: Add a .scroll-to-target widget, with data-target and awareness of the attached stuff
  //FIXME: It doesn't work if the layout is body, it also need html in some browsers

  Widgetize.add ( '.scroll-to-top', function ( $scroller ) {

    let $layout = $scroller.parent ().closest ( '.layout, body' ); //TODO: Use just `.layout`

    $scroller.on ( Pointer.tap, function () {

      $layout.animate ( { scrollTop: 0 }, Animations.normal );

    });

  });

  /* FULLSCREEN */

  //TODO: Add the ability to trigger the fullscreen for a specific element
  //FIXME: It doesn't work in iOS's Safari and IE10
  //TODO: Rewrite a component for it

  Widgetize.add ( '.fullscreen-toggler', function ( $toggler ) {

    $toggler.on ( Pointer.tap, screenfull.toggle );

  });

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Widgetize, Svelto.Pointer, Svelto.Animations ));
