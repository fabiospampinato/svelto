
/* =========================================================================
 * Svelto - Accordion v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* ACCORDION */

  $.widget ( 'presto.accordion', {

    /* SPECIAL */

    _variables: function () {

      this.$accordion = this.$element;
      this.$expanders = this.$accordion.children ( '.expander' );

      this.expanders_instances = Array ( this.$expanders.length );

      this.isMultiple = this.$accordion.hasClass ( 'multiple' );

    },

    _init: function () {

      for ( var i = 0, l = this.$expanders.length; i < l; i++ ) {

        this.expanders_instances[i] = this.$expanders.eq ( i ).expander ( 'instance' );

      }

    },

    _events: function () {

      this._on ( 'expander:open', '.expander', this._handler_open );

    },

    /* OPEN */

    _handler_open: function ( event, data, node ) {

      if ( !this.isMultiple ) {

        for ( var i = 0, l = this.$expanders.length; i < l; i++ ) {

          if ( this.$expanders[i] !== node ) {

            this.expanders_instances[i].close ();

          }

        }

      }

    },

    /* PUBLIC */

    toggle: function ( index ) {

      this.expanders_instances[index].toggle ();

    },

    toggleAll: function () {

      _.each ( this.expanders_instances, function ( instance ) {

        instance.toggle ();

      });

    },

    open: function ( index ) {

      this.expanders_instances[index].open ();

    },

    openAll: function () {

      _.each ( this.expanders_instances, function ( instance ) {

        instance.open ();

      });

    },

    close: function ( index ) {

      this.expanders_instances[index].close ();

    },

    closeAll: function () {

      _.each ( this.expanders_instances, function ( instance ) {

        instance.close ();

      });

    }

  });

  /* READY */

  $(function () {

    $('.accordion').accordion ();

  });

}( jQuery, _, window, document ));
