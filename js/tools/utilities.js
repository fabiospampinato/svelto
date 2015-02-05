
/* VARIABLES */

var is_mobile = /iphone|ipad|android|ipod|opera mini|opera mobile|blackberry|iemobile|webos|windows phone|playbook|tablet|kindle/i.test ( navigator.userAgent.toLowerCase () );
var is_tablet = /ipad|playbook|tablet|kindle/i.test ( navigator.userAgent.toLowerCase () );

/* EVENTS */

var get_event_pageXY = function ( event ) {

    var pageXY = {
        pageX : 0,
        pageY : 0
    };

    if ( _.isUndefined ( event.originalEvent ) === false ) {

        event = event.originalEvent;

    }

    if ( _.isUndefined ( event.touches ) === false && _.isUndefined ( event.touches[0] ) === false ) {

        pageXY.pageX = event.touches[0].pageX;
        pageXY.pageY = event.touches[0].pageY;

    } else if ( _.isUndefined ( event.changedTouches ) === false &&_.isUndefined ( event.changedTouches[0] ) === false ) {

        pageXY.pageX = event.changedTouches[0].pageX;
        pageXY.pageY = event.changedTouches[0].pageY;

    } else if ( _.isUndefined ( event.pageX ) === false ) {

        pageXY.pageX = event.pageX;
        pageXY.pageY = event.pageY;

    }

    return pageXY;

};

/* STRING */

var str_repeat = function ( str, times ) {

    if ( times < 1 ) return '';

    var result = '';

    while ( times > 1 ) {

        if ( times & 1 ) result += str;
        times >>= 1, str += str;

    }

    return result + str;

};

var search_and_replace = function ( str, search, replace ) {

    if ( _( search ).contains ( str ) ) {

        str = _.zipObject ( search, replace )[str];

    }

    return str;

};

var fuzzy_match = function ( string, search ) {

    var matches = true,
         current_index = -1;

    for ( var n = 0; n < search.length; n++ ) {

        var search_char = search[n];

        matches = false;

        for ( var m = current_index + 1; m < string.length; m++ ) {

            var string_char = string[m];

            if ( search_char.toLowerCase() == string_char.toLowerCase() ) {

                current_index = m;
                matches = true;
                break;

            }

        }

        if ( matches == false ) {
            return false;
        }

    }

    return true;

};

/* TIMESTAMP */

var secs_timestamp = function () {

    return Math.round ( new Date ().getTime () / 1000 );

};

var msecs_timestamp = function () {

    return new Date ().getTime ();

};

var get_time_ago = function ( timestamp ) {

    var now = secs_timestamp (),
        elapsed = now - timestamp;

    var times = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    if ( elapsed < 5 ) {

        return {
            str: 'Just now',
            next: 5 - elapsed
        };

    } else {

        for ( var name in times ) {

            var secs = times[name];

            if ( elapsed / secs >= 1 ) {

                var number = Math.floor ( elapsed / secs );

                return {
                    str: ( number > 1 ) ? number + ' ' + name + 's ago' : number + ' ' + name + ' ago',
                    next: secs - ( elapsed - ( number * secs ) )
                };

            }

        }

    }

};

/* OTHER */

var arguments_hash = function () {

    return _.flatten ( arguments ).join ();

};
