
/* =========================================================================
 * Svelto - Widgets - Selectable - Actions - Container
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before widgets/datatables/datatables.js
 * @require ../actions.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectableActionsContainer',
    plugin: true,
    selector: '.selectable-actions:not(.popover)',
    options: {
      widget: Widgets.Selectable,
      classes: {
        datatable: 'datatable',
        open: 'open'
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* SELECTABLE ACTIONS CONTAINER */

  class SelectableActionsContainer extends Widgets.Targeter {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$container = this.$element;

      this._isOpen = this.$container.hasClass ( this.options.classes.open );
      this._isDataTable = this.$target.hasClass ( this.options.classes.datatable );

    }

    _init () {

      super._init ();

      this.___datatable ();
      this.__update ();

    }

    _events () {

      super._events ();

      this.___update ();

    }

    /* DATATABLE */

    ___datatable () {

      if ( !this._isDataTable ) return;

      this.$container.removeClass ( 'bordered limited centered' );
      this.$target.closest ( '.card-block' ).before ( this.$container );

    }

    /* UPDATE */

    ___update () {

      this._on ( true, this.$target, 'selectable:change', this.__update );

    }

    __update () {

      this.toggle ( !!this._targetInstance.get ().length );

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force = !this._isOpen ) {

      if ( !!force !== this._isOpen ) {

        this._isOpen = !!force;

        this.$container.toggleClass ( this.options.classes.open, this._isOpen );

        this._trigger ( this._isOpen ? 'open' : 'close' );

      }

    }

    open () {

      this.toggle ( true );

    }

    close () {

      this.toggle ( false );

    }

  }

  /* FACTORY */

  Factory.init ( SelectableActionsContainer, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
