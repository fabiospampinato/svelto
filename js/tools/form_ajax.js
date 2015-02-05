
/* FORM AJAX */

$.fn.form_ajax = function () {

    return this.each ( function ( node ) {

        var $form = $(node);

        $form.on ( 'submit', function ( event ) {

            event.preventDefault ();

            $.ajax ({
                type: $form.attr ( 'method' ) || 'POST',
                url: $form.attr ( 'action' ),
                data: new FormData ( $form.get ( 0 ) ),
                before: function () {
                    $form.loading ( true );
                },
                after: function () {
                    $form.loading ( false );
                },
                success: function ( res ) {

                    if ( typeof res === 'string' ) {

                        if ( res === 'refresh' ) {

                            noty ( 'Done! Refreshing the page...' );
                            location.reload ();

                        } else if ( /^((\S*)?:\/\/)?\/?\S*$/.test ( res ) ) { // is an url, either absolute or relative

                            if ( res === window.location.href || res === window.location.pathname ) {

                                noty ( 'Done! Refreshing the page...' );
                                location.reload ();

                            } else {

                                noty ( 'Done! Redirecting...' );
                                location.assign ( res );

                            }

                        } else if ( res.indexOf ( '<' ) !== -1 ) { // is HTML

                            noty ( 'Done! A page refresh may be needed to see the changes' );
                            $body.append ( res );

                        } else {

                            noty ( res );

                        }

                    } else {

                        noty ( 'Done! A page refresh may be needed to see the changes' );

                    }

                },
                error: function ( res ) {

                    if ( typeof res === 'string' ) {

                        if ( res.indexOf ( '<' ) !== -1 ) { // is HTML

                            noty ( 'There was an error, please try again or report the problem' );
                            $body.append ( res );

                        } else {

                            noty ( res );

                        }

                    } else {

                        noty ( 'There was an error, please try again or report the problem' );

                    }

                }
            });

        });

    });

};

/* READY */

$.dom_ready ( function () {

    $('form[data-ajax]').form_ajax ();

});
