
/* =========================================================================
 * Svelto - Dropdown v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../positionate/positionate.js
 * ========================================================================= */

//TODO: add support for delegating the trigger click, so that we support the case when a trigger has been added to the DOM dynamically
//TODO: add dropdown-closer

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var assignments = {};

  /* DROPDOWN */

  $.widget ( 'svelto.dropdown', {

    /* OPTIONS */

    options: {
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$dropdown = this.$element;
      this.$tips = this.$dropdown.find ( '.dropdown-tip' );
      this.$top_tip = this.$tips.filter ( '.top' );
      this.$right_tip = this.$tips.filter ( '.right' );
      this.$bottom_tip = this.$tips.filter ( '.bottom' );
      this.$left_tip = this.$tips.filter ( '.left' );
      this.$actionables = this.$dropdown.find ( '.actionable' );

      this.id = this.$dropdown.attr ( 'id' );

      this.$triggers = $('.dropdown-trigger[data-dropdown="' + this.id + '"]');

      this.hasTips = !this.$dropdown.hasClass ( 'no-tip' );
      this.isAttached = this.$dropdown.hasClass ( 'attached' );

      this.opened = false;

    },

    _events: function () {

      this._on ( this.$triggers, 'click', this.toggle );

      this._on ( this.$actionables, 'click', this.close );

      // this.$btn_parents.on ( 'scroll', this.update ); //FIXME: If we are doing it into a scrollable content it will be a problem if we don't handle it, the dropdown will not move

    },

    /* WINDOW RESIZE / SCROLL */

    _bind_window_resize_scroll: function () {

      this._on ( $window, 'resize scroll', this._update );

    },

    _unbind_window_resize_scroll: function () {

      this._off ( $window, 'resize scroll', this._update );

    },

    /* WINDOW CLICK */

    _bind_window_click: function () {

      this._on ( $window, 'click', this._handler_window_click );

    },

    _unbind_window_click: function () {

      this._off ( $window, 'click', this._handler_window_click );

    },

    _handler_window_click: function ( event ) {

      var $parents = $(event.target).parents ();

      if ( $parents.index ( this.$dropdown ) === -1 ) { //INFO: Checking if we clicked inside the dropdown or another trigger for this dropdown

        for ( var i = 0, l = this.$triggers.length; i < l; i++ ) {

          if ( event.target === this.$triggers.get ( i ) || $parents.index ( this.$triggers.get ( i ) ) !== -1 ) {

            return;

          }

        }

        this.close ();

      }

    },

    /* POSITIONATE */

    _positionate: function () {

      // Variables

      var $trigger = $(assignments[this.id]),
        no_tip = $trigger.hasClass ( 'no-tip' ) || !this.hasTips || this.isAttached,
        instance = this;

      // Positionate

      this.$dropdown.positionate ({
        $anchor: $trigger,
        $pointer: function ( data ) {
          if ( !no_tip ) {
            return instance['$' + instance._get_opposite_direction ( data.direction ) + '_tip'];
          }
        },
        callbacks: {
          positionated: function ( data ) {
            $trigger.addClass ( 'dropdown-trigger-' + data.direction );
          }
        }
      });

    },

    /* PRIVATE */

    _get_opposite_direction: function ( direction ) {

      switch ( direction ) {

        case 'top':
          return 'bottom';

        case 'bottom':
          return 'top';

        case 'left':
          return 'right';

        case 'right':
          return 'left';

      }

    },

    _update: function () {

      if ( this.opened ) {

        this._positionate ();

      }

    },

    /* PUBLIC */

    toggle: function ( event, trigger ) {

      this[( this.opened && assignments[this.id] === trigger ) ? 'close' : 'open']( event, trigger );

    },

    open: function ( event, trigger ) {

      if ( trigger ) {

        $(assignments[this.id]).removeClass ( 'dropdown-trigger-top dropdown-trigger-bottom dropdown-trigger-left dropdown-trigger-right active' );

        if ( this.opened && assignments[this.id] !== trigger ) {

          this.$dropdown.addClass ( 'moving' );

        }

        assignments[this.id] = trigger;

        $(trigger).addClass ( 'active' );

      }

      this._positionate ();

      this.$dropdown.addClass ( 'active' );

      this.opened = true;

      this._delay ( this._bind_window_click ); //FIXME: Why without the delay it doesn't work?
      this._bind_window_resize_scroll ();

      this._trigger ( 'open' );

    },

    close: function () {

      $(assignments[this.id]).removeClass ( 'dropdown-trigger-top dropdown-trigger-bottom dropdown-trigger-left dropdown-trigger-right active' );

      this.$dropdown.removeClass ( 'active moving' );

      this.opened = false;

      this._unbind_window_click ();
      this._unbind_window_resize_scroll ();

      this._trigger ( 'close' );

    }

  });

  /* READY */

  $(function () {

    $('.dropdown').dropdown ();

  });

}( jQuery, _, window, document ));
