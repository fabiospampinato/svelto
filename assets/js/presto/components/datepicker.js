
/* DATEPICKER */

//TODO: Add support for min and max date delimiter
//TODO: Set it from input

;(function ( $, window, document, undefined ) {

    'use strict';

    /* DATEPICKER */

    $.widget ( 'presto.datepicker', {

        /* OPTIONS */

        options: {
            names: {
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            },
            date: {
                today: false,
                current: false,
                selected: null
            },
            callbacks: {
                change: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$datepicker = this.$element;

            this.id = this.$datepicker.attr ( 'id' );
            this.$inputs = this.id ? $('input[name="' + this.id + '"]') : $();

            this.$navigation_wrp = this.$datepicker.find ( '.datepicker-navigation' );
            this.$navigation_prev = this.$datepicker.find ( '.datepicker-navigation-prev' );
            this.$navigation_title = this.$datepicker.find ( '.datepicker-navigation-title' );
            this.$navigation_next = this.$datepicker.find ( '.datepicker-navigation-next' );

            this.$days_wrp = this.$datepicker.find ( '.datepicker-days' );
            this.$days_prev = this.$days_wrp.find ( '.datepicker-day-prev' );
            this.$days_current = this.$days_wrp.find ( '.datepicker-day' );
            this.$days_next = this.$days_wrp.find ( '.datepicker-day-next' );
            this.$days_all = this.$days_prev.add ( this.$days_current ).add ( this.$days_next );

            if ( this.options.date.today === false ) {

                this.options.date.today = new Date ();

            }

            if ( this.options.date.current === false ) {

                this.options.date.current = new Date ();

            }

        },

        _init: function () {

            this._refresh ();

        },

        _events: function () {

            /* DATEPICKER */

            this._on ( 'mouseenter', this._handler_arrows_in );
            this._on ( 'mouseleave', this._handler_arrows_out );

            /* INPUTS */

            this._on ( this.$inputs, 'keydown', this._handler_input_keydown );

            /* NAVIGATION */

            this._on ( this.$navigation_prev, 'click', this._handler_prev_click );
            this._on ( this.$navigation_next, 'click', this._handler_next_click );

            /* SELECTION */

            this._on ( this.$days_current, 'click', this._handler_day_current_click );

        },

        /* DATEPIKER */

        _handler_arrows_in: function () {

            this._on ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_out: function () {

            this._off ( $document, 'keydown', this._handler_arrows_keydown );

        },

        _handler_arrows_keydown: function ( event ) {

            switch ( event.keyCode ) {

                case $.ui.keyCode.UP:
                case $.ui.keyCode.LEFT:
                    this._navigate_month ( -1 );
                    break;

                case $.ui.keyCode.RIGHT:
                case $.ui.keyCode.DOWN:
                    this._navigate_month ( 1 );
                    break;

            }

        },

        /* INPUT */

        _handler_input_keydown: function ( event ) {

            if ( event.keyCode === $.ui.keyCode.ENTER ) {

                this.set ( this.$inputs.val () );

            }

        },

        /* NAVIGATION */

        _handler_prev_click: function () {

            this._navigate_month ( -1 )

        },

        _handler_next_click: function () {

            this._navigate_month ( 1 );

        },

        /* SELECTION */

        _handler_day_current_click: function ( event, node ) {

            var day = parseInt ( $(node).html (), 10 );

            this.options.date.selected = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), day );

            this._highlight_selected ();

            this._update_input ();

        },

        /* OTHERS */

        _build_calendar: function () {

            var prev_month_days = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 0 ).getDate (),
                current_month_days = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth () + 1, 0 ).getDate (),
                initial_day_of_week = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 1 ).getDay ();

            initial_day_of_week = ( initial_day_of_week === 0 ) ? 6 : initial_day_of_week - 1;

            this.$days_all.removeClass ( 'hidden' );

            // PREV

            var exceeding_days = 31 - prev_month_days,
                needed_days = initial_day_of_week,
                left_days = 9 - exceeding_days - needed_days;

            this.$days_prev.slice ( left_days + needed_days, this.$days_prev.length ).addClass ( 'hidden' );
            this.$days_prev.slice ( 0, left_days ).addClass ( 'hidden' );

            // CURRENT

            this.$days_current.slice ( current_month_days, this.$days_current.lenght ).addClass ( 'hidden' );

            // NEXT

            var left_days = ( ( current_month_days + initial_day_of_week ) % 7 );

            this.$days_next.slice ( left_days === 0 ? 0 : 7 - left_days ).addClass ( 'hidden' );

        },

        _highlight_day: function ( day, css_class ) {

            this.$days_all.removeClass ( css_class );

            if ( day && day.getFullYear () === this.options.date.current.getFullYear () ) {

                var delta_months = day.getMonth () - this.options.date.current.getMonth ();

                switch ( delta_months ) {

                    case -1:
                        this.$days_prev.eq ( day.getDate () - 23 ).addClass ( css_class );
                        break;

                    case 0:
                        this.$days_current.eq ( day.getDate () - 1 ).addClass ( css_class );
                        break;

                    case 1:
                        this.$days_next.eq ( day.getDate () - 1 ).addClass ( css_class );
                        break;

                }

            }

        },

        _highlight_selected: function () {

            this._highlight_day ( this.options.date.selected, 'datepicker-day-selected' );

        },

        _highlight_today: function () {

            this._highlight_day ( this.options.date.today, 'datepicker-day-today' );

        },

        _update_title: function () {

            this.$navigation_title.html ( this.options.names.months[this.options.date.current.getMonth ()] + ', ' + this.options.date.current.getFullYear () );

        },

        _update_input: function () {

            if ( this.options.date.selected ) {

                this.$inputs.val ( this.options.date.selected.getFullYear () + '-' + this.options.date.selected.getMonth () + '-' + this.options.date.selected.getDate () ).change ();

            }

        },

        _navigate_month: function ( steps ) {

            this.options.date.current.setMonth ( this.options.date.current.getMonth () + steps );

            this._refresh ();

        },

        _refresh: function () {

            this._build_calendar ();
            this._highlight_selected ();
            this._highlight_today ();
            this._update_title ();

        },

        /* API */

        get: function () {

            return this.options.date.selected;

        },

        set: function ( date ) {

            if ( _.isString ( date ) ) {

                var segments = date.split ( '-' ),
                    date = new Date ( segments[0], segments[1], segments[2] );

            } else {

                var date = new Date ( date );

            }

            if ( !_.isNaN ( date ) ) {

                this.options.date.selected = date;

                this._highlight_selected ();

                this._update_input ();

            }

        }

    });

    /* READY */

    $(function () {

        $('.datepicker').datepicker ();

    });

}( lQuery, window, document ));
