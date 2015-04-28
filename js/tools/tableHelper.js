
/* TABLE HELPER */

;(function ( $, window, document, undefined ) {

    $.factory ( 'table_helper', function () {

        var $table = this.$node,
            $thead = $table.find ( 'thead' ),
            $tbody = $table.find ( 'tbody' ),
            $headers = $thead.find ( 'th' ),
            $empty_row = $tbody.find ( 'tr.empty' ),
            columns_nr = $headers.length;

        var helper = {

            add: function () {

                var datas = Array.prototype.slice.call ( arguments, 1 );

                for ( var i = 0; i < datas.length; i++ ) {

                    var $fillables = $tbody.find ( 'td.fillable' );

                    if ( $fillables.length > 0 ) {

                        $fillables.first ().html ( datas[i] || '' ).removeClass ( 'fillable' );

                    } else {

                        if ( arguments[0] && $( '#rid_' + arguments[0] ).size () === 1 ) break;

                        var row_html = '<tr ' + ( arguments[0] ? 'id="rid_' + arguments[0] + '"' : '' ) + '>';

                        row_html += '<td>' + ( datas[i] || '' ) + '</td>';

                        for ( var fi = 1; fi < columns_nr; fi++ ) {

                            row_html += '<td class="fillable"></td>';

                        }

                        row_html += '</tr>';

                        $tbody.append ( row_html );

                    }

                }

                this.check_empty ();

                $table.trigger ( 'change' );

                return this;

            },

            update: function ( id ) {

                var datas = Array.prototype.slice.call ( arguments, 1 ),
                    $row = $( '#rid_' + id ),
                    $tds = $row.find ( 'td' );

                for ( var i = 0; i < datas.length; i++ ) {

                    if ( typeof datas[i] !== 'undefined' && datas[i] !== false ) {

                        $tds.eq ( i ).html ( datas[i] );

                    }

                }

                $table.trigger ( 'change' );

                return this;

            },

            remove: function ( id ) {

                $( '#rid_' + id ).remove ();

                this.check_empty ();

                $table.trigger ( 'change' );

                return this;

            },

            clear: function () {

                $tbody.find ( 'tr:not(.empty)' ).remove ();

                this.check_empty ();

                $table.trigger ( 'change' );

                return this;

            },

            check_empty: function () {

                $empty_row.toggleClass ( 'hidden', $tbody.find ( 'tr:not(.empty)' ).size () > 0 );

                return this;

            }

        };

        helper.check_empty ();

        return helper;

    });

}( lQuery, window, document ));
