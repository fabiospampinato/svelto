
/* =========================================================================
 * Svelto - Carousel
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Add slides drag support

(function ( $, _, Svelto, Widgets, Factory, Pointer, Timer, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'carousel',
    plugin: true,
    selector: '.carousel',
    options: {
      startIndex: 0,
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
        cycle: Animations.normal
      },
      keystrokes: {
        'left, up': 'previous',
        'right, down, space': 'next'
      },
      callbacks: {
        change: _.noop
      }
    },
  };

  /* CAROUSEL */

  class Carousel extends Widgets.Widget {

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

      if ( $current.length ) {

        this._current = this._getItemObj ( this.$items.index ( $current ) );

      } else {

        this.set ( this.options.startIndex );

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

      /* CYCLE */

      this._on ( true, this.$itemsWrp, Pointer.enter, this.__cycleEnter );
      this._on ( true, this.$itemsWrp, Pointer.leave, this.__cycleLeave );

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

    /* API OVERRIDES */

    enable () {

      super.enable ();

      if ( this.options.cycle || this._wasCycle ) {

        this.play ();

      }

    }

    disable () {

      super.disable ();

      this._wasCycle = this.options.cycle;

      if ( this.options.cycle ) {

        this.stop ();

      }

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

    /* API TIMER */

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

    reset () {

      this.options.cycle = true;
      this.timer.reset ();

    }

  }

  /* FACTORY */

  Factory.init ( Carousel, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Timer, Svelto.Animations ));
