
// @require ../init.js

(function ( _ ) {

  /* PROP */ // Tiny, limited (doesn't support arrays), not very fast, alternative to `get` and `set`

  _.prop = _.get = _.set = function ( obj, selector, value ) {

    if ( !selector ) return;

    const get = ( arguments.length === 2 );

    const result = selector
                     .split ( '.' )
                     .filter ( _.identity )
                     .reduce ( ( obj, key, keyIndex, keys ) => {
                       if ( get ) {
                         return obj && obj[key];
                       } else {
                         if ( obj ) {
                           if ( keyIndex === ( keys.length - 1 ) ) {
                             return obj[key] = value;
                           } else {
                             return obj[key] || ( obj[key] = {} );
                           }
                         }
                       }
                     }, obj );

    return get ? result : obj;

  };

}( window.__svelto_lodash ));
