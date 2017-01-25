
/* =========================================================================
 * Svelto - Widgets - Selectable - Actions - Popover
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../actions.js
 * @require widgets/popover/popover.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectableActionsPopover',
    plugin: true,
    selector: '.selectable-actions.popover',
    options: {
      widget: Widgets.Selectable
    }
  };

  /* SELECTABLE ACTIONS POPOVER */

  class SelectableActionsPopover extends Widgets.Targeter {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$popover = this.$element;

      this._popoverInstance = this.$popover.popover ( 'instance' );

    }

    _init () {

      super._init ();

      this._popoverInstance.option ( 'positionate.alignment.x', 'left' );
      this._popoverInstance.option ( 'positionate.constrainer.$element', this.$window );

    }

    _events () {

      super._events ();

      this.___context ();
      this.___action ();

    }

    /* CONTEXT */

    ___context () {

      this._on ( true, this.$target, 'contextmenu', this.__context );

    }

    __context ( event ) {

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this._contextEvent = event;

      this._one ( true, this.$document, Pointer.up, this._toggle ); // Selectable listens on this event, also `contextmenu` gets fired before, so we wouldn't get the updated list of selected elements

    }

    /* ACTION */

    ___action () {

      this._on ( true, 'selectableactions:action', this._close );

    }

    /* PRIVATE API */

    _toggle () {

      this[this._targetInstance.get ().length ? '_open' : '_close']();

    }

    _open () {

      let point = $.eventXY ( this._contextEvent );

      this._popoverInstance.option ( 'positionate.point', point );
      this._popoverInstance.open ();

    }

    _close () {

      this._popoverInstance.close ();

    }

  }

  /* FACTORY */

  Factory.init ( SelectableActionsPopover, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
