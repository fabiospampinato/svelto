
/* =========================================================================
 * Svelto - Lib - URL
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* URL */

  let URL = {
    targetRe: /#(.*)$/,
    isEqual ( url1, url2, stripTarget = false ) {
      if ( !_.isString ( url1 ) || !_.isString ( url2 ) ) return _.isEqual ( url1, url2 );
      url1 = stripTarget ? url1.replace ( URL.targetRe, '' ) : url1;
      url2 = stripTarget ? url2.replace ( URL.targetRe, '' ) : url2;
      return _.trimEnd ( url1, '/' ) === _.trimEnd ( url2, '/' );
    }
  };

  /* EXPORT */

  Svelto.URL = URL;

}( Svelto.$, Svelto._, Svelto ));
