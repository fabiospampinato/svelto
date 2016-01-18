
/* =========================================================================
 * Svelto - Accordion
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../expander/expander.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'accordion',
    plugin: true,
    selector: '.accordion',
    options: {
      multiple: false, //INFO: Wheter to keep multiple expanders open or just one
      selectors: {
        expander: Widgets.Expander.config.selector
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* ACCORDION */

  class Accordion extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$accordion = this.$element;
      this.$expanders = this.$accordion.children ( this.options.selectors.expander );

      this.instances = this.$expanders.get ().map ( expander => $(expander).expander ( 'instance' ) );

    }

    _events () {

      /* EXPANDER OPEN */

      this._on ( true, this.$expanders, 'expander:open', this.__open );

      /* EXPANDER CLOSE */

      this._on ( true, this.$expanders, 'expander:close', this.__close );

    }

    /* EXPANDER OPEN */

    __open ( event ) {

      this._trigger ( 'open', { index: this.$expanders.index ( event.target) } );

      /* SINGLE */

      if ( !this.options.multiple ) {

        /* CLOSE OTHERS */

        for ( let i = 0, l = this.$expanders.length; i < l; i++ ) {

          if ( this.$expanders[i] !== event.target ) {

            this.instances[i].close ();

          }

        }

      }

    }

    /* EXPANDER CLOSE */

    __close ( event ) {

      this._trigger ( 'close', { index: this.$expanders.index ( event.target) } );

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

  /* FACTORY */

  Factory.init ( Accordion, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
