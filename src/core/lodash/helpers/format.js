
// @require ../init.js

(function ( _ ) {

  /* FORMAT */

  _.format = function ( msg, ...args ) {

    for ( let i = 1, l = args.length; i <= l; i++ ) {

      msg = msg.replace ( `$${i}`, args[i - 1] );

    }

    return msg;

  };

}( window._ ));
