
/* SELECTS */

;(function ( $, window, document, undefined ) {

    $.factory ( 'selects', {



    }, {

        /* UTILITIES */

        /* SPECIAL */

        init: function () {

            this.$select = this.$node.find ( 'select' );
            this.$options = this.$select.find ( 'option' );
            this.$placeholder = this.$node.find ( '.placeholder' );
            this.dropdown_id = $.getUID ();

            this.$dropdown = false;
            this.$dropdown_container = false;
            this.$buttons = false;

            this._update_placeholder ();

            if ( $.browser.is_mobile ) {

                this.$select.hide ();

                this._init_dropdown ();

                this.$buttons.on ( 'click', this._handler_click );

            }

            this.$select.on ( 'change', this.update );

        },

        ready: function () {

            $('.select').selects ();

        },

        /* PRIVATE */

        _handler_click: function ( event ) {

            var $button = $(this);

            this.$select.val ( $button.data ( 'value' ) ).trigger ( 'change' );

        },

        _init_dropdown: function () {

            $body.append ( this._get_dropdown_html () );

            this.$dropdown = $('#dropdown-' + this.dropdown_id);
            this.$dropdown_container = this.$dropdown.find ( '.container' );

            this.$node.addClass ( 'dropdown_trigger' ).data ( 'dropdown', 'dropdown-' + this.dropdown_id );

            this.$node.dropdowns ({
                beforeOpen: this._set_dropdown_width
            });

            this.$buttons = this.$dropdown.find ( '.button' );

            this._update_dropdown ();

        },

        _get_dropdown_html: function () {

            return '<div id="dropdown-' + this.dropdown_id + '" class="dropdown no_tip"><div class="container"><div class="multiple vertical">' + this._get_dropdown_options_html ( this.$select ) + '</div></div></div>';

        },

        _get_dropdown_options_html: function ( $parent ) {

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

            if ( $children && $children.length > 0 ) {

                for ( var i = 0, l = $children.length; i < l; i++ ) {

                    html += this.get_dropdown_options_html ( $children.nodes[i] );

                }

            }

            return html;

        },

        _update_dropdown: function () {

            this.$buttons.removeClass ( 'active' );

            this.$buttons.filter ( '[data-value="' + this.$select.val () + '"]' ).addClass ( 'active' );

        },

        _set_dropdown_width: function () {

            this.$dropdown_container.css ( 'min-width', this.$node.width () );

        },

        _update_placeholder: function () {

            var $selected_option = this.$options.filter ( '[value="' + this.$select.val () + '"]' );

            this.$placeholder.html ( $selected_option.html () );

        },

        /* PUBLIC */

        update: function () {

            if ( !$.browser.is_mobile ) {

                this._update_dropdown ();

            }

            this._update_placeholder ();

        }


    });

}( lQuery, window, document ));
