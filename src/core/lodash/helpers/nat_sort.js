
// @require ../init.js

(function ( _ ) {

  /* NAT SORT */

  _.natSort = _.natSortBy = function ( arr, iteratee = _.identity ) {

    return arr.sort ( ( a, b ) => iteratee ( a ) - iteratee ( b ) );

  };

}( window._ ));
