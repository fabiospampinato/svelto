
// @require ./fetch.js

(function ( $, _, Svelto, fetch ) {

  /* HELPERS */

  fetch.getValue = async function ( res, key ) {

    if ( !res ) return;

    try {

      let json = await res.json ();

      return key ? json[key] : json;

    } catch ( e ) {}

  };

}( Svelto.$, Svelto._, Svelto, Svelto.fetch ));
