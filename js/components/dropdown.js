
/* DROPDOWNS */

;(function ( $, window, document, undefined ) {

    var assignments = {};

    $.factory ( 'dropdown', {

        beforeOpen: $.noop,
        afterOpen: $.noop,
        beforeClose: $.noop,
        afterClose: $.noop

    }, {

        /* SPECIAL */

        init: function () {

            this.dropdown_id = this.$node.data ( 'dropdown' );
            this.$dropdown = $('#' + dropdown_id);
            this.no_tip = this.$node.hasClass ( 'no_tip' ) || this.$dropdown.hasClass ( 'no_tip' );
            this.$bottom_tip = this.no_tip ? false : this.$dropdown.find ( '.bottom_tip' );
            this.$top_tip = this.no_tip ? false : this.$dropdown.find ( '.top_tip' );
            this.$right_tip = this.no_tip ? false : this.$dropdown.find ( '.right_tip' );
            this.$left_tip = this.no_tip ? false : this.$dropdown.find ( '.left_tip' );
            this.$btn_parents = this.$node.parents ();
            this.$buttons = this.$dropdown.find ( '.button' );
            this.opened = false;

            this.$node.on ( 'click', this._handler_btn_click );
            this.$buttons.on ( 'click', this.close );
            $window.on ( 'resize scroll', this.update );
            this.$btn_parents.on ( 'scroll', this.update );

        },

        ready: function () {

            $('.dropdown_trigger').dropdowns ();

        },

        /* PRIVATE */

        _handler_window_click: function ( event ) {

            var $parents = $(event.target).parents ();

            if ( $parents.index ( this.$dropdown ) !== -1 ) return; // check if we clicked inside the dropdown

            this.close ();

        },

        _handler_btn_click: function () {

            if ( this.opened ) {

                this.close ();

            } else {

                this.open ();

                $.defer ( function () {

                    $window.on ( 'click', _handler_window_click );

                });

            }

        },

        /* PUBLIC */

        open: function () {

            if ( this.$node.hasClass ( 'inactive' ) ) return;

            this.hook ( 'beforeOpen' );

            assignments[dropdown_id] = this.$node;

            this.$node.addClass ( 'active' );

            this.$dropdown.addClass ( 'show' );

            this.positionate ();

            this.$dropdown.defer ( function () {

                this.addClass ( 'active' );

            });

            this.opened = true;

            this.hook ( 'afterOpen' );

        },

        close: function () {

            this.hook ( 'beforeClose' );

            if ( assignments[dropdown_id] === this.$node ) {

                this.$dropdown.removeClass ( 'active' );

                this.$dropdown.defer ( function () {

                    this.removeClass ( 'show' );

                }, 150 );

            }

            this.$node.removeClass ( 'top bottom left right active' );

            $window.off ( 'click', this._handler_window_click );

            this.opened = false;

            this.hook ( 'afterClose' );

        },

        positionate: function () {

            // reset classes

            this.$node.removeClass ( 'top bottom left right' );
            this.$dropdown.removeClass ( 'top bottom left right' ).toggleClass ( 'no_tip', this.no_tip );

            // update offsets

            var body_offset = $body.offset (),
                drop_offset = this.$dropdown.offset (),
                btn_offset = this.$node.offset ();

            // common variables

            var btn_center_top = btn_offset.top + ( btn_offset.height / 2 ),
                btn_center_left = btn_offset.left + ( btn_offset.width / 2 );

            var bottom_space = body_offset.height - btn_offset.top - btn_offset.height,
                top_space = btn_offset.top,
                right_space = body_offset.width - btn_offset.left - btn_offset.width,
                left_space = btn_offset.left;

            console.log(top_space);
            console.log(right_space);
            console.log(bottom_space);
            console.log(left_space);

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

                if ( this.no_tip ) {

                    if ( right_space + btn_offset.width >= drop_offset.width ) {

                        return btn_offset.left + 'px';

                    } else if ( left_space + btn_offset.width >= drop_offset.width ) {

                        return left_space + btn_offset.width - drop_offset.width + 'px';

                    }

                }

                return Math.max ( 0, Math.min ( body_offset.width - drop_offset.width, btn_center_left - ( drop_offset.width / 2 ) ) ) + 'px';

            };

            var get_horizontal_top = function () {

                if ( this.no_tip ) {

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

                for ( var dir in areas ) {

                    if ( areas[dir] >= needed_area ) {

                        direction = dir;
                        break;

                    }

                }

            }

            // get the one with the maximum area

            if ( !direction ) {

                var max_area;

                for ( var dir in areas ) {

                    if ( areas[dir] > max_area ) {

                        max_area = areas[dir];

                    }

                }

                for ( var dir in areas ) {

                    if ( areas[dir] === max_area ) {

                        direction = dir;
                        break;

                    }

                }

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

                this.$dropdown.css ({
                    top: top,
                    left: left
                });

                this.$node.addClass ( direction );
                this.$dropdown.addClass ( direction );

                // positionate the tip

                if ( !this.no_tip ) {

                    drop_offset = this.$dropdown.offset ();

                    switch ( direction ) {

                        case 'bottom':
                            this.$top_tip.css ( 'left', btn_center_left - drop_offset.left + 'px' );
                            break;

                        case 'top':
                            this.$bottom_tip.css ( 'left', btn_center_left - drop_offset.left + 'px' );
                            break;

                        case 'right':
                            this.$left_tip.css ( 'top', btn_center_top - drop_offset.top + 'px' );
                            break;

                        case 'left':
                            this.$right_tip.css ( 'top', btn_center_top - drop_offset.top + 'px' );
                            break;

                    }

                }

            }

        },

        update: function () {

            if ( this.opened ) {

                this.positionate ();

            }

        }

    });

}( lQuery, window, document ));
