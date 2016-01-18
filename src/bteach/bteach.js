
/* =========================================================================
 * Svelto - BT (BinaryTree) Each
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* BINARY TREE .each () */

  $.fn.btEach = function ( callback, startIndex ) {

    return _.btEach ( this, callback, startIndex );

  };

}( Svelto.$, Svelto._, Svelto ));
