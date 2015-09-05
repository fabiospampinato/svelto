
/* =========================================================================
 * Svelto - Datepicker v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

//TODO: deal with UTC time etc...
//TODO: Add support for min and max date delimiter
//TODO: Add an input inside, so that it works also without an external input
//FIXME: When using the arrows the prev day still remains hovered even if it's not below the cursor

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* DATEPICKER */

  $.widget ( 'presto.datepicker', {

    /* OPTIONS */

    options: {
      names: {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      },
      date: {
        today: false,
        current: false,
        selected: null
      },
      callbacks: {
        change: _.noop,
        refresh: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$datepicker = this.$element;

      this.id = this.$datepicker.attr ( 'id' );
      this.$inputs = this.id ? $('input[name="' + this.id + '"]') : $empty;

      this.$navigation_prev = this.$datepicker.find ( '.datepicker-navigation-prev' );
      this.$navigation_title = this.$datepicker.find ( '.datepicker-navigation-title' );
      this.$navigation_next = this.$datepicker.find ( '.datepicker-navigation-next' );

      this.$days_prev = this.$datepicker.find ( '.datepicker-day-prev' );
      this.$days_current = this.$datepicker.find ( '.datepicker-day' );
      this.$days_next = this.$datepicker.find ( '.datepicker-day-next' );
      this.$days_all = this.$days_prev.add ( this.$days_current ).add ( this.$days_next );

      if ( this.options.date.today === false ) {

        this.options.date.today = new Date ();

      }

      if ( this.options.date.current === false ) {

        this.options.date.current = new Date ();

      }

      this.$day_today = false;
      this.$day_selected = false;

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

      this._on ( 'click', '.datepicker-day', this._handler_day_current_click );

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
          this.navigate_month ( -1 );
          break;

        case $.ui.keyCode.RIGHT:
        case $.ui.keyCode.DOWN:
          this.navigate_month ( 1 );
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

      this.navigate_month ( -1 )

    },

    _handler_next_click: function () {

      this.navigate_month ( 1 );

    },

    /* SELECTION */

    _handler_day_current_click: function ( event, node ) {

      this._unhighlight_selected ();

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

      initial_day_of_week = ( initial_day_of_week === 0 ) ? 6 : initial_day_of_week - 1; //INFO: We use `Monday` as the 0 index

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

      this.$days_next.slice ( ( left_days === 0 ) ? 0 : 7 - left_days ).addClass ( 'hidden' );

    },

    _highlight_day: function ( day, css_class ) {

      if ( day && day.getFullYear () === this.options.date.current.getFullYear () ) {

        var delta_months = day.getMonth () - this.options.date.current.getMonth ();

        switch ( delta_months ) {

          case -1:
            return this.$days_prev.eq ( day.getDate () - 23 ).addClass ( css_class );

          case 0:
            return this.$days_current.eq ( day.getDate () - 1 ).addClass ( css_class );

          case 1:
            return this.$days_next.eq ( day.getDate () - 1 ).addClass ( css_class );

        }

      }

      return false;

    },

    _unhighlight_selected: function () {

      if ( this.$day_selected ) {

        this.$day_selected.removeClass ( 'datepicker-day-selected' );

      }

    },

    _highlight_selected: function () {

      this.$day_selected = this._highlight_day ( this.options.date.selected, 'datepicker-day-selected' );

    },

    _unhighlight_today: function () {

      if ( this.$day_today ) {

        this.$day_today.removeClass ( 'datepicker-day-today' );

      }

    },

    _highlight_today: function () {

      this.$day_today = this._highlight_day ( this.options.date.today, 'datepicker-day-today' );

    },

    _update_title: function () {

      this.$navigation_title.html ( this.options.names.months[this.options.date.current.getMonth ()] + ', ' + this.options.date.current.getFullYear () );

    },

    _update_input: function () {

      if ( this.options.date.selected ) {

        this.$inputs.val ( this.options.date.selected.getFullYear () + '-' + this.options.date.selected.getMonth () + '-' + this.options.date.selected.getDate () ).change ();

      }

    },

    _refresh: function () {

      this._unhighlight_selected ();
      this._unhighlight_today ();
      this._build_calendar ();
      this._highlight_selected ();
      this._highlight_today ();
      this._update_title ();

      this._trigger ( 'refresh' );

    },

    /* API */

    get: function ( formatted ) {

      if ( formatted && this.options.date.selected ) {

        return this.options.date.selected.getFullYear () + '-' + this.options.date.selected.getMonth () + '-' + this.options.date.selected.getDate ();

      } else {

        return this.options.date.selected;

      }

    },

    set: function ( date ) {

      if ( _.isString ( date ) ) {

        var segments = date.split ( '-' ),
          date = new Date ( segments[0], segments[1], segments[2] );

      } else {

        var date = new Date ( date );

      }

      if ( !_.isNaN ( date.valueOf () ) ) {

        this.options.date.selected = date;

        if ( this.options.date.selected.getFullYear () === this.options.date.current.getFullYear () && this.options.date.selected.getMonth () === this.options.date.current.getMonth () ) {

          this._unhighlight_selected ();
          this._highlight_selected ();

        } else {

          this.options.date.current.setFullYear ( this.options.date.selected.getFullYear () );
          this.options.date.current.setMonth ( this.options.date.selected.getMonth () );

          this._refresh ();

        }

        this._update_input ();

      }

    },

    navigate_month: function ( steps ) {

      if ( steps ) {

        this.options.date.current.setMonth ( this.options.date.current.getMonth () + steps );

        this._refresh ();

      }

    },

    prev_month: function () {

      this.navigate_month ( -1 );

    },

    next_month: function () {

      this.navigate_month ( 1 );

    }

  });

  /* READY */

  $(function () {

    $('.datepicker').datepicker ();

  });

}( jQuery, _, window, document ));
