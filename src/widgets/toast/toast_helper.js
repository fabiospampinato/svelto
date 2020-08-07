
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

    return Toast.whenReady.call ( Toast, () => {

      const toast = new Toast ( options );

      toast.$element.one ( 'toast:close', () => {

        _.defer ( () => toast.destroy () );

      });

    });

  };

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.Toast ));
