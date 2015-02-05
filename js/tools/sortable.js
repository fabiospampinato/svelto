
/* SORTABLE */

//TODO: only do the minimum amount of changes, if a row is added we don't need to resort the whole table

$.fn.sortable = function ( options ) {

    var sort_fns = _.merge ({
        'int': function ( a, b ) {
            return parseInt ( a, 10 ) - parseInt ( b, 10 );
        },
        'float': function ( a, b ) {
            return parseFloat ( a ) - parseFloat ( b );
        },
        'string': function ( a, b ) {
            a = a.toLocaleLowerCase ();
            b = b.toLocaleLowerCase ();
            return a.localeCompare ( b );
        }
    }, options );

    return this.each ( function ( node ) {

        /* FUNCTIONS */

        var sort = function ( $sortable, direction ) {

            var col_index = $headers.index ( $sortable ),
                sort_fn = sort_fns[$sortable.data ( 'sort' )];

            if ( !sort_fn ) return;

            $sortables.removeClass ( 'asc desc' );
            $sortable.addClass ( direction );

            var column = [],
                $trs = $tbody.find ( 'tr:not(.empty)' );

            // populate

            $trs.each ( function ( tr ) {

                var $td = $(tr).find ( 'td' ).eq ( col_index ),
                    val = $td.data ( 'sort-value' ) || $td.text ();

                column.push ( [tr, val] );

            });

            // sort

            column.sort ( function ( a, b ) {

                return sort_fn ( a[1], b[1] );

            });

            if ( direction === 'desc' ) column.reverse ();

            // append

            var tbody = $tbody.get ( 0 ),
                table = $table.get ( 0 );

            table.removeChild ( tbody );

            for ( var i = 0; i < column.length; i++ ) {

                tbody.appendChild ( column[i][0] );

            }

            table.appendChild ( tbody );

            // trigger

            $table.trigger ( 'sort' );

        };

        /* VARIABLES */

        var $table = $(node),
            $headers = $table.find ( 'thead th' ),
            $sortables = $headers.filter ( '[data-sort]' ),
            $tbody = $table.find ( 'tbody' ),

            $current_sortable = false,
            current_direction = false;

        /* EVENTS */

        $table.on ( 'change', function () {

            if ( $current_sortable ) {

                sort ( $current_sortable, current_direction );

            }

        });

        $sortables.each ( function ( node ) {

            var $sortable = $(node);

            $sortable.on ( 'click', function () {

                current_direction = ( $current_sortable === $sortable )
                                        ? ( !current_direction || current_direction === 'desc' ) //FIXME: if !current_direction sortare o asc, o se giá é asc usare desc
                                            ? 'asc'
                                            : 'desc'
                                        : 'asc';

                $current_sortable = $sortable;

                sort ( $current_sortable, current_direction );

            });

        });

    });

};

/* READY */

$.dom_ready ( function () {

    $('table.sortable').sortable ();

});
