
/* =========================================================================
 * Svelto - Tabs v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Maybe switch from the indicator to .button.highlight
//FIXME: positionate_indicator is too hacky

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TABS */

  $.factory ( 'svelto.tabs', {

    /* OPTIONS */

    options: {
      selectors: {
        buttons_wrp: '.tabs-buttons',
        buttons: '.button-wrp > .label',
        button_active_class: 'active',
        indicator: '.tabs-buttons-indicator',
        containers_wrp: '.tabs-containers',
        containers: '> .container',
        container_active_class: 'active'
      },
      indicator_delay: 40,
      callbacks: {
        select: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$tabs = this.$element;

      this.isVertical = this.$tabs.hasClass ( 'vertical' );

      this.$tabs_buttons = this.$tabs.find ( this.options.selectors.buttons_wrp );
      this.$buttons = this.$tabs_buttons.find ( this.options.selectors.buttons );
      this.$indicator = this.$tabs.find ( this.options.selectors.indicator );

      this.$tabs_containers = this.$tabs.find ( this.options.selectors.containers_wrp );
      this.$containers = this.$tabs_containers.find ( this.options.selectors.containers );

      var $current_button = this.$buttons.filter ( '.' + this.options.selectors.button_active_class ).first ();

      $current_button = ( $current_button.length > 0 ) ? $current_button : this.$buttons.first ();

      this.prev_index = 0;
      this.current_index = this.$buttons.index ( $current_button );

    },

    _init: function () {

      this.select ( this.current_index, true );

    },

    _events: function () {

      this._on ( this.$tabs_buttons, 'click', this.options.selectors.buttons, this._hander_button_click );

      this._on ( $window, 'resize', this._positionate_indicator ); //TODO: throttle or devounce it

    },

    /* PRIVATE */

    _hander_button_click: function ( event, node ) {

      var new_index = this.$buttons.index ( $(node) );

      this.select ( new_index );

    },

    _positionate_indicator: function () {

      var $active = this.$buttons.filter ( '.' + this.options.selectors.button_active_class ),
        position = $active.position ();

      if ( this.isVertical ) {

        var total_height = this.$tabs_buttons.height ();

        this._delay ( function () {

          var top = position.top + ( this.$buttons.index ( $active ) === 0 ? 1 : 0 ); //FIXME: it's hacky

          this.$indicator.css ( 'top', ( top * 100 / total_height ) + '%' );

        }, this.current_index > this.prev_index ? this.options.indicator_delay : 0 );

        this._delay ( function () {

          var bottom = total_height - position.top - $active.height () + ( this.$buttons.index ( $active ) === this.$buttons.length - 1 ? 1 : 0 ); //FIXME: it's hacky

          this.$indicator.css ( 'bottom', ( bottom * 100 / total_height ) + '%' );

        }, this.current_index > this.prev_index ? 0 : this.options.indicator_delay );

      } else {

        var total_width = this.$tabs_buttons.width ();

        this._delay ( function () {

          var left = position.left + ( this.$buttons.index ( $active ) === 0 ? 1 : 0 ); //FIXME: it's hacky

          this.$indicator.css ( 'left', ( left * 100 / total_width ) + '%' );

        }, this.current_index > this.prev_index ? this.options.indicator_delay : 0 );

        this._delay ( function () {

          var right = total_width - position.left - $active.width () + ( this.$buttons.index ( $active ) === this.$buttons.length - 1 ? 1 : 0 ); //FIXME: it's hacky

          this.$indicator.css ( 'right', ( right * 100 / total_width ) + '%' );

        }, this.current_index > this.prev_index ? 0 : this.options.indicator_delay );

      }

    },

    /* PUBLIC */

    select: function ( index, force ) {

      if ( this.current_index !== index || force ) {

        this.$buttons.eq ( this.current_index ).removeClass ( this.options.selectors.button_active_class );
        this.$buttons.eq ( index ).addClass ( this.options.selectors.button_active_class );

        this.$containers.eq ( this.current_index ).removeClass ( this.options.selectors.container_active_class );
        this.$containers.eq ( index ).addClass ( this.options.selectors.container_active_class );

        if ( this.current_index !== index ) {

          this.prev_index = this.current_index;
          this.current_index = index;

        }

        this._positionate_indicator ();

      }

    }

  });

  /* READY */

  $(function () {

    $('.tabs').tabs ();

  });

}( jQuery, _, window, document ));
