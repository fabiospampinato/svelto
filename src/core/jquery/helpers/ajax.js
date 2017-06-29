
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Ajax)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../init.js
 * @require core/lodash/lodash.js
 * ========================================================================= */

(function ( $, _ ) {

  'use strict';

  /* AJAX */

  const attemptJSON = function ( res ) {

    let resj = _.attempt ( JSON.parse, res );

    return _.isError ( resj ) ? null : resj;

  };

  $.ajaxParseResponse = function ( res ) {

    return _.isPlainObject ( res )
             ? 'responseJSON' in res
               ? res.responseJSON
               : 'responseText' in res
                 ? attemptJSON ( res.responseText )
                 : res
             : _.isString ( res )
               ? attemptJSON ( res )
               : null;

  };

  $.ajaxResponseGet = function ( res, key ) {

    let resj = $.ajaxParseResponse ( res );

    return resj ? resj[key] : undefined;

  };

}( jQuery, lodash ));
