
// @require core/svelto/svelto.js

(function ( $, _, Svelto ) {

  /* URL */

  let URL = {
    targetRe: /#(.*)$/,
    isEqual ( url1, url2, stripTarget = false ) {
      if ( !_.isString ( url1 ) || !_.isString ( url2 ) ) return url1 === url2;
      url1 = stripTarget ? url1.replace ( URL.targetRe, '' ) : url1;
      url2 = stripTarget ? url2.replace ( URL.targetRe, '' ) : url2;
      return _.trimEnd ( url1, '/' ) === _.trimEnd ( url2, '/' );
    },
    makeAbsolute ( url ) {
      if ( url.startsWith ( '/' ) || url.includes ( '://' ) ) return url;
      return `/${url}`;
    }
  };

  /* EXPORT */

  Svelto.URL = URL;

}( Svelto.$, Svelto._, Svelto ));
