
/* DROPDOWN */

//TODO: add support for delegating the trigger click, so that we support the case when a trigger has been added to the DOM dynamically
//TODO: add dropdown-closer

;(function ( $, window, document, undefined ) {

    'use strict';

    /* VARIABLES */

    var assignments = {};

    /* DROPDOWN */

    $.widget ( 'presto.dropdown', {

        /* OPTIONS */

        options: {
            callbacks: {
                open: $.noop,
                close: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$dropdown = this.$element;
            this.id = this.$dropdown.attr ( 'id' );
            this.$tips = this.$dropdown.find ( '.dropdown-tip' );
            this.$top_tip = this.$tips.filter ( '.top' );
            this.$right_tip = this.$tips.filter ( '.right' );
            this.$bottom_tip = this.$tips.filter ( '.bottom' );
            this.$left_tip = this.$tips.filter ( '.left' );
            this.$actionables = this.$dropdown.find ( '.actionable' );

            this.$triggers = $('.dropdown-trigger[data-dropdown="' + this.id + '"]');

            this.hasTips = !this.$dropdown.hasClass ( 'no-tip' );
            this.isAttached = this.$dropdown.hasClass ( 'attached' );

            this.opened = false;

        },

        _events: function () {

            this._on ( this.$triggers, 'click', this.toggle );

            this._on ( this.$actionables, 'click', this.close );

            // this.$btn_parents.on ( 'scroll', this.update ); //FIXME: If we are doing it into a scrollable content it will be a problem if we don't handle it, the dropdown will not move

        },

        /* WINDOW RESIZE / SCROLL */

        _bind_window_resize_scroll: function () {

            this._on ( $window, 'resize scroll', this.update );

        },

        _unbind_window_resize_scroll: function () {

            this._off ( $window, 'resize scroll', this.update );

        },

        /* WINDOW CLICK */

        _bind_window_click: function () {

            this._on ( $window, 'click', this._handler_window_click );

        },

        _unbind_window_click: function () {

            this._off ( $window, 'click', this._handler_window_click );

        },

        _handler_window_click: function ( event ) {

            var $parents = $(event.target).parents ();

            if ( $parents.index ( this.$dropdown ) === -1 ) { //INFO: Checking if we clicked inside the dropdown or another trigger for this dropdown

                for ( var i = 0, l = this.$triggers.length; i < l; i++ ) {

                    if ( event.target === this.$triggers.nodes[i] || $parents.index ( this.$triggers.nodes[i] ) !== -1 ) {

                        return;

                    }

                }

                this.close ();

            }

        },

        /* POSITIONATE */

        _positionate: function () {

            // Variables

            var $trigger = $(assignments[this.id]),
                no_tip = $trigger.hasClass ( 'no-tip' ) || !this.hasTips || this.isAttached;

            // Reset classes

            this.$dropdown.removeClass ( 'top bottom left right' ).toggleClass ( 'no-tip', no_tip );

            // update offsets

            var html_offset = $html.offset (),
                drop_offset = this.$dropdown.offset (),
                trig_offset = $trigger.offset ();

            // common variables

            var trig_center_top = trig_offset.top + ( trig_offset.height / 2 ),
                trig_center_left = trig_offset.left + ( trig_offset.width / 2 );

            var bottom_space = html_offset.height - trig_offset.top - trig_offset.height,
                top_space = trig_offset.top,
                right_space = html_offset.width - trig_offset.left - trig_offset.width,
                left_space = trig_offset.left;

            var useful_doc_width = Math.min ( html_offset.width, drop_offset.width ),
                useful_doc_height = Math.min ( html_offset.height, drop_offset.height );

            var areas = {
                bottom: Math.min ( bottom_space, drop_offset.height ) * useful_doc_width,
                top: Math.min ( top_space, drop_offset.height ) * useful_doc_width,
                right: Math.min ( right_space, drop_offset.width ) * useful_doc_height,
                left: Math.min ( left_space, drop_offset.width ) * useful_doc_height
            };

            var needed_area = drop_offset.width * drop_offset.height;

            // helpers

            var get_vertical_left = function () {

                if ( no_tip ) {

                    if ( right_space + trig_offset.width >= drop_offset.width ) {

                        return trig_offset.left;

                    } else if ( left_space + trig_offset.width >= drop_offset.width ) {

                        return left_space + trig_offset.width - drop_offset.width;

                    }

                }

                return Math.max ( 0, Math.min ( html_offset.width - drop_offset.width, trig_center_left - ( drop_offset.width / 2 ) ) );

            };

            var get_horizontal_top = function () {

                if ( no_tip ) {

                    if ( bottom_space + trig_offset.height >= drop_offset.height ) {

                        return trig_offset.top;

                    } else if ( top_space + trig_offset.height >= drop_offset.height ) {

                        return top_space + trig_offset.height - drop_offset.height;

                    }

                }

                return Math.max ( 0, Math.min ( html_offset.height - drop_offset.height, trig_center_top - ( drop_offset.height / 2 ) ) );

            };

            var get_direction_type = function ( direction ) {

                return ( direction === 'top' || direction === 'bottom' ) ? 'vertical' : 'horizontal';

            };

            // get first with acceptable area

            var direction; //FIXME

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

                var max_area = -1;

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

            // positionate the dropdown

            var direction_type = get_direction_type ( direction );

            var top = ( direction_type === 'horizontal' ) ? get_horizontal_top () : false;
            var left = ( direction_type === 'vertical' ) ? get_vertical_left () : false;

            switch ( direction ) {

                case 'bottom':
                    top = html_offset.height - bottom_space;
                    break;

                case 'top':
                    top = top_space - drop_offset.height;
                    break;

                case 'right':
                    left = html_offset.width - right_space;
                    break;

                case 'left':
                    left = left_space - drop_offset.width;
                    break;

            }

            this.$dropdown.css ({
                top: top,
                left: left
            });

            this.$dropdown.addClass ( direction );
            $trigger.addClass ( 'dropdown-' + direction );

            // positionate the tip

            if ( !no_tip ) {

                switch ( direction ) {

                    case 'bottom':
                        this.$top_tip.css ( 'left', trig_center_left - left );
                        break;

                    case 'top':
                        this.$bottom_tip.css ( 'left', trig_center_left - left );
                        break;

                    case 'right':
                        this.$left_tip.css ( 'top', trig_center_top - top );
                        break;

                    case 'left':
                        this.$right_tip.css ( 'top', trig_center_top - top );
                        break;

                }

            }

        },

        /* PUBLIC */

        toggle: function ( event, trigger ) {

            this[this.opened && assignments[this.id] === trigger ? 'close' : 'open']( event, trigger );

        },

        open: function ( event, trigger ) {

            if ( trigger ) {

                $(assignments[this.id]).removeClass ( 'dropdown-top dropdown-bottom dropdown-left dropdown-right active' );

                if ( this.opened && assignments[this.id] !== trigger ) {

                    this.$dropdown.addClass ( 'moving' );

                }

                assignments[this.id] = trigger;

                $(trigger).addClass ( 'active' );

            }

            this._positionate ();

            this.$dropdown.addClass ( 'active' );

            this.opened = true;

            this._delay ( this._bind_window_click ); //FIXME: Why without the delay it doesn't work?
            this._bind_window_resize_scroll ();

            this._trigger ( 'open' );

        },

        close: function () {

            $(assignments[this.id]).removeClass ( 'dropdown-top dropdown-bottom dropdown-left dropdown-right active' );

            this.$dropdown.removeClass ( 'active moving' );

            this.opened = false;

            this._unbind_window_click ();
            this._unbind_window_resize_scroll ();

            this._trigger ( 'close' );

        },

        update: function () {

            if ( this.opened ) {

                this._positionate ();

            }

        }

    });

    /* READY */

    $(function () {

        $('.dropdown').dropdown ();

    });

}( lQuery, window, document ));
