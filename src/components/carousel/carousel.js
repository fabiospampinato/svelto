
/* =========================================================================
 * Svelto - Carousel v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add animation support

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CAROUSEL */

  $.factory ( 'svelto.carousel', {

    /* OPTIONS */

    options: {
      cycle: true,
      interval: 5000,
      intervalMinimumRemaining: 1000,
      classes: {
        prev: 'prev',
        current: 'active',
        next: 'next',
        disabled: 'disabled'
      },
      selectors: {
        prev: '.carousel-prev',
        next: '.carousel-next',
        indicator: '.carousel-indicator',
        item: '.carousel-items > *'
      },
      animations: {
        cycle: $.ui.animation.normal
      },
      callbacks: {
        //TODO: Write callbacks
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$carousel = this.$element;
      this.$prev = this.$carousel.find ( this.options.selectors.prev );
      this.$next = this.$carousel.find ( this.options.selectors.next );
      this.$indicators = this.$carousel.find ( this.options.selectors.indicator );
      this.$items = this.$carousel.find ( this.options.selectors.item );

      this.maxIndex = this.$items.length - 1;

      this._previous = false;
      this._current = false;
      this._next = false;

      if ( this.options.cycle ) {

        this.timer = $.timer ( this.next.bind ( this ), this.options.interval, true );

      }

    },

    _init: function () {

      this.set ( 0 );

    },

    _events: function () {

      /* PREVIOUS */

      this._on ( this.$prev, Pointer.tap, this.previous );

      /* NEXT */

      this._on ( this.$next, Pointer.tap, this.next );

      /* KEYDOWN */

      this._onHover ( [$document, 'keydown', this.__keydown] );

      /* CYCLE */

      if ( this.options.cycle ) {

        this._on ( Pointer.enter, this.__cycleEnter );
        this._on ( Pointer.leave, this.__cycleLeave );

      }

    },

    /* KEYDOWN */

    __keydown: function ( event ) {

      switch ( event.keyCode ) {

        case $.ui.keyCode.LEFT:
          this.previous ();
          break;

        case $.ui.keyCode.RIGHT:
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

    __cycleEnter: function () {

      this.timer.pause ();

    },

    __cycleLeave: function () {

      this.timer.remaining ( Math.max ( this.options.intervalMinimumRemaining, this.timer.remaining () || 0 ) );

      this.timer.play ();

    },

    /* ITEM OBJ */

    _getItemObj ( index ) {

      return {
        index: index,
        $item: this.$items.eq ( index ),
        $indicator: this.$indicators.eq ( index )
      };

    },

    _getPrevItemObj ( index ) {

      return this._getItemObj ( this._getPrevIndex ( index ) );

    },

    _getNextItemObj ( index ) {

      return this._getItemObj ( this._getNextIndex ( index ) );

    },

    /* INDEX */

    _getPrevIndex ( index ) {

      return ( index > 0 ) ? index - 1 : this.maxIndex;

    },

    _getNextIndex ( index ) {

      return ( index < this.maxIndex ) ? index + 1 : 0;

    },

    /* API */

    get: function () {

      return this._current ? this._current.index : undefined;

    },

    set: function ( index ) {

      //FIXME: Fix animation when jumping without cycling

      if ( !this._current || index !== this._current.index ) {

        if ( this._previous ) {

          this._previous.$item.removeClass ( this.options.classes.prev );

        }

        if ( this._current ) {

          this._current.$item.removeClass ( this.options.classes.current );
          this._current.$indicator.removeClass ( this.options.classes.current );

        }

        if ( this._next ) {

          this._next.$item.removeClass ( this.options.classes.next );

        }

        this._previous = this._getPrevItemObj ( index );
        this._current = this._getItemObj ( index );
        this._next = this._getNextItemObj ( index );

        this._previous.$item.addClass ( this.options.classes.prev );

        this._current.$item.addClass ( this.options.classes.current );
        this._current.$indicator.addClass ( this.options.classes.current );

        this._next.$item.addClass ( this.options.classes.next );

      }

    },

    previous: function () {

      this.set ( this._current ? this._getPrevIndex ( this._current.index ) : this.maxIndex );

    },

    next: function () {

      this.set ( this._current ? this._getNextIndex ( this._current.index ) : 0 );

    }

  });

  /* READY */

  $(function () {

    $('.carousel').carousel ();

  });

}( jQuery, _, window, document ));
