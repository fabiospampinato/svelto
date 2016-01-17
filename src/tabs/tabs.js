
/* =========================================================================
 * Svelto - Tabs
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Add again the super cool moving indicator
//TODO: Not well written, make it better
//TODO: Doesn't handle properly a change of the direction

(function ( $, _, window, document, undefined ) {

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

  class Tabs extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$tabs = this.$element;
      this.$triggers = this.$tabs.find ( this.options.selectors.triggers );
      this.$containers = this.$tabs.find ( this.options.selectors.containers );

      this.options.direction = _.getDirections ().find ( direction => this.$tabs.hasClass ( direction ) ) || this.options.direction;

      this.index = false;

    }

    _init () {

      let $active = this.$triggers.filter ( '.' + this.options.classes.active.trigger ).first (),
          index = this.$triggers.index ( $active );

      this.set ( index );

    }

    _events () {

      /* TRIGGERS */

      this._on ( this.$triggers, Pointer.tap, this.__tap );

    }

    /* PRIVATE */

    _sanitizeIndex ( index ) {

      return _.clamp ( 0, index, this.$triggers.length );

    }

    /* TAP */

    __tap ( event ) {

      let index = this.$triggers.index ( $(event.currentTarget) );

      this.set ( index );

    }

    /* SELECTION */

    _toggleSelection ( index, force ) {

      let $trigger = this.$triggers.eq ( index ),
          $container = this.$containers.eq ( index );

      $trigger.toggleClass ( this.options.classes.active.trigger, force );
      $container.toggleClass ( this.options.classes.active.container, force );

      if ( this.options.highlight ) {

        $trigger.toggleClass ( 'highlighted highlight-' + _.getOppositeDirection ( this.options.direction ), force );

      }

    }

    _select ( index ) {

      this._toggleSelection ( index, true );

    }

    _unselect ( index ) {

      this._toggleSelection ( index, false );

    }

    /* PUBLIC */

    get () {

      return this.index;

    }

    set ( index ) {

      index = this._sanitizeIndex ( index );

      if ( this.index !== index ) {

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

  }

  /* FACTORY */

  $.factory ( Tabs, config, Svelto );

}( Svelto.$, Svelto._, window, document ));
