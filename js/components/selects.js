
/* SELECTS */

$.fn.selects = function () {

    return this.each ( function ( node ) {

        /* FUNCTIONS */

        var init_dropdown = function () {

            $body.append ( get_dropdown_html () );

            $dropdown = $('#dropdown-' + dropdown_id);
            $dropdown_container = $dropdown.find ( '.container' );

            $btn.addClass ( 'dropdown_trigger' ).data ( 'dropdown', 'dropdown-' + dropdown_id );

            $btn.dropdowns ({
                callbacks: {
                    before_open: set_dropdown_width
                }
            });

            $buttons = $dropdown.find ( '.button' );

            update_dropdown ();

        };

        var get_dropdown_html = function () {

            return '<div id="dropdown-' + dropdown_id + '" class="dropdown no_tip"><div class="container"><div class="multiple vertical">' + get_dropdown_options_html ( $select ) + '</div></div></div>';

        };

        var get_dropdown_options_html = function ( $parent ) {

            var html = '',
                $children = false;

            if ( $parent.is ( 'option' ) ) {

                html += '<div class="button actionable outlined tiny" data-value="' + $parent.attr ( 'value' ) + '">' + $parent.html () + '</div>';

            } else if ( $parent.is ( 'optgroup' ) ) {

                html += '<div class="separator_wrp"><div class="separator">' + $parent.attr ( 'label' ) + '</div></div>';

                $children = $parent.children ();

            } else if ( $parent.is ( 'select' ) ) {

                $children = $parent.children ();

            }

            if ( $children && $children.size () > 0 ) {

                $children.each ( function ( child ) {

                    var $child = $(child);

                    html += get_dropdown_options_html ( $child );

                });

            }

            return html;

        };

        var set_dropdown_width = function () {

            $dropdown_container.css ( 'min-width', $btn.outerWidth () + 'px' );

        };

        var update_dropdown = function () {

            $buttons.removeClass ( 'active' );

            $buttons.filter ( '[data-value="' + $select.val () + '"]' ).addClass ( 'active' );

        };

        var update_placeholder = function () {

            var selected_option = $options.filter ( '[value="' + $select.val () + '"]' );

            $placeholder.html ( selected_option.html () );

        };

        var update = function () {

            if ( !is_mobile ) {

                update_dropdown ();

            }

            update_placeholder ();

        };

        /* VARIABLES */

        var $btn = $(node),
            $select = $btn.find ( 'select' ),
            $options = $select.find ( 'option' ),
            $placeholder = $btn.find ( '.placeholder' ),
            dropdown_id = $.get_uuid (),

            $dropdown = false,
            $dropdown_container = false,
            $buttons = false;

        /* INIT */

        update_placeholder ();

        if ( !is_mobile ) {

            $select.hide ();

            init_dropdown ();

            $buttons.on ( 'click', function () {

                $button = $(this);

                $select.val ( $button.data ( 'value' ) ).trigger ( 'change' );

            });

        }

        $select.on ( 'change', update );

    });

};

/* READY */

$.dom_ready ( function () {

    $('.select').selects ();

});
