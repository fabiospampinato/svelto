
/* =========================================================================
 * Svelto - Accordion
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../expander/expander.js
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'accordion',
    selector: '.accordion',
    options: {
      multiple: false, //INFO: Wheter to keep multiple expanders open or just one
      selectors: {
        expander: Svelto.Expander.config.selector
      }
    }
  };

  /* ACCORDION */

  class Accordion extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$accordion = this.$element;
      this.$expanders = this.$accordion.children ( this.options.selectors.expander );

      this.instances = this.$expanders.get ().map ( expander => $(expander).expander ( 'instance' ) );

    }

    _events () {

      /* SINGLE */

      if ( !this.options.multiple ) {

        /* EXPANDER OPEN */

        this._on ( this.$expanders, 'expander:open', this.__closeOthers );

      }

    }

    _destroy () {

      /* SINGLE */

      if ( !this.options.multiple ) {

        /* EXPANDER OPEN */

        this._off ( this.$expanders, 'expander:open', this.__closeOthers );

      }

    }

    /* EXPANDER OPEN */

    __closeOthers ( event ) {

      for ( let i = 0, l = this.$expanders.length; i < l; i++ ) {

        if ( this.$expanders[i] !== event.target ) {

          this.instances[i].close ();

        }

      }

    }

    /* API OVERRIDES */

    enable () {

      _.invoke ( this.instances, 'enable' );

    }

    disable () {

      _.invoke ( this.instances, 'disable' );

    }

    /* API */

    areOpen () {

      return _.invoke ( this.instances, 'isOpen' );

    }

    toggle ( index, force ) {

      this.instances[index].toggle ( force );

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
