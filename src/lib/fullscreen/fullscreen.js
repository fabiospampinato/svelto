
/* =========================================================================
 * Svelto - Lib - Fullscreen
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require core/widgetize/widgetize.js
 * @require ./vendor/screenfull.js
 * ========================================================================= */

//FIXME: It doesn't work in iOS's Safari and IE10
//TODO: Rewrite it
//TODO: Add the ability to trigger the fullscreen for a specific element

(function ( $, _, Svelto, Widgetize, Pointer ) {

  'use strict';

  /* FULLSCREEN */

  Widgetize.add ( '.fullscreen-toggler', function ( $toggler ) {

    $toggler.on ( Pointer.tap, screenfull.toggle );

  });

}( Svelto.$, Svelto._, Svelto, Svelto.Widgetize, Svelto.Pointer ));
