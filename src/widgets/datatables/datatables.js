
/* =========================================================================
 * Svelto - Widgets - Datatables
 * =========================================================================
 * Copyright (c) 2011-2016 Fabio Spampinato - All rights reserved.
 * =========================================================================
 * @require ./config.js
 * @require core/widget/widget.js
 * ========================================================================= */

//TODO: Add a spinnerOverlay when processing
//TODO: Proxy all `*.dt` events as `dt:*`
//TODO: Test in all browsers

/* DATATABLES */

(function ( $, _, Svelto, Widgets, Factory, DataTable ) {

  'use strict';

  /* CHECK IF LOADED */

  if ( !DataTable ) return;

  /* CONFIG */

  let config = {
    name: 'dt',
    plugin: true,
    selector: 'table.datatable:visible',
    options: {
      selectors: {
        wrapper: '.datatable-wrapper'
      },
      keystrokes: {
        'ctmd + shift + left': ['page', 'first'],
        'ctmd + left': ['page', 'previous'],
        'ctmd + right': ['page', 'next'],
        'ctmd + shift + right': ['page', 'last']
      }
    }
  };

  /* DATATABLE */

  class DT extends Widgets.Widget {

    /* SPECIAL */

    static widgetize ( $ele ) {

      $ele.dataTable ().dt ();

    }

    _variables () {

      this.$table = this.$element;
      this.$wrapper = this.$table.closest ( this.options.selectors.wrapper );
      this._api = this.$table.DataTable ();

    }

    _init () {

      this.___keydown ();

    }

    _destroy () {

      this.$wrapper.remove ();

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( this.$wrapper, [this.$document, 'keydown', this.__keydown] );

    }

    /* API */

    api ( method, ...args ) {

      return this._api[method]( ...args );

    }

    page ( nr ) {

      if ( _.isUndefined ( nr ) ) return this.api ( 'page' );

      this.api ( 'page', nr );
      this.api ( 'draw', false );

    }

  }

  /* FACTORY */

  Factory.init ( DT, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.DataTable ));
