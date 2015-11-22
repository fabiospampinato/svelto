
/* =========================================================================
 * Svelto - Tabs
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add again the indicator

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tabs',
    options: {
      highlight: true,
      classes: {
        vertical: 'vertical',
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

    _widgetize ( $root ) {

      $root.find ( '.tabs' ).tabs ();
      $root.filter ( '.tabs' ).tabs ();

    }

    _variables () {

      this.$tabs = this.$element;
      this.$triggers = this.$tabs.find ( this.options.selectors.triggers );
      this.$containers = this.$tabs.find ( this.options.selectors.containers );

      this.isVertical = this.$tabs.hasClass ( this.options.classes.vertical );

      this.index = -1;

    }

    _init () {

      var $activeTrigger = this.$triggers.filter ( '.' + this.options.classes.active.trigger ).first ();

      $activeTrigger = ( $activeTrigger.length > 0 ) ? $activeTrigger : this.$triggers.first ();

      var newIndex = this.$triggers.index ( $activeTrigger );

      this.set ( newIndex );

    }

    _events () {

      /* TRIGGERS */

      this._on ( this.$triggers, Pointer.tap, this.__tap );

    }

    /* PRIVATE */

    __tap ( event ) {

      var newIndex = this.$triggers.index ( $(event.currentTarget) );

      this.set ( newIndex );

    }

    /* PUBLIC */

    get () {

      return this.index;

    }

    set ( index ) {

      if ( this.index !== index ) {

        /* PREVIOUS */

        var $prevTrigger = this.$triggers.eq ( this.index ),
            $prevContainer = this.$containers.eq ( this.index );

        $prevTrigger.removeClass ( this.options.classes.active.trigger );
        $prevContainer.removeClass ( this.options.classes.active.container );

        if ( this.options.highlight ) {

          $prevTrigger.removeClass ( 'highlight highlight-bottom highlight-right' );

        }

        /* NEW */

        this.index = index;

        var $trigger = this.$triggers.eq ( this.index ),
            $container = this.$containers.eq ( this.index );

        $trigger.addClass ( this.options.classes.active.trigger );
        $container.addClass ( this.options.classes.active.container );

        if ( this.options.highlight ) {

          $trigger.addClass ( 'highlight' + ( this.isVertical ? ' highlight-right' : ' highlight-bottom' ) );

        }

        /* CALLBACKS */

        this._trigger ( 'set', {
          index: this.index
        });

      }

    }

  }

  /* BINDING */

  Svelto.Tabs = Tabs;
  Svelto.Tabs.config = config;

  /* FACTORY */

  $.factory ( Svelto.Tabs );

}( Svelto.$, Svelto._, window, document ));
