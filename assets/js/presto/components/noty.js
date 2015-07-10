
/* NOTY */

//TODO: add support for swipe to dismiss

;(function ( $, window, document, undefined ) {

    'use strict';

    /* VARIABLES */

    var timers = [];

    /* HELPER */

    $.noty = function ( custom_options ) {

        // EXTEND

        var options = {};

        if ( _.isString ( custom_options ) ) {

            options.body = custom_options;

        } else if ( _.isPlainObject ( custom_options ) ) {

            $.extend ( options, custom_options );

        }

        if ( options.buttons ) options.type = 'action';

        // NOTY

        var noty = new $.presto.noty ( options ); //FIXME: It should be instantiated on an empty object I think, otherwise we always have to type the namespace

        noty.open ();

        return noty;

    };

    /* NOTY */

    $.widget ( 'presto.noty', {

        //FIXME: buttons are not showing properly

        /* TEMPLATES */

        templates: {
            base: '<div class="noty_wrp hidden">' +
                      '<div class="noty container transparentize {%=o.type%} {%=o.color%} {%=o.css%}">' +
                          '<div class="infobar-wrp transparent">' +
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
            img: '<div class="noty_img infobar-left">' +
                     '<img src="{%=o%}" class="smooth" />' +
                 '</div>',
            title: '<p class="infobar-title large">' +
                       '{%#o%}' +
                   '</p>',
            body: '{%#o%}',
            single_button: '<div class="infobar-right">' +
                               '{% include ( "presto.noty.button", o ); %}' +
                           '</div>',
            buttons: '<div class="noty_buttons multiple centered">' +
                        '{% for ( var i = 0; i < o.length; i++ ) { %}' +
                            '{% include ( "presto.noty.button", o[i] ); %}' +
                        '{% } %}' +
                     '</div>',
            button: '<div class="button actionable {%=(o.color || "white")%} {%=(o.size || "tiny")%} {%=(o.css || "")%}">' +
                        '{%#(o.text || "")%}' +
                    '</div>'
        },

        /* OPTIONS */

        options: {
            anchor: 'bottom-left',

            title: false,
            body: false,
            img: false,
            buttons: [],
            /*
                   : [{
                          color: 'white',
                          size: 'tiny',
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

        _create: function () {

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

                var $buttons = this.$element.find ( '.button' ),
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

            this.$element.hover ( function () {

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

                $('.noty_queue.' + this.options.anchor).first ().append ( this.$element );

                this.$element.removeClass ( 'hidden' );

                $.reflow ();

                this.$element.addClass ( 'active' );

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

            this.$element.removeClass ( 'active' );

            this._delay ( function () {

                this.$element.remove ();

            }, 200 );

            this._trigger ( 'close' );

            this.isOpen = false;

        }

    });

    /* READY */

    $(function () {

        $body.append ( '<div class="noty_queue top-left"></div><div class="noty_queue top-right"></div><div class="noty_queue bottom-left"></div><div class="noty_queue bottom-right"></div>' );

    });

}( lQuery, window, document ));
