
/* DROPDOWNS */

var dropdowns_assignments = {};

$.fn.dropdowns = function ( options ) {

    options =  _.merge ({
        callbacks : {
            before_open: function () {},
            after_open: function () {},
            before_close: function () {},
            after_close: function () {}
        }
    }, options );

    return this.each ( function ( node ) {

        /* FUNCTIONS */

        var open = function () {

            if ( $dropdown_btn.hasClass ( 'inactive' ) ) return;

            options.callbacks.before_open ();

            dropdowns_assignments[dropdown_id] = $dropdown_btn;

            $dropdown_btn.addClass ( 'active' );

            $dropdown.addClass ( 'show' );

            positionate ();

            $.defer ( function () {

                $dropdown.addClass ( 'active' );

            });

            opened = true;

            options.callbacks.after_open ();

        };

        var close = function () {

            options.callbacks.before_close ();

            if ( dropdowns_assignments[dropdown_id] === $dropdown_btn ) {

                $dropdown.removeClass ( 'active' );

                $.defer ( function () {

                    $dropdown.removeClass ( 'show' );

                }, 150 );

            }

            $dropdown_btn.removeClass ( 'top bottom left right active' );

            $window.off ( 'click', window_click_handler );

            opened = false;

            options.callbacks.after_close ();

        };

        var positionate = function ( direction ) {

            // reset classes

            $dropdown_btn.removeClass ( 'top bottom left right' );
            $dropdown.removeClass ( 'top bottom left right' ).toggleClass ( 'no_tip', no_tip );

            // update offsets

            var body_offset = $body.offset (),
                drop_offset = $dropdown.offset (),
                btn_offset = $dropdown_btn.offset ();

            // common variables

            var btn_center_top = btn_offset.top + ( btn_offset.height / 2 ),
                btn_center_left = btn_offset.left + ( btn_offset.width / 2 );

            var bottom_space = body_offset.height - btn_offset.top - btn_offset.height,
                top_space = btn_offset.top,
                right_space = body_offset.width - btn_offset.left - btn_offset.width,
                left_space = btn_offset.left;

            var useful_doc_width = Math.min ( body_offset.width, drop_offset.width ),
                useful_doc_height = Math.min ( body_offset.height, drop_offset.height );

            var areas = {
                'bottom': Math.min ( bottom_space, drop_offset.height ) * useful_doc_width,
                'top': Math.min ( top_space, drop_offset.height ) * useful_doc_width,
                'right': Math.min ( right_space, drop_offset.width ) * useful_doc_height,
                'left': Math.min ( left_space, drop_offset.width ) * useful_doc_height
            };

            var needed_area = drop_offset.width * drop_offset.height;

            // helpers

            var get_vertical_left = function () {

                if ( no_tip ) {

                    if ( right_space + btn_offset.width >= drop_offset.width ) {

                        return btn_offset.left + 'px';

                    } else if ( left_space + btn_offset.width >= drop_offset.width ) {

                        return left_space + btn_offset.width - drop_offset.width + 'px';

                    }

                }

                return Math.max ( 0, Math.min ( body_offset.width - drop_offset.width, btn_center_left - ( drop_offset.width / 2 ) ) ) + 'px';

            };

            var get_horizontal_top = function () {

                if ( no_tip ) {

                    if ( bottom_space + btn_offset.height >= drop_offset.height ) {

                        return btn_offset.top + 'px';

                    } else if ( top_space + btn_offset.height >= drop_offset.height ) {

                        return top_space + btn_offset.height - drop_offset.height + 'px';

                    }

                }

                return Math.max ( 0, Math.min ( body_offset.height - drop_offset.height, btn_center_top - ( drop_offset.height / 2 ) ) ) + 'px';

            };

            var get_direction_type = function ( direction ) {

                return ( direction === 'top' || direction === 'bottom' ) ? 'vertical' : 'horizontal';

            };

            // get first with acceptable area

            if ( !direction ) {

                _.forEach ( areas, function ( area, dir ) {

                    if ( area >= needed_area ) {

                        direction = dir;
                        return false;

                    }

                });

            }

            // get the one with the maximum area

            if ( !direction ) {

                var max_area =  _.max ( areas );

                _.forEach ( areas, function ( area, dir ) {

                    if ( area === max_area ) {

                        direction = dir;
                        return false;

                    }

                });

            }

            // positionate everything

            if ( direction ) {

                var direction_type = get_direction_type ( direction );

                // positionate the dropdown

                var top = ( direction_type === 'horizontal' ) ? get_horizontal_top () : false;
                var left = ( direction_type === 'vertical' ) ? get_vertical_left () : false;

                switch ( direction ) {

                    case 'bottom':
                        top = ( body_offset.height - bottom_space ) + 'px';
                        break;

                    case 'top':
                        top = ( top_space - drop_offset.height ) + 'px';
                        break;

                    case 'right':
                        left = ( body_offset.width - right_space ) + 'px';
                        break;

                    case 'left':
                        left = ( left_space - drop_offset.width ) + 'px';
                        break;

                }

                $dropdown.css ({
                    top: top,
                    left: left
                });

                $dropdown_btn.addClass ( direction );
                $dropdown.addClass ( direction );

                // positionate the tip

                if ( !no_tip ) {

                    drop_offset = $dropdown.offset ();

                    switch ( direction ) {

                        case 'bottom':
                            $top_tip.css ( 'left', btn_center_left - drop_offset.left + 'px' );
                            break;

                        case 'top':
                            $bottom_tip.css ( 'left', btn_center_left - drop_offset.left + 'px' );
                            break;

                        case 'right':
                            $left_tip.css ( 'top', btn_center_top - drop_offset.top + 'px' );
                            break;

                        case 'left':
                            $right_tip.css ( 'top', btn_center_top - drop_offset.top + 'px' );
                            break;

                    }

                }

            }

        };

        var update = function () {

            if ( opened ) {

                positionate ();

            }

        };

        /* VARIABLES */

        var $dropdown_btn = $(node),
            dropdown_id = $dropdown_btn.data ( 'dropdown' ),
            $dropdown = $('#' + dropdown_id),
            no_tip = $dropdown_btn.hasClass ( 'no_tip' ) || $dropdown.hasClass ( 'no_tip' ),
            $bottom_tip = no_tip ? false : $dropdown.find ( '.bottom_tip' ),
            $top_tip = no_tip ? false : $dropdown.find ( '.top_tip' ),
            $right_tip = no_tip ? false : $dropdown.find ( '.right_tip' ),
            $left_tip = no_tip ? false : $dropdown.find ( '.left_tip' ),
            $btn_parents = $dropdown_btn.parents (),
            $buttons = $dropdown.find ( '.button' ),
            opened = false;

        /* EVENTS */

        var window_click_handler = function ( event ) {

            var $parents = $(event.target).parents ();

            if ( $parents.contains ( $dropdown ) ) return; // check if we clicked inside the dropdown

            close ();

        };

        $dropdown_btn.on ( 'click', function () {

            if ( opened ) {

                close ();

            } else {

                open ();

                $.defer ( function () {

                    $window.on ( 'click', window_click_handler );

                });

            }

        });

        $buttons.on ( 'click', close );

        $window.on ( 'resize scroll', update );

        $btn_parents.on ( 'scroll', update );

    });

};

/* READY */

$.dom_ready ( function () {

    $('.dropdown_trigger').dropdowns ();

});
