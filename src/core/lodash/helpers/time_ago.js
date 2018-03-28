
// @require ../init.js
// @require ./now_secs.js

(function ( _ ) {

  /* TIME AGO */

  _.mixin ({

    timeAgo ( timestamp ) { // Timestamp is required in seconds

      let elapsed = _.nowSecs () - timestamp,
          justNow = 5;

      let names = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'],
          times = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

      if ( elapsed < justNow ) {

        return {
          str: 'Just now',
          next: justNow - elapsed
        };

      } else {

        for ( let i = 0, l = times.length; i < l; i++ ) {

          let name = names[i],
              secs = times[i],
              number = Math.floor ( elapsed / secs );

          if ( number >= 1 ) {

            return {
              str: number + ' ' + name + ( number > 1 ? 's' : '' ) + ' ago',
              next: secs - ( elapsed - ( number * secs ) )
            };

          }

        }

      }

    }


  });

}( window.__svelto_lodash ));
