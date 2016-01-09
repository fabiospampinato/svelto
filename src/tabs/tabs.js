
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
        set: _.noop
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

      /* DIRECTION */

      let directions = ['top', 'right', 'bottom', 'left'];

      for ( let direction of directions ) {

        if ( this.$tabs.hasClass ( direction ) ) {

          this.options.direction = direction;

          break;

        }

      }

      this.index = -1;

    }

    _init () {

      let $activeTrigger = this.$triggers.filter ( '.' + this.options.classes.active.trigger ).first ();

      $activeTrigger = ( $activeTrigger.length > 0 ) ? $activeTrigger : this.$triggers.first ();

      let newIndex = this.$triggers.index ( $activeTrigger );

      this.set ( newIndex );

    }

    _events () {

      /* TRIGGERS */

      this._on ( this.$triggers, Pointer.tap, this.__tap );

    }

    /* PRIVATE */

    __tap ( event ) {

      let newIndex = this.$triggers.index ( $(event.currentTarget) );

      this.set ( newIndex );

    }

    /* PUBLIC */

    get () {

      return this.index;

    }

    set ( index ) {

      if ( this.index !== index ) {

        /* PREVIOUS */

        let $prevTrigger = this.$triggers.eq ( this.index ),
            $prevContainer = this.$containers.eq ( this.index );

        $prevTrigger.removeClass ( this.options.classes.active.trigger );
        $prevContainer.removeClass ( this.options.classes.active.container );

        if ( this.options.highlight ) {

          $prevTrigger.removeClass ( 'highlighted highlight-top highlight-bottom highlight-left highlight-right' );

        }

        /* NEW */

        this.index = index;

        let $trigger = this.$triggers.eq ( this.index ),
            $container = this.$containers.eq ( this.index );

        $trigger.addClass ( this.options.classes.active.trigger );
        $container.addClass ( this.options.classes.active.container );

        if ( this.options.highlight ) {

          let opposites = {
            'top'   : 'bottom',
            'bottom': 'top',
            'left'  : 'right',
            'right' : 'left'
          };

          $trigger.addClass ( 'highlighted' + ( ' highlight-' + opposites[this.options.direction] ) );

        }

        /* CALLBACKS */

        this._trigger ( 'set' );

      }

    }

  }

  /* FACTORY */

  $.factory ( Tabs, config, Svelto );

}( Svelto.$, Svelto._, window, document ));
