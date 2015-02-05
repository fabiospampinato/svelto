
/* TOUCHING */

//TODO: make it also able to return more than one match

$.fn.touching = function ( options ) {

    options =  _.merge ({
        start_index : false,
        x : 0,
        y : 0
    }, options );

    var touched = false;

    this.bt_each ( function ( node ) {

        var $ele = $(node),
            offset = $ele.offset ();
            x1 = offset.left,
            y1 = offset.top;

        if ( options.y >= y1 ) {

            if ( options.y <= y1 + $ele.height () ) {

                if ( options.x >= x1 ) {

                    if ( options.x <= x1 + $ele.width () ) {

                        touched = $ele;

                        return false;

                    } else {

                        return 1;

                    }

                } else {

                    return -1;

                }

            } else {

                return 1;

            }


        } else {

            return -1;

        }

    }, options.start_index );

    return touched;

};
