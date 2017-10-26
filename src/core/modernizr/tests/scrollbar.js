
/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Scrollbar)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* SCROLLBAR */

  let size;

  Modernizr.testStyles ( '#modernizr {width:100px;height:100px;overflow:scroll;position:absolute;z-index:-1}', ele => size = ele.offsetWidth - ele.clientWidth ); // The absolute position ensures that the height is setted correctly (FF and IE bug)

  Modernizr.addTest ( 'overlay-scrollbars', !size );
  Modernizr.addTest ( 'scrollbar-size-' + size, true );

}( window.__svelto_modernizr ));
