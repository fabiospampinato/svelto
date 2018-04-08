
// @require ../init.js

(function ( _ ) {

  /* DIRECTION */

  _.roundCloser = function ( number, step ) {

    if ( _.isUndefined ( step ) ) {

      step = 1;

    }

    let left = ( number % step ),
        halfStep = step / 2;

    return number - left + ( left >= halfStep ? step : 0 );

  };

}( window._ ));
