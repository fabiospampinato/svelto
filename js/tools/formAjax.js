
/* FORM AJAX */

;(function ( $, window, document, undefined ) {

    'use strict';

    $.factory ( 'presto.formAjax', {

        /* SPECIAL */

        _ready: function () {

            $('form.ajax').formAjax ();

        },

        _create: function () {

            var $form = this.$element;

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

                                $.noty ( 'Done! Refreshing the page...' );

                                location.reload ();

                            } else if ( /^((\S*)?:\/\/)?\/?\S*$/.test ( res ) ) { //INFO: Is an url, either absolute or relative

                                if ( res === window.location.href || res === window.location.pathname ) {

                                    $.noty ( 'Done! Refreshing the page...' );

                                    location.reload ();

                                } else {

                                    $.noty ( 'Done! Redirecting...' );

                                    location.assign ( res );

                                }

                            } else if ( res[0] === '<') { //INFO: Is HTML

                                $.noty ( 'Done! A page refresh may be needed to see the changes' );

                                $body.append ( res );

                            } else {

                                $.noty ( res );

                            }

                        } else {

                            noty ( 'Done! A page refresh may be needed to see the changes' );

                        }

                    },
                    error: function ( res ) {

                        if ( typeof res === 'string' ) {

                            if ( res[0] === '<' ) { //INFO: Is HTML

                                $.noty ( 'There was an error, please try again or report the problem' );

                                $body.append ( res );

                            } else {

                                $.noty ( res );

                            }

                        } else {

                            $.noty ( 'There was an error, please try again or report the problem' );

                        }

                    }
                });

            });

        }

    });

}( lQuery, window, document ));
