
/* =========================================================================
 * Svelto - Accordion
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../expander/expander.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'accordion',
    options: {
      isMultiple: undefined,
      classes: {
        multiple: 'multiple-open'
      },
      selectors: {
        expander: '.expander'
      },
      callbacks: {
        open () {},
        close () {}
      }
    }
  };

  /* ACCORDION */

  class Accordion extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.accordion' ).accordion ();
      $root.filter ( '.accordion' ).accordion ();

    }

    _variables () {

      this.$accordion = this.$element;
      this.$expanders = this.$accordion.children ( this.options.selectors.expander );

      this.expandersInstances = this.$expanders.toArray ().map ( expander => $(expander).expander ( 'instance' ) );

      this.options.isMultiple = _.isBoolean ( this.options.isMultiple ) ? this.options.isMultiple : this.$accordion.hasClass ( this.options.classes.multiple );

    }

    _events () {

      /* EXPANDER OPEN */

      this._on ( this.$expanders, 'expander:open', function ( event ) {

        if ( !this.options.isMultiple ) {

          this.__closeOthers ( event );

        }

      });

    }

    /* EXPANDER OPEN */

    __closeOthers ( event ) {

      for ( let i = 0, l = this.$expanders.length; i < l; i++ ) {

        if ( this.$expanders[i] !== event.target ) {

          this.expandersInstances[i].close ();

        }

      }

    }

    /* PUBLIC */

    areOpen () {

      return this.expandersInstances.map ( instance => instance.isOpen () );

    }

    toggle ( index, force ) {

      let instance = this.expandersInstances[index],
          isOpen = instance.isOpen ();

      if ( !_.isBoolean ( force ) ) {

        force = !isOpen;

      }

      if ( force !== isOpen ) {

        let action = force ? 'open' : 'close';

        instance[action]();

        this._trigger ( action, {
          index: index
        });

      }

    }

    open ( index ) {

      this.toggle ( index, true );

    }

    close ( index ) {

      this.toggle ( index, false );

    }

  }

  /* BINDING */

  Svelto.Accordion = Accordion;
  Svelto.Accordion.config = config;

  /* FACTORY */

  $.factory ( Svelto.Accordion );

}( Svelto.$, Svelto._, window, document ));
