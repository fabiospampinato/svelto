
/* =========================================================================
 * Svelto - @FILE-NAME-UPPERCASED v0.1.0
  *
 * http://getsvelto.com/@FILE-NAME
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* BLUR */

    $.fn.blurred = function ( force ) {

        return this.toggleClass ( 'blurred', force );

    };

}( jQuery, _, window, document ));
