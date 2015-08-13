
/* TABLE HELPER */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* TABLE HELPER */

    $.widget ( 'presto.tableHelper', {

        /* SPECIAL */

        _variables: function () {

            this.$table = this.$element;
            this.$thead = this.$table.find ( 'thead' ),
            this.$tfoot = this.$table.find ( 'tfoot' ),
            this.$tbody = this.$table.find ( 'tbody' ),
            this.$headers = this.$thead.find ( 'th' ),
            this.$empty_row = this.$tbody.find ( 'tr.empty' ),
            this.columns_nr = this.$headers.length;

        },

        _init: function () {

            this._check_empty ();

        },

        /* PRIVATE */

        _check_empty: function () {

            this.$empty_row.toggleClass ( 'hidden', this.$tbody.find ( 'tr:not(.empty)' ).length > 0 );

        },

        _get_row_id: function ( id ) {

            return 'rid_' + this.uuid + '_' + id;

        },

        /* PUBLIC */

        add: function ( id ) { //INFO: id, datas...

            var datas = _.tail ( arguments );

            if ( datas.length ) {

                var $fillables = this.$tbody.find ( 'td.fillable' );

                if ( $fillables.length ) {

                    var datas_fillable = _.slice ( datas, 0, $fillables.length );

                    datas = _.slice ( datas, datas_fillable.length - 1, datas.length );

                    for ( var i = 0, l = datas_fillable.length; i < l; i++ ) {

                        $fillables.eq ( i ).html ( datas_fillable[i] ).removeClass ( 'fillable' );

                    }

                }

                if ( id && $( '.' + this._get_row_id ( id ) ).length ) {

                    $.noty ( 'A table cannot contain 2 rows with the same ID' );
                    return this;

                };

                var chunks = _.chunk ( datas, this.columns_nr );

                for ( var ci = 0, cl = chunks.length; ci < cl; ci++ ) {

                    var chunk = chunks[ci];

                    var row_html = '<tr ' + ( id ? 'class="' + this._get_row_id ( id ) + '"' : '' ) + '>';

                    for ( var i = 0, l = chunk.length; i < l; i++ ) {

                        row_html += '<td>' + ( chunk[i] || '' ) + '</td>';

                    }

                    for ( var i = chunk.length, l = this.columns_nr; i < l; i++ ) {

                        row_html += '<td class="fillable"></td>';

                    }

                    row_html += '</tr>';

                    this.$tbody.append ( row_html );

                }

                this._check_empty ();

                this.$table.trigger ( 'change' );

            }

            return this;

        },

        update: function ( id ) { //INFO: id, datas...

            var datas = _.tail ( arguments ),
                $row = $( '.' + this._get_row_id ( id ) );

            if ( datas.length && $row.length ) {

                var $tds = $row.find ( 'td' );

                _.each ( datas, function ( data, index ) {

                    if ( _.isString ( data ) ) {

                        $tds.eq ( index ).html ( data );

                    }

                });

                this.$table.trigger ( 'change' );

            }

            return this;

        },

        remove: function ( id ) {

            var $row = $( '.' + this._get_row_id ( id ) );

            if ( $row.length ) {

                $row.remove ();

                this._check_empty ();

                this.$table.trigger ( 'change' );

            }

            return this;

        },

        clear: function () {

            var $rows = this.$tbody.find ( 'tr:not(.empty)' );

            if ( $rows.length ) {

                $rows.remove ();

                this._check_empty ();

                this.$table.trigger ( 'change' );

            }

            return this;

        }

    });

    /* READY */

    $(function () {

        $('table').tableHelper ();

    });

}( jQuery, _, window, document ));
