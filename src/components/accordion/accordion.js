
/* =========================================================================
 * Svelto - Accordion
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

    _widgetize ( $root ) {

      $root.find ( '.accordion' ).accordion ();

    },

    _variables () {

      this.$accordion = this.$element;
      this.$expanders = this.$accordion.children ( this.options.selectors.expander );
      this.expandersNr = this.$expanders.length;

      this.expandersInstances = this.$expanders.toArray ().map ( expander => $(expander).expander ( 'instance' ) );

      this.isMultiple = this.$accordion.hasClass ( this.options.classes.multiple );

    },

    _events () {

      if ( !this.isMultiple ) {

        this._on ( this.$expanders, 'expander:open', this.__closeOthers );

      }

    },

    /* EXPANDER OPEN */

    __closeOthers ( event, data, node ) {

      for ( var i = 0; i < this.expandersNr; i++ ) {

        if ( this.$expanders[i] !== node ) {

          this.expandersInstances[i].close ();

        }

      }

    },

    /* PUBLIC */

    areOpen () {

      return this.expandersInstances.map ( instance => instance.isOpen () );

    },

    toggle ( index, force ) {

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

    open ( index ) {

      this.toggle ( index, true );

    },

    close ( index ) {

      this.toggle ( index, false );

    }

  });

}( jQuery, _, window, document ));
