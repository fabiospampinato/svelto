
/* DRAGGABLE */

//TODO: add also a constrainer in pixels

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* DRAGGABLE */

    $.widget ( 'presto.draggable', {

        /* OPTIONS */

        options: {
            selectors: {
                handler: '.draggable-handler'
            },
            only_handlers: false, //INFO: only an handler can drag it around
            revertable: false, //INFO: on dragend take it back to the starting position
            axis: false, //INFO: limit the movements to this axis
            $constrainer: false, //INFO: if we want to keep the draggable inside this container
            constrainer_axis: false, //INFO: if we want to constrain the draggable only in a specific axis
            updaters: { //TODO: rename this ugly name, it should something like updatable_checker
                x: _.true, //TODO: add support for setting a custom value from this function
                y: _.true //TODO: add support for setting a custom value from this function
            },
            callbacks: {
                beforestart: $.noop,
                start: $.noop,
                move: $.noop,
                end: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.draggable = this.element;
            this.$draggable = this.$element;
            this.$handlers = this.$draggable.find ( this.options.selectors.handler );

        },

        _events: function () {

            if ( !this.options.only_handlers ) {

                this._on ( $.Pointer.dragstart, this._start );
                this._on ( $.Pointer.dragmove, this._move );
                this._on ( $.Pointer.dragend, this._end );

            }

            this._on ( this.$handlers, $.Pointer.dragstart, this._start );
            this._on ( this.$handlers, $.Pointer.dragmove, this._move );
            this._on ( this.$handlers, $.Pointer.dragend, this._end );

        },

        /* PRIVATE */

        _start: function ( event, data ) {

            this._trigger ( 'beforestart' );

            this.motion = false;

            var transform_str = this.$draggable.css ( 'transform' ),
                matrix =  ( transform_str !== 'none' ) ? transform_str.match ( /[0-9., -]+/ )[0].split ( ', ' ) : [0, 0, 0, 0, 0, 0];

            this.extraXY = {
                X: parseInt ( matrix[4], 10 ),
                Y: parseInt ( matrix[5], 10 )
            };

            this._trigger ( 'start', _.extend ( data, { draggable: this.draggable, $draggable: this.$draggable } ) );

        },

        _move: function ( event, data ) {

            if ( this.motion === false ) {

                this.motion = true;

                if ( this.options.$constrainer ) {

                    var constrainer_offset = this.options.$constrainer.offset (),
                        draggable_offset = this.$draggable.offset ();

                    this.translateX_min = constrainer_offset.left - ( draggable_offset.left - this.extraXY.X );
                    this.translateX_max = constrainer_offset.left + this.options.$constrainer.width () - ( ( draggable_offset.left - this.extraXY.X ) + this.$draggable.width () );

                    this.translateY_min = constrainer_offset.top - ( draggable_offset.top - this.extraXY.Y );
                    this.translateY_max = constrainer_offset.top + this.options.$constrainer.height () - ( ( draggable_offset.top - this.extraXY.Y ) + this.$draggable.height () );

                }

                $html.addClass ( 'dragging' );
                this.$draggable.addClass ( 'dragging' );

            }

            var translateX = this.extraXY.X + ( ( this.options.axis !== 'y' ) ? data.deltaXY.X : 0 ),
                translateY = this.extraXY.Y + ( ( this.options.axis !== 'x' ) ? data.deltaXY.Y : 0 );

            if ( this.options.$constrainer ) {

                if ( this.options.constrainer_axis !== 'y' ) {

                    translateX = _.clamp ( this.translateX_min, translateX, this.translateX_max );

                }

                if ( this.options.constrainer_axis !== 'x' ) {

                    translateY = _.clamp ( this.translateY_min, translateY, this.translateY_max );

                }

            }

            var updatable_x = this.options.updaters.x ( translateX ),
                updatable_y = this.options.updaters.y ( translateY );

            this.$draggable.css ( 'transform', 'translate3d(' + ( _.isBoolean ( updatable_x ) ? ( updatable_x ? translateX : this.extraXY.X ) : updatable_x ) + 'px,' + ( _.isBoolean ( updatable_y ) ? ( updatable_y ? translateY : this.extraXY.Y ) : updatable_y ) + 'px,0)' );

            this._trigger ( 'move', _.extend ( data, { draggable: this.draggable, $draggable: this.$draggable } ) );

        },

        _end: function ( event, data ) {

            if ( this.motion === true ) {

                $html.removeClass ( 'dragging' );
                this.$draggable.removeClass ( 'dragging' );

                if ( this.options.revertable ) {

                    this.$draggable.css ( 'transform', 'translate3d(0,0,0)' ); //TODO: animate it

                }

            }

            this._trigger ( 'end', _.extend ( data, { draggable: this.draggable, $draggable: this.$draggable, dragged: this.motion } ) );

        }

    });

    /* READY */

    $(function () {

        $('.draggable').draggable ();

    });

}( jQuery, _, window, document ));
