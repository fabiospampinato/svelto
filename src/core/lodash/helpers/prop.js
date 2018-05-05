
// @require ../init.js

(function ( _ ) {

  /* PROP */ // Tiny, limited (doesn't support arrays), not very fast, alternative to `get` and `set`

  _.get = function ( obj, selector, value, _isGet = true ) {

    if ( !selector ) return;

    const result = selector
                     .split ( '.' )
                     .filter ( _.identity )
                     .reduce ( ( obj, key, keyIndex, keys ) => {
                       if ( _isGet ) {
                         return obj && ( obj[key] !== undefined ? obj[key] : value );
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

    return _isGet ? result : obj;

  };

  _.set = function ( obj, selector, value ) {
    return _.get ( obj, selector, value, false );
  }

}( window._ ));
