
/* =========================================================================
 * Svelto - Widgets - Lazy (Worker)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

//TODO: Add a good way of extending the default options

(function ( $, _, Svelto ) {

  'use strict';

  /* CONFIG */

  const defaults = {
    thresholds: {
      x: 200,
      y: 450
    },
    multipliers: {
      dynamic: {
        enabled: true,
        factor: 1,
        multiplier: 1.05
      },
      default: {
        x: 1,
        y: 1
      },
      scroll: {
        x: 1.25,
        y: 1.5
      },
      firstScroll: {
        x: 1.5,
        y: 2
      }
    }
  };

  /* LAZY WORKER */

  class LazyWorker {

    /* SPECIAL */

    constructor ( options = {} ) {

      this.options = _.merge ( {}, defaults, options );

      this.groups = {};

    }

    /* SCROLL */

    ___scroll () {

      if ( this._scrollId ) return;

      this._scrollId = true;

      this.__throttledScroll = this.__throttledScroll || _.frames ( this.__scroll.bind ( this ) );

      $.$document.on ( 'scroll', this.__throttledScroll );

    }

    ___scroll_off () {

      if ( !this._scrollId ) return;

      this._scrollId = false;

      $.$document.off ( 'scroll', this.__throttledScroll );

    }

    __scroll ( event ) {

      this.process ( this._scrolled ? this.options.multipliers.scroll : this.options.multipliers.firstScroll );

      this._scrolled = true;

    }

    /* UTILITIES */

    _shouldLoad ( $element, multipliers, _wRect ) {

      let wRect = _wRect || $.$window.getRect (),
          eRect = $element.getRect (),
          deltaX = this.options.thresholds.x * multipliers.x * this.options.multipliers.dynamic.factor,
          deltaY = this.options.thresholds.y * multipliers.y * this.options.multipliers.dynamic.factor;

      return eRect.top - wRect.height <= deltaY &&
             eRect.bottom >= -deltaY &&
             eRect.left - wRect.width <= deltaX &&
             eRect.right >= -deltaX;
            //  $element.is ( ':visible' ); //FIXME: We should load it only when needed (for instance when its tab becomes active, if this is the case

    }

    /* API */

    add ( widget, $element, group ) { //TODO: Process only new elements

      if ( !this.groups[group] ) this.groups[group] = [];

      this.groups[group].push ([ widget, $element ]);

      if ( this._addId ) clearTimeout ( this._addId );

      this._addId = setTimeout ( () => {
        this._addId = false;
        this.process ();
      }, 7 );

    }

    process ( multipliers = this.options.multipliers.default ) {

      let hadElements = false,
          hasLeftovers = false,
          hasLoaded = false,
          wRect = $.$window.getRect ();

      for ( let group in this.groups ) {

        if ( !this.groups.hasOwnProperty ( group ) ) continue;

        hadElements = true;

        let queue = this.groups[group],
            isGroup = group !== 'undefined',
            leftovers = isGroup ? undefined : [],
            leftoversIndex = -1;

        for ( let i = 0, l = queue.length; i < l; i++ ) {

          let item = queue[i],
              [widget, $element] = item;

          if ( this._shouldLoad ( $element, multipliers, wRect ) ) {

            hasLoaded = true;

            widget.load ();

          } else {

            if ( isGroup ) {

              leftoversIndex = i;

              break;

            } else {

              leftovers.push ( item );

            }

          }

        }

        if ( isGroup && leftoversIndex >= 0 ) leftovers = queue.slice (  leftoversIndex );

        if ( leftovers && leftovers.length ) {

          hasLeftovers = true;

          this.groups[group] = leftovers;

        } else {

          delete this.groups[group];

        }

      }

      if ( !hadElements ) return;

      if ( hasLoaded && this.options.multipliers.dynamic.enabled ) {

        this.options.multipliers.dynamic.factor *= this.options.multipliers.dynamic.multiplier;

      }

      this[hasLeftovers ? '___scroll' : '___scroll_off']();

    }

  }

  /* EXPORT */

  Svelto.LazyWorker = new LazyWorker ();
  Svelto.LazyWorker.defaults = defaults;

}( Svelto.$, Svelto._, Svelto ));
