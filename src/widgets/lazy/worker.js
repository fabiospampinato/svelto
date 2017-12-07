
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

    constructor () {

      this.options = defaults;

      this.groups = {};

      this.__scroll = _.frames ( this.__scroll.bind ( this ) );
      this.__resize = _.frames ( this.__resize.bind ( this ) );

    }

    /* EVENTS */

    ___events () {

      if ( this._eventsOn ) return;

      this._eventsOn = true;

      $.$document.on ( 'scroll', this.__scroll );
      $.$window.on ( 'resize', this.__resize );

    }

    ___events_off () {

      if ( !this._eventsOn ) return;

      this._eventsOn = false;

      $.$document.off ( 'scroll', this.__scroll );
      $.$window.off ( 'resize', this.__resize );

    }

    /* SCROLL */

    __scroll ( event ) {

      this.process ( this._scrolled ? this.options.multipliers.scroll : this.options.multipliers.firstScroll );

      this._scrolled = true;

    }

    /* RESIZE */

    __resize () {

      this.process ();

    }

    /* UTILITIES */

    _shouldLoad ( $element, multipliers, _windowWidth, _windowHeight ) {

      let windowWidth = _windowWidth || $.window.innerWidth,
          windowHeight = _windowHeight || $.window.innerHeight,
          eRect = $element.getRect (),
          deltaX = this.options.thresholds.x * multipliers.x * this.options.multipliers.dynamic.factor,
          deltaY = this.options.thresholds.y * multipliers.y * this.options.multipliers.dynamic.factor;

      return eRect.top - windowHeight <= deltaY &&
             eRect.left - windowWidth <= deltaX &&
             $element.isVisible ();

    }

    /* API */

    add ( widget, $element, group ) { //TODO: Process only new elements

      if ( !this.groups[group] ) this.groups[group] = [];

      this.groups[group].push ([ widget, $element ]);

      if ( this._addId ) clearTimeout ( this._addId );

      this._addId = setTimeout ( () => {
        this._addId = false;
        this.process ();
      }, 10 );

    }

    process ( multipliers = this.options.multipliers.default, onlyGroup ) {

      let hadElements = false,
          hasLeftovers = false,
          hasLoaded = false,
          isOnlyGroup = !_.isUndefined ( onlyGroup ),
          windowWidth = $.window.innerWidth,
          windowHeight = $.window.innerHeight;

      onlyGroup = String ( onlyGroup );

      for ( let group in this.groups ) {

        if ( !this.groups.hasOwnProperty ( group ) ) continue;
        if ( isOnlyGroup && group !== onlyGroup ) continue;

        hadElements = true;

        let queue = this.groups[group],
            isGroup = group !== 'undefined',
            leftovers = isGroup ? undefined : [],
            leftoversIndex = -1;

        for ( let i = 0, l = queue.length; i < l; i++ ) {

          let item = queue[i],
              [widget, $element] = item;

          if ( this._shouldLoad ( $element, multipliers, windowWidth, windowHeight ) ) {

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

      if ( !isOnlyGroup ) {

        this[hasLeftovers ? '___events' : '___events_off']();

      }

      return !hasLeftovers; // Completed?

    }

  }

  /* EXPORT */

  Svelto.LazyWorker = new LazyWorker ();
  Svelto.LazyWorker.defaults = defaults;

}( Svelto.$, Svelto._, Svelto ));
