
/* =========================================================================
 * Svelto - Carousel
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add drag support instead of flick

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CAROUSEL */

  $.factory ( 'svelto.carousel', {

    /* OPTIONS */

    options: {
      startingIndex: 0,
      cycle: false,
      interval: 5000,
      intervalMinimumRemaining: 1000,
      classes: {
        prev: 'prev',
        current: 'current'
      },
      selectors: {
        prev: '.carousel-prev',
        next: '.carousel-next',
        indicator: '.carousel-indicator',
        itemsWrp: '.carousel-items',
        item: ' > *'
      },
      animations: {
        cycle: $.ui.animation.normal
      },
      callbacks: {
        change: _.noop
      }
    },

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.carousel' ).carousel ();

    },

    _variables () {

      this.$carousel = this.$element;
      this.$prev = this.$carousel.find ( this.options.selectors.prev );
      this.$next = this.$carousel.find ( this.options.selectors.next );
      this.$indicators = this.$carousel.find ( this.options.selectors.indicator );
      this.$itemsWrp = this.$carousel.find ( this.options.selectors.itemsWrp );
      this.$items = this.$itemsWrp.find ( this.options.selectors.item );

      this.maxIndex = this.$items.length - 1;

      this._previous = false;
      this._current = false;

      if ( this.options.cycle ) {

        this.timer = $.timer ( this.next.bind ( this ), this.options.interval, true );

      }

    },

    _init () {

      var $current = this.$items.filter ( '.' + this.options.classes.current ).first ();

      console.log($current.toArray());

      if ( $current.length > 0 ) {

        this._current = this._getItemObj ( this.$items.index ( $current ) );

      } else {

        this.set ( this.options.startingIndex );

      }

    },

    _events () {

      /* PREV */

      this._on ( this.$prev, Pointer.tap, this.previous );

      /* NEXT */

      this._on ( this.$next, Pointer.tap, this.next );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* INDICATOR TAP */

      this._on ( this.$indicators, Pointer.tap, this.__indicatorTap );

      /* FLICK */

      this._on ( Pointer.flick, this.__flick );

      /* CYCLE */

      if ( this.options.cycle ) {

        this._on ( this.$itemsWrp, Pointer.enter, this.__cycleEnter );
        this._on ( this.$itemsWrp, Pointer.leave, this.__cycleLeave );

      }

    },

    /* KEYDOWN */

    __keydown ( event ) {

      switch ( event.keyCode ) {

        case $.ui.keyCode.LEFT:
        case $.ui.keyCode.UP:
          this.previous ();
          break;

        case $.ui.keyCode.RIGHT:
        case $.ui.keyCode.DOWN:
        case $.ui.keyCode.SPACE:
          this.next ();
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    },

    /* CYCLE */

    __cycleEnter () {

      this.timer.pause ();

    },

    __cycleLeave () {

      this.timer.remaining ( Math.max ( this.options.intervalMinimumRemaining, this.timer.remaining () || 0 ) );

      this.timer.play ();

    },

    /* INDICATOR TAP */

    __indicatorTap ( event, indicator ) {

      this.set ( this.$indicators.index ( indicator ) );

    },

    /* FLICK */

    __flick ( event, data ) {

      if ( data.orientation === 'horizontal' ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        this[data.direction === -1 ? 'next' : 'previous']();

      }

    },

    /* ITEM OBJ */

    _getItemObj ( index ) {

      return {
        index: index,
        $item: this.$items.eq ( index ),
        $indicator: this.$indicators.eq ( index )
      };

    },

    /* INDEX */

    _getPrevIndex ( index ) {

      return ( index > 0 ) ? index - 1 : this.maxIndex;

    },

    _getNextIndex ( index ) {

      return ( index < this.maxIndex ) ? index + 1 : 0;

    },

    /* API */

    get () {

      return this._current.index;

    },

    set ( index ) {

      index = Number ( index );

      if ( !this._setting && !_.isNaN ( index ) && index >= 0 && index <= this.maxIndex && ( !this._current || index !== this._current.index ) ) {

        this._setting = true;

        if ( this._current ) {

          this._current.$item.removeClass ( this.options.classes.current ).addClass ( this.options.classes.prev );
          this._current.$indicator.removeClass ( this.options.classes.current );

          this._previous = this._current;

        }

        this._current = this._getItemObj ( index );
        this._current.$item.addClass ( this.options.classes.current );
        this._current.$indicator.addClass ( this.options.classes.current );

        if ( this.options.timer ) {

          this.timer.stop ();

        }

        this._delay ( function () {

          this._setting = false;

          if ( this._previous ) {

            this._previous.$item.removeClass ( this.options.classes.prev );

          }

          if ( this.options.timer ) {

            this.timer.play ();

          }

        }, this.options.animations.cycle );

        this._trigger ( 'change' );

      }

    },

    previous () {

      this.set ( this._getPrevIndex ( this._current.index ) );

    },

    next () {

      this.set ( this._getNextIndex ( this._current.index ) );

    }

  });

}( jQuery, _, window, document ));
