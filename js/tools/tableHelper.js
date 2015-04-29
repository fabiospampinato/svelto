
/* TABLE HELPER */

;(function ( $, window, document, undefined ) {

    $.factory ( 'tableHelper', {

        /* SPECIAL */

        init: function () {

            this.$thead = this.$node.find ( 'thead' ),
            this.$tfoot = this.$node.find ( 'tfoot' ),
            this.$tbody = this.$node.find ( 'tbody' ),
            this.$headers = this.$thead.find ( 'th' ),
            this.$empty_row = this.$tbody.find ( 'tr.empty' ),
            this.columns_nr = this.$headers.length;

            this._check_empty ();

        },

        ready: function () {

            $('table').tableHelper ();

        },

        /* PRIVATE */

        _check_empty: function () {

            this.$empty_row.toggleClass ( 'hidden', this.$tbody.find ( 'tr:not(.empty)' ).length > 0 );

        },

        /* PUBLIC */

        add: function () {

            var datas = Array.prototype.slice.call ( arguments, 1 );

            for ( var i = 0; i < datas.length; i++ ) {

                var $fillables = this.$tbody.find ( 'td.fillable' );

                if ( $fillables.length > 0 ) {

                    $fillables.first ().html ( datas[i] || '' ).removeClass ( 'fillable' );

                } else {

                    if ( arguments[0] && $( '#rid_' + this.uuid + '_' + arguments[0] ).length === 1 ) break;

                    var row_html = '<tr ' + ( arguments[0] ? 'id="rid_' + this.uuid + '_' + arguments[0] + '"' : '' ) + '>';

                    row_html += '<td>' + ( datas[i] || '' ) + '</td>';

                    for ( var fi = 1; fi < this.columns_nr; fi++ ) {

                        row_html += '<td class="fillable"></td>';

                    }

                    row_html += '</tr>';

                    this.$tbody.append ( row_html );

                }

            }

            this._check_empty ();

            this.$node.trigger ( 'change' );

            return this;

        },

        update: function ( id ) {

            var datas = Array.prototype.slice.call ( arguments, 1 ),
                $row = $( '#rid_' + this.uuid + '_' + id ),
                $tds = $row.find ( 'td' );

            for ( var i = 0; i < datas.length; i++ ) {

                if ( !_.isUndefined ( datas[i] ) && datas[i] !== false ) {

                    $tds.eq ( i ).html ( datas[i] );

                }

            }

            this.$node.trigger ( 'change' );

            return this;

        },

        remove: function ( id ) {

            $( '#rid_' + this.uuid + '_' + id ).remove ();

            this._check_empty ();

            this.$node.trigger ( 'change' );

            return this;

        },

        clear: function () {

            this.$tbody.find ( 'tr:not(.empty)' ).remove ();

            this._check_empty ();

            this.$node.trigger ( 'change' );

            return this;

        }

    });

}( lQuery, window, document ));
