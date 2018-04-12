
// @require core/widget/widget.js

// When using using an incomplete-information format (those where not all the info are exported, like YYYYMMDD) the behaviour when used in combination with, for instance, `formSync` would be broken: at GTM+5 it may be the day 10, but at UTC may actually be day 9, and when syncing we won't get the right date synced between both datepickers
// Accordion to ISO-8601 the first day of the week is Monday

//FIXME: When using the arrows the prev day still remains hovered even if it's not below the cursor (chrome) //TODO: Make a SO question, maybe we can workaround it
//FIXME: `today` button doesn't work when the same month is active but the wrong day is selected

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  /* CONFIG */

  let config = {
    name: 'datepicker',
    plugin: true,
    selector: '.datepicker',
    options: {
      exporters: {
        YYYYMMDD ( date, data ) {
          return [date.getUTCFullYear ().toString ().padStart ( 4, '0' ), ( parseInt ( date.getUTCMonth (), 10 ) + 1 ).toString ().padStart ( 2, '0' ), date.getUTCDate ().toString ().padStart ( 2, '0' )].join ( data.separator );
        },
        UNIXTIMESTAMP ( date ) {
          return Math.floor ( date.getTime () / 1000 );
        },
        ISO ( date ) {
          return date.toISOString ();
        },
        UTC ( date ) {
          return date.toUTCString ();
        }
      },
      importers: {
        YYYYMMDD ( date, data ) {
          let segments = date.split ( data.separator );
          return new Date ( Date.UTC ( parseInt ( segments[0], 10 ), parseInt ( segments[1], 10 ) - 1, parseInt ( segments[2], 10 ) ) );
        },
        UNIXTIMESTAMP ( date ) {
          return new Date ( ( _.isString ( date ) && date.length ) ? date * 1000 : NaN );
        },
        ISO ( date ) {
          return new Date ( date );
        },
        UTC ( date ) {
          return new Date ( date );
        }
      },
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      firstDayOfWeek: 0, // Corresponding to the index in this array: `['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']`, setted to 0 since that to ISO-8601 the first day of the week is Monday
      date: {
        min: false, // Minimum selectable date
        max: false, // Maximum selectable date
        today: false, // Today date
        current: false, // Current date visible in the datepicker (basically the month we are viewing)
        selected: false // The selcted date
      },
      format: {
        type: 'UNIXTIMESTAMP', // One of the formats implemented in the exporters
        data: { // Passed to the called importer and exporter
          separator: '/'
        }
      },
      classes: {
        today: 'datepicker-day-today',
        selected: 'datepicker-day-selected',
        clamped: 'datepicker-day-clamped'
      },
      selectors: {
        navigation: {
          previous: '.datepicker-navigation .previous',
          next: '.datepicker-navigation .next',
          today: '.datepicker-navigation .today'
        },
        day: {
          previous: '.datepicker-days .previous',
          current: '.datepicker-days *:not(.previous):not(.next)',
          next: '.datepicker-days .next',
          today: '.datepicker-day-today',
          selected: '.datepicker-day-selected',
          clamped: '.datepicker-day-clamped'
        },
        title: '.datepicker-title',
        input: 'input'
      },
      keystrokes: {
        'up, left': 'previousMonth',
        'right, down': 'nextMonth'
      },
      callbacks: {
        change: _.noop,
        render: _.noop
      }
    }
  };

  /* DATEPICKER */

  class Datepicker extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$datepicker = this.$element;
      this.$input = this.$datepicker.find ( this.options.selectors.input );

      this.$navigationPrev = this.$datepicker.find ( this.options.selectors.navigation.previous );
      this.$navigationNext = this.$datepicker.find ( this.options.selectors.navigation.next );
      this.$navigationToday = this.$datepicker.find ( this.options.selectors.navigation.today );
      this.$navigationTitle = this.$datepicker.find ( this.options.selectors.title );

      this.$daysPrev = this.$datepicker.find ( this.options.selectors.day.previous );
      this.$daysCurrent = this.$datepicker.find ( this.options.selectors.day.current );
      this.$daysNext = this.$datepicker.find ( this.options.selectors.day.next );
      this.$daysAll = this.$daysPrev.add ( this.$daysCurrent ).add ( this.$daysNext );

      this.$daySelected = this.$daysAll.filter ( this.options.selectors.day.selected );
      this.$dayToday = this.$daysAll.filter ( this.options.selectors.day.today );

    }

    _init () {

      /* RESETTING HIGHLIGHT */

      this._unhighlightSelected ();
      this._unhighlightToday ();

      /* TODAY */

      if ( !(this.options.date.today instanceof Date) ) {

        this.options.date.today = new Date ();

      }

      /* INITIAL VALUE */

      this.set ( this.$input.val () );

      /* CURRENT */

      this.options.date.current = this._clampDate ( this.options.date.current || this.options.date.selected || this.options.date.today );

      /* REFRESH */

      this._refresh ();

    }

    _events () {

      this.___change ();
      this.___keydown ();
      this.___navigation ();
      this.___dayTap ();

    }

    /* PRIVATE */

    _cloneDate ( date ) {

      return new Date ( date.getTime () );

    }

    _clampDate ( date ) {

      return new Date ( _.clamp ( date.getTime (), this.options.date.min ? this.options.date.min.getTime () : undefined, this.options.date.max ? this.options.date.max.getTime () : undefined ) );

    }

    /* CHANGE */

    ___change () {

      this._on ( true, this.$input, 'change', this.__change );

    }

    __change ( event, data ) {

      if ( data && data._datepickerId === this.guid ) return;

      this.set ( this.$input.val () );

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [$.$document, 'keydown', this.__keydown] );

    }

    /* NAVIGATION */

    ___navigation () {

      this._on ( this.$navigationPrev, Pointer.tap, event => this.__navigation ( 'previousMonth', event ) );
      this._on ( this.$navigationNext, Pointer.tap, event => this.__navigation ( 'nextMonth', event ) );
      this._on ( this.$navigationToday, Pointer.tap, event => this.__navigation ( 'navigateToToday', event ) );

    }

    __navigation ( method, event ) {

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this[method]();

    }

    /* DAY TAP */

    ___dayTap () {

      this._on ( Pointer.tap, this.options.selectors.day.current, this.__dayTap );

    }

    __dayTap ( event ) {

      let $day = $(event.target).closest ( this.$daysCurrent );

      if ( $day.is ( this.options.selectors.day.selected ) || $day.is ( this.options.selectors.day.clamped ) ) return;

      let day = parseInt ( $day.text (), 10 ),
          date = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), day, 12 );

      this.set ( date );

    }

    /* BUILD */

    _buildCalendar () {

      /* NUMBERS */

      let prevMonthDays = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 0 ).getDate (),
          currentMonthDays = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth () + 1, 0 ).getDate (),
          initialDayOfWeek = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 1 ).getDay ();

      initialDayOfWeek = ( initialDayOfWeek === 0 ) ? 6 : initialDayOfWeek - 1; // Normalizing to 0 -> Monday
      initialDayOfWeek -= ( this.options.firstDayOfWeek % 7 ); // Offsetting according to the provided setting
      initialDayOfWeek = ( initialDayOfWeek < 0 ) ? 7 + initialDayOfWeek : initialDayOfWeek; // Moving to the other side in case of negative offsetting

      /* PREV */

      let exceedingDays = 31 - prevMonthDays,
          neededDays = initialDayOfWeek,
          leftDays = 9 - exceedingDays - neededDays;

      this.$daysPrev.slice ( 0, leftDays ).addClass ( this.options.classes.hidden );
      this.$daysPrev.slice ( leftDays, leftDays + neededDays ).removeClass ( this.options.classes.hidden );
      this.$daysPrev.slice ( leftDays + neededDays ).addClass ( this.options.classes.hidden );

      /* CURRENT */

      this.$daysCurrent.slice ( 28, currentMonthDays ).removeClass ( this.options.classes.hidden );
      this.$daysCurrent.slice ( currentMonthDays ).addClass ( this.options.classes.hidden );

      /* CURRENT CLAMPED */

      this.$daysCurrent.removeClass ( this.options.classes.clamped );

      if ( this.options.date.min && this.options.date.current.getFullYear () === this.options.date.min.getFullYear () && this.options.date.current.getMonth () === this.options.date.min.getMonth () ) {

        this.$daysCurrent.slice ( 0, this.options.date.min.getDate () - 1 ).addClass ( this.options.classes.clamped );

      }

      if ( this.options.date.max && this.options.date.current.getFullYear () === this.options.date.max.getFullYear () && this.options.date.current.getMonth () === this.options.date.max.getMonth () ) {

        this.$daysCurrent.slice ( this.options.date.max.getDate () ).addClass ( this.options.classes.clamped );

      }

      /* NEXT */

      neededDays = ( ( currentMonthDays + initialDayOfWeek ) % 7 );
      neededDays = ( neededDays === 0 ) ? 0 : 7 - neededDays;

      this.$daysNext.slice ( 0, neededDays ).removeClass ( this.options.classes.hidden );
      this.$daysNext.slice ( neededDays ).addClass ( this.options.classes.hidden );

    }

    /* HIGHLIGHT */

    _highlightDay ( day, cssClass ) {

      if ( day instanceof Date ) {

        let deltaMonths = ( day.getFullYear () * 12 + day.getMonth () ) - ( this.options.date.current.getFullYear () * 12 + this.options.date.current.getMonth () );

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

      if ( !this.$daySelected.length ) return;

      this.$daySelected.removeClass ( this.options.classes.selected );

    }

    _highlightSelected () {

      if ( this.options.date.selected ) {

        this.$daySelected = this._highlightDay ( this.options.date.selected, this.options.classes.selected );

      }

    }

    _unhighlightToday () {

      if ( !this.$dayToday.length ) return;

      this.$dayToday.removeClass ( this.options.classes.today );

    }

    _highlightToday () {

      if ( this.options.date.today ) {

        this.$dayToday = this._highlightDay ( this.options.date.today, this.options.classes.today );

      }

    }

    /* UPDATE */

    _updateNavigation () {

      /* PREVIOUS */

      if ( this.options.date.min && this.$navigationPrev.length ) {

        let lastDayPrevMonth = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth (), 0 );

        this.$navigationPrev.toggleClass ( this.options.classes.disabled, lastDayPrevMonth.getTime () < this.options.date.min.getTime () );

      }

      /* NEXT */

      if ( this.options.date.max && this.$navigationNext.length ) {

        let firstDayNextMonth = new Date ( this.options.date.current.getFullYear (), this.options.date.current.getMonth () + 1, 1 );

        this.$navigationNext.toggleClass ( this.options.classes.disabled, firstDayNextMonth.getTime () > this.options.date.max.getTime () );

      }

      /* TODAY */

      if ( this.$navigationToday.length ) {

        this.$navigationToday.toggleClass ( this.options.classes.disabled, this.options.date.current.getFullYear () === this.options.date.today.getFullYear () && this.options.date.current.getMonth () === this.options.date.today.getMonth () );

      }

    }

    _updateTitle () {

      this.$navigationTitle.text ( this.options.months[this.options.date.current.getMonth ()] + ' ' + this.options.date.current.getFullYear () );

    }

    _updateInput () {

      if ( this.options.date.selected ) {

        this.$input.val ( this._export ( this.options.date.selected ) ).trigger ( 'change', { _datepickerId: this.guid } );

      }

    }

    /* EXPORT */

    _export ( date )  {

      return this.options.exporters[this.options.format.type] ( date, this.options.format.data );

    }

    /* REQUIRE */

    _import ( date )  {

      return this.options.importers[this.options.format.type] ( date, this.options.format.data );

    }

    _refresh () {

      this._unhighlightSelected ();
      this._unhighlightToday ();

      this._buildCalendar ();

      this._updateNavigation ();

      this._highlightSelected ();
      this._highlightToday ();

      this._updateTitle ();

      this._trigger ( 'render' );

    }

    /* API */

    get ( formatted ) {

      return this.options.date.selected ? ( formatted ? this._export ( this.options.date.selected ) : this._cloneDate ( this.options.date.selected ) ) : false;

    }

    set ( date ) {

      date = ( date instanceof Date ) ? date : this._import ( date );

      if ( _.isNaN ( date.valueOf () ) ) return;

      date = this._clampDate ( date );

      if ( this.options.date.selected && date.getTime () === this.options.date.selected.getTime () ) return;

      if ( this.options.date.selected ) {

        this._unhighlightSelected ();

      }

      this.options.date.selected = date;

      if ( this.options.date.current ) {

        if ( this.options.date.selected.getFullYear () === this.options.date.current.getFullYear () && this.options.date.selected.getMonth () === this.options.date.current.getMonth () ) {

          this._highlightSelected ();

        } else {

          this.options.date.current = this._cloneDate ( this.options.date.selected );

          this._refresh ();

        }

      }

      this._updateInput ();

      this._trigger ( 'change' );

    }

    navigateToToday () {

      if ( this.options.date.current.getFullYear () !== this.options.date.today.getFullYear () || this.options.date.current.getMonth () !== this.options.date.today.getMonth () ) {

        this.options.date.current = this._clampDate ( this.options.date.today );

        this._refresh ();

      }

    }

    navigateMonth ( modifier ) {

      if ( _.isNaN ( modifier ) ) return;

      this.options.date.current.setMonth ( this.options.date.current.getMonth () + modifier );

      this.options.date.current = this._clampDate ( this.options.date.current );

      this._refresh ();

    }

    previousMonth () {

      this.navigateMonth ( -1 );

    }

    nextMonth () {

      this.navigateMonth ( 1 );

    }

  }

  /* FACTORY */

  Factory.make ( Datepicker, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
