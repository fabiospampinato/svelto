
/* =========================================================================
 * Svelto - Widgets - Tabs
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/directions/directions.js
 * ========================================================================= */

//TODO: Add again the super cool moving indicator
//TODO: Not well written, make it better
//TODO: Doesn't handle properly a change of the direction

(function ( $, _, Svelto, Widgets, Factory, Pointer, Directions ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tabs',
    plugin: true,
    selector: '.tabs',
    options: {
      direction: 'top',
      highlight: true,
      classes: {
        active: {
          trigger: 'active',
          container: 'active'
        }
      },
      selectors: {
        triggers: '.tabs-triggers > *',
        containers: '.tabs-containers > *'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* TABS */

  class Tabs extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$tabs = this.$element;
      this.$triggers = this.$tabs.find ( this.options.selectors.triggers );
      this.$containers = this.$tabs.find ( this.options.selectors.containers );

      this.options.direction = Directions.get ().find ( direction => this.$tabs.hasClass ( direction ) ) || this.options.direction;

      this.index = false;

    }

    _init () {

      let $active = this.$triggers.filter ( '.' + this.options.classes.active.trigger ).first (),
          index = this.$triggers.index ( $active );

      this.set ( index );

    }

    _events () {

      this.___tap ();

    }

    /* PRIVATE */

    _sanitizeIndex ( index ) {

      return _.clamp ( index, 0, this.$triggers.length );

    }

    /* TAP */

    ___tap () {

      this._on ( this.$triggers, Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      event.stopImmediatePropagation ();

      let index = this.$triggers.index ( $(event.currentTarget) );

      this.set ( index );

    }

    /* SELECTION */

    _toggleSelection ( index, force ) {

      let $trigger = this.$triggers.eq ( index ),
          $container = this.$containers.eq ( index );

      $trigger.toggleClass ( this.options.classes.active.trigger, force );
      $container.toggleClass ( this.options.classes.active.container, force );

      if ( force ) {

        $container.widgetize ();

      }

      if ( this.options.highlight ) {

        let oppositeDirection = Directions.getOpposite ( this.options.direction );

        $trigger.toggleClass ( `highlighted highlight-${oppositeDirection}`, force );

      }

    }

    _select ( index ) {

      this._toggleSelection ( index, true );

    }

    _unselect ( index ) {

      this._toggleSelection ( index, false );

    }

    /* API */

    get () {

      return this.index;

    }

    set ( index ) {

      index = this._sanitizeIndex ( index );

      if ( index === this.index ) return;

      /* PREVIOUS */

      if ( _.isNumber ( this.index ) ) {

        this._unselect ( this.index );

      }

      /* NEW */

      this.index = index;

      this._select ( this.index );

      /* CALLBACKS */

      this._trigger ( 'change' );

    }

  }

  /* FACTORY */

  Factory.init ( Tabs, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Directions ));
