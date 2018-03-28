
// @require ./toast.js

(function ( $, _, Svelto, Toast ) {

  /* HELPER */

  $.toast = function ( options = {} ) {

    /* OPTIONS */

    options = _.isPlainObject ( options ) ? options : { body: String ( options ) };

    /* TYPE */

    if ( options.buttons ) {

      options.type = 'action';

    }

    /* TOAST */

    return Toast.whenReady.call ( Toast, () => new Toast ( options ) );

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.Toast ));
