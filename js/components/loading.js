
/* LOADING */

$.fn.loading = function ( activate ) {

    return this.each ( function ( node ) {

        var $ele = $(node);

        if ( activate ) {

            $ele.addClass ( 'loading' );

            $.defer ( function () {

                $ele.addClass ( 'loading_active' );

            });

        } else {

            $ele.removeClass ( 'loading_active' );

            $.defer ( function () {

                $ele.removeClass ( 'loading' );

            }, 200 );

        }

    });

};
