
// @require ../init.js
// @require core/jquery/init.js

(function ( _, $ ) {

  /* CLONE DEEP */ // Much smaller than lodash's implementation

  _.cloneDeep = function ( obj ) {

    if ( obj === null || typeof ( obj ) !== 'object' || _.isElement ( obj ) || _.isRegExp ( obj ) || '__is_cloning__' in obj ) return obj;

    if ( typeof obj.clone === 'function' ) return obj.clone (); // There are no guaranties this will always work

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
