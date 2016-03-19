
/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Overlay Scrollbars)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* OVERLAY SCROLLBARS */

  let overlay = Modernizr.testStyles ( '#modernizr {width:100px;height:100px;overflow:scroll}', ele => ele.offsetWidth === ele.clientWidth );

  Modernizr.addTest ( 'overlay-scrollbars', overlay );

}( Modernizr ));
