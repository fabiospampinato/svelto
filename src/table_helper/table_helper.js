
/* =========================================================================
 * Svelto - Table Helper
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tableHelper',
    plugin: true,
    selector: 'table.table',
    templates: {
      row: '<tr {%= ( o.id ? "class=" + o.id : "" ) %} >' +
             '{% for ( var i = 0, l = o.datas.length; i < l; i++ ) { %}' +
               '<td>' +
                 '{%=o.datas[i]%}' +
               '</td>' +
             '{% } %}' +
             '{% for ( var i = 0, l = o.missing; i < l; i++ ) { %}' +
               '<td></td>' +
             '{% } %}' +
           '</tr>'
    },
    options: {
      rowIdPrefix: 'rid',
      selectors: {
        header: 'thead',
        body: 'tbody',
        headerCell: 'th',
        rowCell: 'td',
        emptyRow: 'tr.table-row-empty',
        notEmptyRow: 'tr:not(.table-row-empty)'
      },
      callbacks: {
        add: _.noop,
        update: _.noop,
        remove: _.noop,
        clear: _.noop
      }
    },
  };

  /* TABLE HELPER */

  class TableHelper extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$table = this.$element;
      this.$header = this.$table.find ( this.options.selectors.header );
      this.$body = this.$table.find ( this.options.selectors.body );
      this.$headerCells = this.$header.find ( this.options.selectors.headerCell );
      this.$emptyRow = this.$body.find ( this.options.selectors.emptyRow );

      this.columnsNr = this.$headerCells.length;

    }

    _init () {

      this._checkEmpty ();

    }

    /* PRIVATE */

    _checkEmpty () {

      let hasNonEmptyRows = this.$body.find ( this.options.selectors.notEmptyRow ).length > 0;

      this.$emptyRow.toggleClass ( this.options.classes.hidden, hasNonEmptyRows );

    }

    _getRowId ( id ) {

      return this.options.rowIdPrefix + '_' + this.guid + '_' + id;

    }

    /* PUBLIC */

    add ( id, ...datas ) {

      let rowId = id ? this._getRowId ( id ) : false;

      if ( datas.length > 0 ) {

        if ( rowId && $( '.' + rowId ).length === 1 ) return this;

        let chunks = _.chunk ( datas, this.columnsNr ),
            $rows = $empty;

        for ( let chunk of chunks ) {

          let rowHtml = this._tmpl ( 'row', { id: rowId, datas: chunk, missing: this.columnsNr - chunk.length } );

          $rows = $rows.add ( rowHtml );

        }

        this.$body.append ( $rows );

        this._checkEmpty ();

        this.$table.trigger ( 'change' );

        this._trigger ( 'add', {
          $rows: $rows
        });

      }

    }

    update ( id, ...datas ) {

      let $row = $( '.' + this._getRowId ( id ) );

      if ( datas.length > 0 && $row.length === 1 ) {

        let $rowCells = $row.find ( this.options.selectors.rowCell );

        for ( let i = 0, l = datas.length; i < l; i++ ) {

          if ( _.isString ( datas[i] ) ) {

            $rowCells.eq ( i ).html ( datas[i] );

          }

        }

        this.$table.trigger ( 'change' );

        this._trigger ( 'update', {
          $row: $row
        });

      }

    }

    remove ( id ) {

      let $row = $( '.' + this._getRowId ( id ) );

      if ( $row.length === 1 ) {

        $row.remove ();

        this._checkEmpty ();

        this.$table.trigger ( 'change' );

        this._trigger ( 'remove', {
          $row: $row
        });

      }

    }

    clear () {

      let $rows = this.$body.find ( this.options.selectors.notEmptyRow );

      if ( $rows.length > 0 ) {

        $rows.remove ();

        this._checkEmpty ();

        this.$table.trigger ( 'change' );

        this._trigger ( 'clear', {
          $rows: $rows
        });

      }

    }

  }

  /* FACTORY */

  $.factory ( TableHelper, config, Svelto );

}( Svelto.$, Svelto._, window, document ));
