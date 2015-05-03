
/* TOUCHING */

//TODO: make it also able to return more than one match

;(function ( $, window, document, undefined ) {

    'use strict';

    //FIXME: It's not a widget

    $.factory ( 'presto.touching', {

        /* OPTIONS */

        options: {
            start_index : false,
            x : 0,
            y : 0
        },

        /* SPECIAL */

        _init: function () {

            var options = this.options,
                touched = false;

            this.bt_each ( function () {

                var $ele = $(this),
                    offset = $ele.offset (),
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

            }, this.options.start_index );

            return touched;

        }

    });

}( lQuery, window, document ));
