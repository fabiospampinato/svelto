
/* TOGGLE HEIGHT  */

$.fn.toggleHeight = function ( force ) {

    return this.each ( function ( node ) {

        // FUNCTIONS

        var is_visible = function () {

            return $ele.height () !== 0;

        };

        var get_actual_height = function () {

            var old_style = $ele.attr ( 'style' ) || '';

            $ele.css ( 'css-text', old_style + 'display:block;position:absolute;top:-99999px;height:auto;' );

            var actual_height = $ele.height ();

            $ele.css ( 'css-text', old_style );

            return actual_height;

        };

        var toggle = function () {

            if ( is_visible () || force === false ) {

                $.defer ( function () {

                    $ele.css ( 'height', 0 );

                });

                $.defer ( function () {

                    $ele.toggle ( false );

                }, speed || 0 );

            } else {

                $ele.toggle ( true );

                var actual_height = get_actual_height ();

                $.defer ( function () {

                    $ele.css ( 'height', actual_height + 'px' );

                });

                $.defer ( function () {

                    $ele.css ( 'height', 'auto' );

                }, speed );

            }

        };

        // VARIABLES

        var $ele = $(node),
            speed = parseFloat ( $ele.css ( 'transition-duration' ) ) * 1000;

        // INIT

        $ele.css ( 'height', $ele.height () + 'px' );

        toggle ();

    });

};
