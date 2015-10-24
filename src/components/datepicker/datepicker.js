
/* =========================================================================
 * Svelto - Datepicker
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Deal with UTC time etc...
//TODO: Add support for min and max date delimiter
//FIXME: When using the arrows the prev day still remains hovered even if it's not below the cursor (chrome)
//TODO: Add support for setting first day of the week
//INFO: We use the format: YYYYMMDD

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'datepicker',
    options: {
      names: {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      },
      date: {
        today: false,
        current: false,
        selected: null
      },
      format: {
        type: 'YYYYMMDD',
        separator: '/'
      },
      classes: {
        today: 'datepicker-day-today',
        selected: 'datepicker-day-selected'
      },
      selectors: {
        navigation: {
          prev: '.datepicker-navigation-prev',
          title: '.datepicker-navigation-title',
          next: '.datepicker-navigation-next'
        },
        day: {
          prev: '.datepicker-day-prev',
          current: '.datepicker-day',
          next: '.datepicker-day-next'
        },
        input: 'input'
      },
      callbacks: {
        change () {},
        refresh () {}
      }
    }
  };

  /* DATEPICKER */

  class Datepicker extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.datepicker' ).datepicker ();
      $root.filter ( '.datepicker' ).datepicker ();

    }

    _variables () {

      this.$datepicker = this.$element;
      this.$input = this.$datepicker.find ( this.options.selectors.input );

      this.$navigationPrev = this.$datepicker.find ( this.options.selectors.navigation.prev );
      this.$navigationTitle = this.$datepicker.find ( this.options.selectors.navigation.title );
      this.$navigationNext = this.$datepicker.find ( this.options.selectors.navigation.next );

      this.$daysPrev = this.$datepicker.find ( this.options.selectors.day.prev );
      this.$daysCurrent = this.$datepicker.find ( this.options.selectors.day.current );
      this.$daysNext = this.$datepicker.find ( this.options.selectors.day.next );
      this.$daysAll = this.$daysPrev.add ( this.$daysCurrent ).add ( this.$daysNext );

      if ( !(this.options.date.today instanceof Date) ) {

        this.options.date.today = new Date ();

      }

      if ( !(this.options.date.current instanceof Date) ) {

        this.options.date.current = new Date ();

      }

      this.$dayToday = false;
      this.$daySelected = false;

    }

    _init () {

      this._refresh ();

    }

    _events () {

      /* CHANGE */

      this._on ( this.$input, 'change', this.__change );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* NAVIGATION PREV / NEXT */

      this._on ( this.$navigationPrev, Pointer.tap, this.__prevTap );
      this._on ( this.$navigationNext, Pointer.tap, this.__nextTap );

      /* DAY TAP */

      this._on ( Pointer.tap, this.options.selectors.day.current, this.__dayTap );

    }

    /* CHANGE */

    __change () {

      this.set ( this.$input.val () );

    }

    /* KEYDOWN */

    __keydown ( event ) {

      switch ( event.keyCode ) {

        case UI.keyCode.UP:
        case UI.keyCode.LEFT:
          this.prevMonth ();
          break;

        case UI.keyCode.RIGHT:
        case UI.keyCode.DOWN:
          this.nextMonth ();
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    }

    /* NAVIGATION */

    __prevTap () {

      this.prevMonth ();

    }

    __nextTap () {

      this.nextMonth ();

    }

    /* SELECTION */

    __dayTap ( event ) {

      if ( event.button && event.button !== UI.mouseButton.LEFT ) return;

      let day = parseInt ( $(event.currentTarget).html (), 10 );

      this._unhighlightSelected ();

      this.options.date.selected = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), day );

      this._highlightSelected ();

      this._updateInput ();

    }

    /* OTHERS */

    _buildCalendar () {

      let prevMonthDays = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 0 ).getDate (),
          currentMonthDays = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth () + 1, 0 ).getDate (),
          initialDayOfWeek = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 1 ).getDay ();

      initialDayOfWeek = ( initialDayOfWeek === 0 ) ? 6 : initialDayOfWeek - 1; //INFO: We use `Monday` as the 0 index

      this.$daysAll.removeClass ( 'hidden' );

      /* PREV */

      let exceedingDays = 31 - prevMonthDays,
          neededDays = initialDayOfWeek,
          leftDays = 9 - exceedingDays - neededDays;

      this.$daysPrev.slice ( leftDays + neededDays, this.$daysPrev.length ).addClass ( 'hidden' );
      this.$daysPrev.slice ( 0, leftDays ).addClass ( 'hidden' );

      /* CURRENT */

      this.$daysCurrent.slice ( currentMonthDays, this.$daysCurrent.lenght ).addClass ( 'hidden' );

      /* NEXT */

      leftDays = ( ( currentMonthDays + initialDayOfWeek ) % 7 );

      this.$daysNext.slice ( ( leftDays === 0 ) ? 0 : 7 - leftDays ).addClass ( 'hidden' );

    }

    _highlightDay ( day, cssClass ) {

      if ( day && day.getFullYear () === this.options.date.current.getFullYear () ) {

        let deltaMonths = day.getMonth () - this.options.date.current.getMonth ();

        switch ( deltaMonths ) {

          case -1:
            return this.$daysPrev.eq ( day.getDate () - 23 ).addClass ( cssClass );

          case 0:
            return this.$daysCurrent.eq ( day.getDate () - 1 ).addClass ( cssClass );

          case 1:
            return this.$daysNext.eq ( day.getDate () - 1 ).addClass ( cssClass );

        }

      }

      return false;

    }

    _unhighlightSelected () {

      if ( this.$daySelected ) {

        this.$daySelected.removeClass ( this.options.classes.selected );

      }

    }

    _highlightSelected () {

      this.$daySelected = this._highlightDay ( this.options.date.selected, this.options.classes.selected );

    }

    _unhighlightToday () {

      if ( this.$dayToday ) {

        this.$dayToday.removeClass ( this.options.classes.today );

      }

    }

    _highlightToday () {

      this.$dayToday = this._highlightDay ( this.options.date.today, this.options.classes.today );

    }

    _updateTitle () {

      this.$navigationTitle.html ( this.options.names.months[this.options.date.current.getMonth ()] + ' ' + this.options.date.current.getFullYear () );

    }

    _updateInput () {

      if ( this.options.date.selected ) {

        this.$input.val ( this._exportDate ( this.options.date.selected ) ).change ();

      }

    }

    _exportDate ( date )  {

      switch ( this.options.format.type ) {

        case 'YYYYMMDD':
          return [date.getFullYear (), parseInt ( date.getMonth (), 10 ) + 1, date.getDate ()].join ( this.options.format.separator );

        default:
          return date.toUTCString ();

      }

    }

    _importDate ( date )  {

      if ( _.isString ( date ) ) {

        switch ( this.options.format.type ) {

          case 'YYYYMMDD':
            let segments = date.split ( this.options.format.separator );
            return new Date ( segments[0], parseInt ( segments[1], 10 ) - 1, segments[2] );

          default:
            return new Date ( date );

        }

      } else {

        return new Date ( date );

      }

    }

    _refresh () {

      this._unhighlightSelected ();
      this._unhighlightToday ();
      this._buildCalendar ();
      this._highlightSelected ();
      this._highlightToday ();
      this._updateTitle ();

      this._trigger ( 'refresh', this.options.date );

    }

    /* API */

    get ( formatted ) {

      if ( formatted && this.options.date.selected ) {

        return this._exportDate ( this.options.date.selected );

      } else {

        return this.options.date.selected;

      }

    }

    set ( date ) {

      date = this._importDate ( date );

      if ( !_.isNaN ( date.valueOf () ) ) {

        if ( !this.options.date.selected || date.getTime () !== this.options.date.selected.getTime () ) {

          this.options.date.selected = date;

          if ( this.options.date.selected.getFullYear () === this.options.date.current.getFullYear () && this.options.date.selected.getMonth () === this.options.date.current.getMonth () ) {

            this._unhighlightSelected ();
            this._highlightSelected ();

          } else {

            this.options.date.current.setFullYear ( this.options.date.selected.getFullYear () );
            this.options.date.current.setMonth ( this.options.date.selected.getMonth () );

            this._refresh ();

          }

          this._updateInput ();

          this._trigger ( 'change', this.options.date );

        }

      }

    }

    navigateMonth ( modifier ) {

      if ( modifier ) {

        this.options.date.current.setMonth ( this.options.date.current.getMonth () + modifier );

        this._refresh ();

      }

    }

    prevMonth () {

      this.navigateMonth ( -1 );

    }

    nextMonth () {

      this.navigateMonth ( 1 );

    }

  }

  /* BINDING */

  Svelto.Datepicker = Datepicker;
  Svelto.Datepicker.config = config;

  /* FACTORY */

  $.factory ( Svelto.Datepicker );

}( jQuery, _, window, document ));
