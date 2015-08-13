
/* LODASH EXTRA */

;(function ( _, window, document, undefined ) {

    'use strict';

    /* LODASH EXTRA */

    _.mixin ({

        /**
         * Gets the number of seconds that have elapsed since the Unix epoch
         * (1 January 1970 00:00:00 UTC).
         *
         * _.defer(function(stamp) {
         *   console.log(_.nowSecs() - stamp);
         * }, _.nowSecs());
         * // => logs the number of seconds it took for the deferred function to be invoked
         */

        nowSecs: function () {

            return _.floor ( _.now () / 1000 );

        },

        /**
         * Gets a string format of number of seconds elapsed.
         *
         * _.timeAgo ( _.nowSecs () )
         * // => Just now
         */

        timeAgo: function ( timestamp ) { //INFO: Timestamp is required in seconds

            var elapsed = _.nowSecs () - timestamp,
                just_now = 5;

            var names = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'],
                times = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

            if ( elapsed < just_now ) {

                return {
                    str: 'Just now',
                    next: just_now - elapsed
                };

            } else {

                for ( var i = 0, l = times.length; i < l; i++ ) {

                    var name = names[i],
                        secs = times[i],
                        number = _.floor ( elapsed / secs );

                    if ( number >= 1 ) {

                        return {
                            str: number + ' ' + name + ( number > 1 ? 's' : '' ) + ' ago',
                            next: secs - ( elapsed - ( number * secs ) )
                        };

                    }

                }

            }

        },

        /**
         * Return a boolean if the string is fuzzy matched with the search string.
         *
         * _.fuzzyMatch ( 'something', 'smTng' );
         * // => true
         *
         * _.fuzzyMatch ( 'something', 'smTng', false );
         * // => false
         *
         * _.fuzzyMatch ( 'something', 'semthing' );
         * // => false
         */

        fuzzyMatch: function ( str, search, isCaseSensitive ) {

            if ( isCaseSensitive !== false ) {

                str = str.toLowerCase ();
                search = search.toLowerCase ();

            }

            var current_index = -1,
                str_l = str.length;

            for ( var search_i = 0, search_l = search.length; search_i < search_l; search_i++ ) {

                for ( var str_i = current_index + 1; str_i < str_l; str_i++ ) {

                    if ( str[str_i] === search[search_i] ) {

                        current_index = str_i;
                        str_i = str_l + 1;

                    }

                }

                if ( str_i === str_l ) {

                    return false;

                }

            }

            return true;

        },

        /**
         * Returns a number clamped between a minimum and maximum value.
         * If the maximum isn't provided, only clamps from the bottom.
         *
         * @param {number} minimum The minimum value.
         * @param {number} value The value to clamp.
         * @param {number} maximum The maximum value.
         * @returns {number} A value between minimum and maximum.
         *
         * @example
         *
         * _.clamp(2, 4, 6); // => 4
         * _.clamp(3, 2, 5); // => 3
         * _.clamp(2, 7, 5); // => 5
         */

        clamp: function ( minimum, value, maximum ) {

            return Math.max ( minimum, Math.min ( maximum, value ) );

        },

        /**
         * Performs a binary each of the array
         */

        btEach: function ( arr, callback, startIndex ) {

            var start = 0,
                end = arr.length - 1,
                center = _.isNumber ( startIndex ) ? startIndex : _.ceil ( ( start + end ) / 2 ),
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

                center = _.ceil ( ( start + end ) / 2 );

            }

            return -1;

        },

        /**
         * Returns true
         */

        true: _.constant ( true ),

        /**
         * Returns false
         */

        false: _.constant ( false )

    });

}( _, window, document ));
