
// @require core/svelto/svelto.js
// @require widgets/toast/toast.js

// If the page isn't visible and we can use the native notifications than we'll send a native notification, otherwise we will fallback to a toast

(function ( $, _, Svelto, Toast ) {

  /* DEFAULTS */

  let defaults = {
    title: '',
    body: '',
    img: '',
    ttl: Toast.config.options.ttl
  };

  /* NOTIFICATION */

  $.notification = function ( options ) {

    /* OPTIONS */

    options = _.isPlainObject ( options ) ? _.extend ( {}, $.notification.defaults, options ) : String ( options );

    /* NOTIFICATIONS */

    if ( document.hidden && window.Notification && Notification.permission !== 'denied' ) {

      Notification.requestPermission ( function ( status ) {

        if ( status === 'granted' ) {

          let notification = _.isString ( options ) ? new Notification ( options ) : new Notification ( options.title, { body: options.body, icon: options.img } );

          if ( _.isNumber ( options.ttl ) && !_.isNaN ( options.ttl ) && options.ttl !== Infinity ) {

            setTimeout ( notification.close.bind ( notification ), options.ttl );

          }

        } else {

          $.toast ( options );

        }

      });

    } else {

      $.toast ( options );

    }

  };

  /* BINDING */

  $.notification.defaults = defaults;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.Toast ));
