
// @require ./config.js
// @require core/widget/widget.js

//TODO: Add a spinnerOverlay when processing
//TODO: Proxy all `*.dt` events as `dt:*`
//TODO: Test in all browsers
//TODO: Maybe add `autofocus` capabilities
//FIXME: We actually `require` Selectable, but requiring it creates a circular dependency...

/* DATATABLES */

(function ( $, _, Svelto, Widgets, Factory, DataTable ) {

  /* CHECK IF LOADED */

  if ( !DataTable ) return;

  /* CONFIG */

  let config = {
    name: 'dt',
    plugin: true,
    selector: 'table.datatable',
    options: {
      select: false, // Select rows, even after a draw occurs -- basically supporting deferred loading
      /*
              {
                column: 0, // Index of the column used for finding rows to select
                value: 'value', // Selecting rows with this value in the appropriate column
                values: [] // Selecting rows with one of this values in the appropriate column
              }
      */
      datas: {
        select: 'select'
      },
      selectors: {
        wrapper: '.datatable-wrapper',
        length: '.datatable-length select'
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

    /* WIDGETIZE */

    static widgetize ( ele ) {

      if ( !$.isVisible ( ele ) ) return;

      $(ele).dataTable ().dt ();

    }

    /* SPECIAL */

    _variables () {

      this.$table = this.$element;
      this.$wrapper = this.$table.closest ( this.options.selectors.wrapper );
      this.$length = this.$wrapper.find ( this.options.selectors.length );

      this._api = this.$table.DataTable ();

    }

    _init () {

      this.options.select = this.$table.data ( this.options.datas.select ) || this.options.select;

    }

    _events () {

      this.___keydown ();
      this.___select ();

    }

    _destroy () {

      this.$wrapper.remove ();

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( this.$wrapper, [$.$document, 'keydown', this.__keydown] );

    }

    /* SELECT */

    ___select () {

      if ( !_.isPlainObject ( this.options.select ) ) return;

      this._on ( true, 'draw.dt', this.__select );

    }

    __select ( event, data ) {

      this._defer ( function () { // So that Selectable's listeners get triggered first //FIXME: Ugly

        if ( this.$table.selectable ( 'get' ).length ) return;

        let column = this.options.select.column,
            values = this.options.select.values || [this.options.select.value],
            rows   = data.aoData.filter ( row => _.includes ( values, row._aData[column] ) );

        if ( !rows.length ) return;

        let trs = rows.map ( row => row.nTr );

        $(trs).addClass ( Widgets.Selectable.config.options.classes.selected );

        this.$table.trigger ( 'change' ); // In order to make other widgets (Selectable etc.) adjust for this

      });

    }

    /* API */

    api ( method, ...args ) {

      return this._api[method]( ...args );

    }

    page ( page, row ) { // `page` and `row` are 0-index numbers, `page` can optionally be a string supported by Datatables

      if ( !_.isString ( page ) ) {

        page = _.isNumber ( page ) && !_.isNaN ( page ) ? page : Math.floor ( row / this.$length.val () );

        if ( _.isNaN ( page ) ) return this.api ( 'page' );

        if ( page === this.api ( 'page' ) ) return;

      }

      this.api ( 'page', page );
      this.api ( 'draw', false );

    }

  }

  /* FACTORY */

  Factory.make ( DT, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.DataTable ));
