
/* =========================================================================
 * Svelto - Carousel
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Add drag support instead of flick
//TODO: API for setting interval

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'carousel',
    selector: '.carousel',
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
        cycle: Svelto.animation.normal
      },
      callbacks: {
        change () {}
      }
    },
  };

  /* CAROUSEL */

  class Carousel extends Svelto.Widget {

    /* SPECIAL */

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

      this.timer = new Timer ( this.next.bind ( this ), this.options.interval, false );

    }

    _init () {

      let $current = this.$items.filter ( '.' + this.options.classes.current ).first ();

      if ( $current.length > 0 ) {

        this._current = this._getItemObj ( this.$items.index ( $current ) );

      } else {

        this.set ( this.options.startingIndex );

      }

    }

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

      this._on ( this.$itemsWrp, Pointer.enter, this.__cycleEnter );
      this._on ( this.$itemsWrp, Pointer.leave, this.__cycleLeave );

    }

    /* KEYDOWN */

    __keydown ( event ) {

      switch ( event.keyCode ) {

        case Svelto.keyCode.LEFT:
        case Svelto.keyCode.UP:
          this.previous ();
          break;

        case Svelto.keyCode.RIGHT:
        case Svelto.keyCode.DOWN:
        case Svelto.keyCode.SPACE:
          this.next ();
          break;

        default:
          return;

      }

      event.preventDefault ();
      event.stopImmediatePropagation ();

    }

    /* CYCLE */

    __cycleEnter () {

      if ( this.options.cycle ) {

        this.timer.pause ();

      }

    }

    __cycleLeave () {

      if ( this.options.cycle ) {

        this.timer.remaining ( Math.max ( this.options.intervalMinimumRemaining, this.timer.remaining () || 0 ) );

        this.timer.play ();

      }

    }

    /* INDICATOR TAP */

    __indicatorTap ( event ) {

      this.set ( this.$indicators.index ( event.currentTarget ) );

    }

    /* FLICK */

    __flick ( event, data ) {

      if ( data.orientation === 'horizontal' ) {

        event.preventDefault ();
        event.stopImmediatePropagation ();

        this[data.direction === -1 ? 'next' : 'previous']();

      }

    }

    /* ITEM OBJ */

    _getItemObj ( index ) {

      return {
        index: index,
        $item: this.$items.eq ( index ),
        $indicator: this.$indicators.eq ( index )
      };

    }

    /* INDEX */

    _getPrevIndex ( index ) {

      return ( index > 0 ) ? index - 1 : this.maxIndex;

    }

    _getNextIndex ( index ) {

      return ( index < this.maxIndex ) ? index + 1 : 0;

    }

    /* API */

    get () {

      return this._current.index;

    }

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

        if ( this.options.cycle ) {

          this.timer.stop ();

        }

        this._delay ( function () {

          this._setting = false;

          if ( this._previous ) {

            this._previous.$item.removeClass ( this.options.classes.prev );

          }

          if ( this.options.cycle ) {

            this.timer.play ();

          }

        }, this.options.animations.cycle );

        this._trigger ( 'change' );

      }

    }

    previous () {

      this.set ( this._getPrevIndex ( this._current.index ) );

    }

    next () {

      this.set ( this._getNextIndex ( this._current.index ) );

    }

    play () {

      this.options.cycle = true;
      this.timer.remaining ( Math.max ( this.options.intervalMinimumRemaining, this.timer.remaining () || 0 ) );
      this.timer.play ();

    }

    pause () {

      this.options.cycle = false;
      this.timer.pause ();

    }

    stop () {

      this.options.cycle = false;
      this.timer.stop ();

    }

  }

  /* BINDING */

  Svelto.Carousel = Carousel;
  Svelto.Carousel.config = config;

  /* FACTORY */

  $.factory ( Svelto.Carousel );

}( Svelto.$, Svelto._, window, document ));
