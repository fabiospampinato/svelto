
/* =========================================================================
 * Svelto - Accordion v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../expander/expander.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* ACCORDION */

  $.factory ( 'svelto.accordion', {

    /* OPTIONS */

    options: {
      classes: {
        multiple: 'multiple-open'
      },
      selectors: {
        expander: '.expander'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    },

    /* SPECIAL */

    _widgetize: function ( $root ) {

      $root.find ( '.accordion' ).accordion ();
      
    },

    _variables: function () {

      this.$accordion = this.$element;
      this.$expanders = this.$accordion.children ( this.options.selectors.expander );
      this.expandersNr = this.$expanders.length;

      this.expandersInstances = _.map ( this.$expanders, function ( expander ) {

        return $(expander).expander ( 'instance' );

      });

      this.isMultiple = this.$accordion.hasClass ( this.options.classes.multiple );

    },

    _events: function () {

      if ( !this.isMultiple ) {

        this._on ( this.$expanders, 'expander:open', this.__close_others );

      }

    },

    /* OPEN */

    __close_others: function ( event, data, node ) {

      for ( var i = 0; i < this.expandersNr; i++ ) {

        if ( this.$expanders[i] !== node ) {

          this.expandersInstances[i].close ();

        }

      }

    },

    /* PUBLIC */

    areOpen: function () {

      return _.map ( this.expandersInstances, function ( instance ) {

        return instance.isOpen ();

      });

    },

    toggle: function ( index, force ) {

      var instance = this.expandersInstances[index],
          isOpen = instance.isOpen ();

      if ( !_.isBoolean ( force ) ) {

        force = !isOpen;

      }

      if ( force !== isOpen ) {

        var action = force ? 'open' : 'close';

        instance[action]();

        this._trigger ( action, {
          index: index
        });

      }

    },

    open: function ( index ) {

      this.toggle ( index, true );

    },

    close: function ( index ) {

      this.toggle ( index, false );

    }

  });

}( jQuery, _, window, document ));
