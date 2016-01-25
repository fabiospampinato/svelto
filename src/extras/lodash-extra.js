
/* =========================================================================
 * Svelto - Lodash (Extras)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * ========================================================================= */

//TODO: Write it better

(function ( _ ) {

  'use strict';

  /* LODASH EXTRA */

  _.mixin ({

    nowSecs () {

      return Math.floor ( _.now () / 1000 );

    },

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

    },

    fuzzyMatch ( str, search, isCaseSensitive ) {

      if ( isCaseSensitive !== false ) {

        str = str.toLowerCase ();
        search = search.toLowerCase ();

      }

      let currentIndex = -1,
          str_i,
          str_l = str.length;

      for ( let search_i = 0, search_l = search.length; search_i < search_l; search_i++ ) {

        for ( str_i = currentIndex + 1; str_i < str_l; str_i++ ) {

          if ( str[str_i] === search[search_i] ) {

            currentIndex = str_i;
            str_i = str_l + 1;

          }

        }

        if ( str_i === str_l ) {

          return false;

        }

      }

      return true;

    },

    clamp ( value, minimum, maximum ) {

      if ( !_.isUndefined ( maximum ) ) {

        if ( value > maximum ) {

          value = maximum;

        }

      }

      if ( !_.isUndefined ( minimum ) ) {

        if ( value < minimum ) {

          value = minimum;

        }

      }

      return value;

    },

    btEach ( arr, callback, startIndex ) {

      let start = 0,
          end = arr.length - 1,
          center = _.isNumber ( startIndex ) ? startIndex : Math.ceil ( ( start + end ) / 2 ),
          direction;

      while ( start <= end ) {

        direction = callback.call ( arr[center], center, arr[center] );

        if ( direction < 0 ) {

          end = center - 1;

        } else if ( direction > 0 ) {

          start = center + 1;

        } else {

          return center;

        }

        center = Math.ceil ( ( start + end ) / 2 );

      }

      return -1;

    },


     move ( arr, from, to ) {

       arr.splice ( to, 0, arr.splice ( from, 1 )[0] );

     },

     mkize ( number ) {

      //TODO: Add support for a `precision` extra argument

    	if ( number >= 1000000 ) {

    		return Math.floor ( number / 1000000 ) + 'M';

    	} else if ( number >= 1000 ) {

    		return Math.floor ( number / 1000 ) + 'K';

    	} else {

    		return number;

    	}

    },

    roundCloser ( number, step ) {

      if ( _.isUndefined ( step ) ) {

        step = 1;

      }

      let left = ( number % step ),
          halfStep = step / 2;

      return number - left + ( left >= halfStep ? step : 0 );

    },

    format ( msg, ...args ) {

      for ( let i = 0, l = args.length; i < l; i++ ) {

        msg = msg.replace ( '$' + ( i + 1 ), args[i] );

      }

      return msg;

    },

    getDirections () {

      return ['top', 'bottom', 'left', 'right'];

    },

    getOppositeDirection ( direction ) {

      return {
        'top'   : 'bottom',
        'bottom': 'top',
        'left'  : 'right',
        'right' : 'left'
      }[direction];

    },

    true: _.constant ( true ),

    false: _.constant ( false )

  });

}( Svelto._ ));
