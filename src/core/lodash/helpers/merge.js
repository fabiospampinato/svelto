
// @require ../init.js

(function ( _ ) {

  /* MERGE */ // Much smaller than lodash's implementation (it's only ment to work with plain objects)

  _.merge = function ( ...objs ) {

    return objs.reduce ( ( acc, obj ) => {

      if ( _.isPlainObject ( obj ) ) {

        for ( let key in obj ) {

          if ( !obj.hasOwnProperty ( key ) ) continue;

          const value = obj[key];

          if ( !_.isPlainObject ( value ) || !_.isPlainObject ( acc[key] ) ) {

            acc[key] = value;

          } else {

            if ( !acc[key] ) acc[key] = {};

            _.merge ( acc[key], obj[key] );

          }

        }

      }

      return acc;

    });

  };

}( window._ ));
