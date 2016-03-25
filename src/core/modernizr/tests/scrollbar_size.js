
/* =========================================================================
 * Svelto - Core - Modernizr - Tests (Scrollbar size)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * ========================================================================= */

(function ( Modernizr ) {

  'use strict';

  /* SCROLLBAR SIZE */

  let size;

  Modernizr.testStyles ( '#modernizr {width:100px;height:100px;overflow:scroll}', ele => size = ele.offsetWidth - ele.clientWidth );

  Modernizr.addTest ( 'scrollbar-size-' + size, true );

}( Modernizr ));
