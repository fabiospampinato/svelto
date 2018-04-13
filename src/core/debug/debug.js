
// @priority 1000000
// @require core/svelto/svelto.js

(function ( $, _, Svelto ) {

  /* DEBUG */

  window.log = console.log.bind ( console );

  const timeMarks = {};
  const timeComulatives = {};
  window.time = function ( mark = '?', cumulative = false ) {
    if ( cumulative && !timeComulatives[mark] ) {
      timeComulatives[mark] = { total: 0 };
    }
    if ( !timeMarks[mark] ) {
      timeMarks[mark] = true;
      if ( cumulative ) {
        timeComulatives[mark].start = performance.now ();
      }
      console.time ( mark );
    } else {
      if ( cumulative ) {
        timeComulatives[mark].total += performance.now () - timeComulatives[mark].start;
      }
      console.timeEnd ( mark );
      delete timeMarks[mark];
      if ( cumulative ) {
        console.log ( `Σ${mark}: ${timeComulatives[mark].total}ms` );
      }
    }
  }

  window.hash = function ( str ) {
    let hash = 0;
    if ( !str.length ) return hash;
    for ( let i = 0, l = str.length; i < l; i++ ) {
      let char = str.charCodeAt ( i );
      hash = ( ( hash << 5 ) - hash ) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };

  _.debugger = function () {
    debugger;
  };

}( Svelto.$, Svelto._, Svelto ));
