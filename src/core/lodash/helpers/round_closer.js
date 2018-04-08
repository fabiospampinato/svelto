
// @require ../init.js

(function ( _ ) {

  /* ROUND CLOSER */

  _.roundCloser = function ( number, step = 1 ) {

    let left = ( number % step ),
        halfStep = step / 2;

    return number - left + ( left >= halfStep ? step : 0 );

  };

}( window._ ));
