
// @require ../init.js
// @require core/jquery/init.js

(function ( _, $ ) {

  /* CLONE DEEP */ // Much smaller than lodash's implementation

  _.cloneDeep = function ( obj ) {

    if ( obj === null || typeof ( obj ) !== 'object' || _.isElement ( obj ) || _.isRegExp ( obj ) || obj instanceof $ || '__is_cloning__' in obj ) return obj;

    const dupe = obj instanceof Date ? new obj.constructor () : obj.constructor ();

    for ( let key in obj ) {

      if ( !obj.hasOwnProperty ( key ) ) continue;

      obj['__is_cloning__'] = true;

      dupe[key] = _.cloneDeep ( obj[key] );

      delete obj['__is_cloning__'];

    }

    return dupe;

  };

}( window._, window.$ ));
