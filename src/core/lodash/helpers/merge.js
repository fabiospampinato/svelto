
// @require ../init.js

(function ( _ ) {

  /* MERGE */ // Much smaller than lodash's implementation (it's only ment to work with plain objects)

  _.merge = function ( ...objs ) {

    return objs.reduce ( ( acc, obj ) => {

      if ( _.isPlainObject ( obj ) ) {

        for ( let key in obj ) {

          if ( !obj.hasOwnProperty ( key ) ) continue;

          if ( _.isPlainObject ( obj[key] ) ) {

            if ( !acc[key] ) acc[key] = {};

            _.merge ( acc[key], obj[key] );

          } else {

            acc[key] = obj[key];

          }

        }

      }

      return acc;

    });

  };

}( window.__svelto_lodash ));
