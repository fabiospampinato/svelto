
/* =========================================================================
 * Svelto - Lib - Notification
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

// If the tab hasn't the focus and we can use the native notifications than we'll send a native notification, otherwise we will fallback to a toast

(function ( $, _, Svelto, Widgets ) {

  'use strict';

  /* DEFAULTS */

  let defaults = {
    title: false,
    body: false,
    img: false,
    ttl: Widgets.Toast.config.options.ttl
  };

  /* NOTIFICATION */

  //TODO: Add support for string options

  $.notification = function ( options ) {

    /* OPTIONS */

    options = _.extend ( {}, $.notification.defaults, options );

    /* NOTIFICATIONS */

    if ( !document.hasFocus () && window.Notification && Notification.permission !== 'denied' ) {

      Notification.requestPermission ( function ( status ) {

        if ( status === 'granted' ) {

          let notification = new Notification ( options.title, { body: options.body, icon: options.img } );

          if ( _.isNumber ( options.ttl ) && !_.isNaN ( options.ttl ) && options.ttl !== Infinity ) {

            setTimeout ( function () {

              notification.close ();

            }, options.ttl );

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

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets ));
