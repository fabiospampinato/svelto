
/* SELECT */

//TODO: Add support for selecting multiple options (with checkboxes maybe)
//FIXME: Doesn't work when the page is scrolled (check in the components/form)

;(function ( $, window, document, undefined ) {

    'use strict';

    /* SELECT */

    $.widget ( 'presto.select', {

        /* TEMPLATES */

        templates: {
            base: '<div id="dropdown-{%=o.id%}" class="dropdown no-tip">' +
                      '<div class="container">' +
                          '<div class="multiple vertical fluid">' +
                              '{% for ( var i = 0, l = o.options.length; i < l; i++ ) { %}' +
                                  '{% include ( "presto.select." + ( o.options[i].value ? "option" : "optgroup" ), o.options[i] ); %}' +
                              '{% } %}' +
                          '</div>' +
                      '</div>' +
                  '</div>',
            optgroup: '<div class="divider_wrp">' +
                          '<div class="divider">{%=o.prop%}</div>' +
                      '</div>',
            option: '<div class="button actionable outlined tiny" data-value="{%=o.prop%}">{%=o.value%}</div>'
       },

        /* OPTIONS */

        options: {
            callbacks: {
                open: $.noop,
                close: $.noop,
                change: $.noop
            }
        },

        /* SPECIAL */

        _create: function () {

            this.id = this.$element.data ( 'select' );
            this.$select = this.$element.find ( 'select' );
            this.$options = this.$select.find ( 'option' );
            this.select_options = [];
            this.$placeholder = this.$element.find ( '.placeholder' );

            this.$dropdown = false;
            this.$dropdown_container = false;
            this.$buttons = false;

            this._update_placeholder ();

            if ( !$.browser.isMobile ) {

                this.$select.addClass ( 'hidden' );

                this._init_select_options ();
                this._init_dropdown ();

                this._bind_button_click ();

            }

            this._bind_change ();

        },

        /* BUTTON CLICK */

        _bind_button_click: function () {

            this._on ( this.$buttons, 'click', this._handler_button_click );

        },

        _handler_button_click: function ( event, button ) {

            this.$select.val ( $(button).data ( 'value' ) ).trigger ( 'change' );

        },

        /* CHANGE */

        _bind_change: function () {

            this._on ( this.$select, 'change', function () {
                this.update ();
                this.options.callbacks.change ();
            });

        },

        /* PRIVATE */

        _init_select_options: function () { //FIXME: Add support for arbitrary number of optgroups levels

            var previous_optgroup,
                current_optgroup;

            for ( var i = 0, l = this.$options.length; i < l; i++ ) {

                var $option = this.$options.eq ( i ),
                    $parent = $option.parent ();

                if ( $parent.is ( 'optgroup' ) ) {

                    current_optgroup = $parent.attr ( 'label' );

                    if ( current_optgroup !== previous_optgroup ) {

                        previous_optgroup = current_optgroup;

                        this.select_options.push ({
                            prop: current_optgroup
                        });

                    }

                }

                this.select_options.push ({
                    value: $option.html (),
                    prop: $option.attr ( 'value' )
                });

            }

        },

        _init_dropdown: function () {

            var html = this._tmpl ( 'base', { id: this.id, options: this.select_options } );

            $body.append ( html );

            this.$dropdown = $('#dropdown-' + this.id);
            this.$dropdown_container = this.$dropdown.find ( '.container' );
            this.$buttons = this.$dropdown.find ( '.button' );

            this.$element.addClass ( 'dropdown-trigger' ).data ( 'dropdown', 'dropdown-' + this.id );

            var instance = this;

            this.$dropdown.dropdown ({
                callbacks: {
                    open: function () {
                        instance._set_dropdown_width.bind ( instance )();
                        instance.options.callbacks.open ();
                    },
                    close: instance.options.callbacks.close
                }
            });

            this._update_dropdown ();

        },

        _update_placeholder: function () {

            var $selected_option = this.$options.filter ( '[value="' + this.$select.val () + '"]' );

            this.$placeholder.html ( $selected_option.html () );

        },

        _update_dropdown: function () {

            this.$buttons.removeClass ( 'active' );

            this.$buttons.filter ( '[data-value="' + this.$select.val () + '"]' ).addClass ( 'active' );

        },

        _set_dropdown_width: function () {

            this.$dropdown_container.css ( 'min-width', this.$element.width () );

        },

        /* PUBLIC */

        select: function ( value ) {

            this.$buttons.filter ( '[data-value="' + value + '"]' ).click ();

        },

        update: function () {

            if ( !$.browser.isMobile ) {

                this._update_dropdown ();

            }

            this._update_placeholder ();

        }

    });

    /* READY */

    $(function () {

        $('.select-trigger').select ();

    });

}( lQuery, window, document ));
