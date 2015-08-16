
/* NOTY */

//TODO: add support for swipe to dismiss in mobile and touchscreen enabled devices

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* VARIABLES */

    var timers = [];

    /* HELPER */

    $.noty = function ( custom_options ) {

        // EXTEND

        var options = {
            autoplay: true
        };

        if ( _.isString ( custom_options ) ) {

            options.body = custom_options;

        } else if ( _.isPlainObject ( custom_options ) ) {

            $.extend ( options, custom_options );

        }

        if ( options.buttons ) {

            options.type = 'action';

        }

        // NOTY

        var noty = new $.presto.noty ( options );

        if ( options.autoplay ) {

            noty.open ();

        }

        return noty;

    };

    /* NOTY */

    $.widget ( 'presto.noty', {

        /* TEMPLATES */

        templates: {
            base: '<div class="noty container {%=o.type%} {%=o.color%} {%=o.css%}">' + //TODO: add back transparentize
                      '<div class="container-content">' +
                          '<div class="infobar-wrp inset {%=o.color%}">' + //TODO: add back transparentize
                              '{% if ( o.img ) include ( "presto.noty.img", o.img ); %}' +
                              '<div class="infobar-center">' +
                                  '{% if ( o.title ) include ( "presto.noty.title", o.title ); %}' +
                                  '{% if ( o.body ) include ( "presto.noty.body", o.body ); %}' +
                              '</div>' +
                              '{% if ( o.buttons.length === 1 ) include ( "presto.noty.single_button", o.buttons[0] ); %}' +
                          '</div>' +
                          '{% if ( o.buttons.length > 1 ) include ( "presto.noty.buttons", o.buttons ); %}' +
                      '</div>' +
                  '</div>',
            img: '<div class="noty-img infobar-left">' +
                     '<img src="{%=o%}" class="smooth" />' +
                 '</div>',
            title: '<p class="infobar-title large">' +
                       '{%#o%}' +
                   '</p>',
            body: '{%#o%}',
            single_button: '<div class="infobar-right">' +
                               '{% include ( "presto.noty.button", o ); %}' +
                           '</div>',
            buttons: '<div class="noty-buttons multiple-wrp centered">' +
                         '<div class="multiple">' +
                             '{% for ( var i = 0; i < o.length; i++ ) { %}' +
                                 '{% include ( "presto.noty.button", o[i] ); %}' +
                             '{% } %}' +
                         '</div>' +
                     '</div>',
            button: '<div class="label-wrp button-wrp">' +
                        '<div class="label actionable {%=(o.color || "white")%} {%=(o.size || "xsmall")%} {%=(o.css || "")%}">' +
                            '<div class="label-center">' +
                                '{%#(o.text || "")%}' +
                            '</div>' +
                        '</div>' +
                    '</div>'
        },

        /* OPTIONS */

        options: {
            anchor: {
                y: 'bottom',
                x: 'left'
            },

            delay: {
                remove: 200
            },

            title: false,
            body: false,
            img: false,
            buttons: [],
            /*
                   : [{
                          color: 'white',
                          size: 'xsmall',
                          css: '',
                          text: '',
                          onClick: $.noop
                     }],
            */

            type: 'alert',
            color: 'black',
            css: '',

            ttl: 3500,

            callbacks: {
                open: $.noop,
                close: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$noty = this.$element;
            this.timer = false;

            this.isOpen = false;
            this.neverOpened = true;

        },

        /* PRIVATE */

        _init_click: function () {

            if ( !this.options.buttons.length ) {

                this._on ( 'click', this.close );

            }

        },

        _init_buttons_click: function () {

            if ( this.options.buttons.length ) {

                var $buttons = this.$noty.find ( '.button-wrp .label' ),
                    instance = this;

                _.each ( this.options.buttons, function ( button, index ) {

                    var $button = $buttons.eq ( index ); //FIXME: it will not work if we add a button to the body manually

                    $button.on ( 'click', function ( event ) {

                        if ( button.onClick ) button.onClick.call ( this, event );

                        instance.close ();

                    });

                });

            }

        },

        _init_timer: function () {

            if ( this.options.buttons.length === 0 && this.options.ttl !== 'forever' ) {

                this.timer = $.timer ( this.close.bind ( this ), this.options.ttl, true );

                timers.push ( this.timer );

            }

        },

        _init_hover: function () {

            this.$noty.hover ( function () {

                _.each ( timers, function ( timer ) {

                    timer.pause ();

                });

            }, function () {

                _.each ( timers, function ( timer ) {

                    timer.remaining ( Math.max ( 1000, timer.remaining () || 0 ) );

                    timer.play ();

                });

            });

        },

        /* PUBLIC */

        open: function () {

            if ( !this.isOpen ) {

                $('.noty-queues.' + this.options.anchor.y + ' .noty-queue.' + this.options.anchor.x).first ().append ( this.$noty );

                $.reflow ();

                this.$noty.addClass ( 'active' );

                if ( this.neverOpened ) {

                    this._init_click ();
                    this._init_buttons_click ();
                    this._init_hover ();

                    this.neverOpened = false;

                }

                this._init_timer ();

                this._trigger ( 'open' );

                this.isOpen = true;

            }

        },

        close: function () {

            if ( this.timer ) {

                _.pull ( timers, this.timer );

                this.timer.stop ();

            }

            this.$noty.removeClass ( 'active' );

            this._delay ( function () {

                this.$noty.remove ();

            }, this.options.delay.remove );

            this._trigger ( 'close' );

            this.isOpen = false;

        }

    });

    /* READY */

    $(function () {

        $body.append (
            '<div class="noty-queues top">' +
                '<div class="noty-queue expanded"></div>' +
                '<div class="noty-queues-row">' +
                    '<div class="noty-queue left"></div>' +
                    '<div class="noty-queue center"></div>' +
                    '<div class="noty-queue right"></div>' +
                '</div>' +
            '</div>' +
            '<div class="noty-queues bottom">' +
                '<div class="noty-queues-row">' +
                    '<div class="noty-queue left"></div>' +
                    '<div class="noty-queue center"></div>' +
                    '<div class="noty-queue right"></div>' +
                '</div>' +
                '<div class="noty-queue expanded"></div>' +
            '</div>'
        );

    });

}( jQuery, _, window, document ));
