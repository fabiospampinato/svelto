
/* TAGBOX */

//TODO: add the tag pointer
//TODO: add support for adding and removing tags by passing: single tag string, single tags string separated by separator, array of tags, multiple parameters
//FIXME: do we handle the insertion of characters like `&` or `'` propertly?
//FIXME: should be forbid characters or just escape them?

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* TAGBOX */

    $.widget ( 'presto.tagbox', {

        /* TEMPLATES */

        templates: {
            tag: '<div class="multiple-wrp joined tagbox-tag" data-tag-value="{%=o.str%}">' +
                     '<div class="multiple">' +
                         '<div class="label-wrp">' +
                             '<div class="label compact {%=(o.color ? o.color : "")%} {%=(o.size ? o.size : "")%} {%=(o.css ? o.css : "")%}">' +
                                 '<div class="label-center">' +
                                     '{%=o.str%}' +
                                     '<div class="icon icon-navigation-close right tagbox-tag-remover"></div>' +
                                 '</div>' +
                             '</div>' +
                         '</div>' +
                     '</div>' +
                 '</div>'
        },

        /* OPTIONS */

        options: {
            tags: {
                init: '',
                str: '',
                arr: []
            },
            tag: {
                min_length: 3,
                color: '',
                size: 'small',
                css: 'outlined'
            },
            characters: {
                forbidden: [ '<', '>', ';', '`' ], //FIXME: add tab, enter, and all the other specials
                separator: ',', //INFO: It will also become kind of a forbidden character, used for insertion
                inserters: [$.ui.keyCode.ENTER, $.ui.keyCode.TAB], //TODO: write them as string, so they are easier to edit and that's the format that the user expects
            },
            sort: false, //INFO: The tags are displayed in sorted order
            escape: true, //INFO: Escape potential XSS characters
            deburr: false, //INFO: Replace non latin basic letters
            callbacks: {
                update: $.noop,
                add: $.noop,
                remove: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$tagbox = this.$element;

            var $inputs = this.$tagbox.find ( 'input' );

            this.$input = $inputs.eq ( 0 );
            this.$partial = $inputs.eq ( 1 );
            this.partial = this.$partial.get ( 0 );

            this.$partial_wrp = this.$partial.parent ( '.input-wrp' );

        },

        _init: function () {

            this.add ( this.options.tags.init );

        },

        _events: function () {

            /* PARTIAL */

            this._on ( this.$partial, 'keypress keydown', this._handler_keypress_keydown ); //INFO: `keypress` is for printable characters, `keydown` for the others

            this._on ( this.$partial, 'paste', this._handler_paste );

            /* ON EMPTY */

            this._on ( 'click', this._handler_click_on_empty );

            /* TAG */

            this._on ( 'click', '.tagbox-tag-remover', this._handler_click_on_tag_remover );

        },

        /* PRIVATE */

        _get_tag_html: function ( tag_str ) {

            return this._tmpl ( 'tag', _.merge ( { str: tag_str }, this.options.tag ) );

        },

        _update_tags_str: function () {

            this.options.tags.str = this.options.tags.arr.join ( this.options.characters.separator );

        },

        _sanitize_tag_str: function ( tag_str ) {

            tag_str = _.trim ( tag_str );

            if ( this.options.escape ) {

                tag_str = _.escape ( tag_str );

            }

            if ( this.options.deburr ) {

                tag_str = _.deburr ( tag_str );

            }

            return tag_str;

        },

        _update_input: function () {

            this.$input.val ( this.options.tags.str ).trigger ( 'change' );

        },

        _clear_partial: function () {

            this.$partial.val ( '' ).trigger ( 'change' );

        },

        /* TAG */

        _partial_add_tag: function ( tag_str ) {

            var tag_str_trimmed = _.trim ( tag_str ),
                tag_str = this._sanitize_tag_str ( tag_str );

            if ( tag_str_trimmed.length < this.options.tag.min_length ) {

                if ( tag_str_trimmed.length > 0 ) { //INFO: So it won't be triggered when the user presses enter and the $partial is empty

                    $.noty ( '`' + tag_str + '` is shorter than ' + this.options.tag.min_length + ' characters' );

                }

            } else if ( _.contains ( this.options.tags.arr, tag_str ) ) {

                $.noty ( '`' + tag_str + '` is a duplicate' );

            } else {

                this.options.tags.arr.push ( tag_str );

                if ( this.options.sort ) {

                    this.options.tags.arr.sort ();

                }

                var tag_html = this._get_tag_html ( tag_str );

                if ( this.options.tags.arr.length === 1 || !this.options.sort ) {

                    this.$partial_wrp.before ( tag_html );

                } else {

                    var index = this.options.tags.arr.indexOf ( tag_str );

                    if ( index === 0 ) {

                        this.$tagbox.find ( '.tagbox-tag' ).first ().before ( tag_html );

                    } else {

                        this.$tagbox.find ( '.tagbox-tag' ).eq ( index - 1 ).after ( tag_html );

                    }

                }

                return true;

            }

            return false;

        },

        _partial_remove_tag: function ( $tag, tag_str ) {

            $tag.remove ();

            _.pull ( this.options.tags.arr, tag_str );

        },

        /* KEYPRESS */

        _handler_keypress_keydown: function ( event ) {

            var tag_str = this.$partial.val ();

            if ( _.contains ( this.options.characters.inserters, event.keyCode ) || event.keyCode === this.options.characters.separator.charCodeAt ( 0 ) ) {

                var added = this.add ( tag_str );

                if ( added ) {

                    this._clear_partial ();

                }

                event.preventDefault ();

            } else if ( event.keyCode === $.ui.keyCode.BACKSPACE ) {

                if ( tag_str.length === 0 && this.options.tags.arr.length > 0 ) {

                    var $tag = this.$tagbox.find ( '.tagbox-tag' ).last (),
                        edit = !( ( $.browser.isMac && event.metaKey ) || ( !$.browser.isMac && event.ctrlKey ) ); //INFO: With `ctrl` not on a Mac or `cmd` on Mac: remove it completelly, otherwise: copy it to the input

                    this.remove ( $tag, edit );

                    event.preventDefault ();

                }

            } else if ( _.contains ( this.options.characters.forbidden, String.fromCharCode ( event.keyCode ) ) ) {

                $.noty ( 'The character you entered is forbidden' );

                event.preventDefault ();

            }

        },

        /* PASTE */

        _handler_paste: function ( event ) {

            this._delay ( function () { //FIXME: is it necessary?

                this.add ( this.$partial.val () );

                this._clear_partial ();

            });

        },

        /* CLICK ON CLOSE */

        _handler_click_on_tag_remover: function ( event, tag_remover ) {

            var $tag = $(tag_remover).parents ( '.tagbox-tag' );

            this.remove ( $tag );

        },

        /* CLICK ON EMPTY */

        _handler_click_on_empty: function ( event ) {

            if ( document.activeElement !== this.partial && !$(event.target).is ( 'input, .tagbox-tag-label' ) ) {

                this.$partial.focus ();

            }

        },

        /* PUBLIC */

        get: function () {

            return this.options.tags.str;

        },

        add: function ( tags_str ) {

            var tags = tags_str.split ( this.options.characters.separator ),
                adds = [];

            for ( var i = 0, l = tags.length; i < l; i++ ) {

                adds.push ( this._partial_add_tag ( tags[i] ) );

            }

            var added = ( _.compact ( adds ).length > 0 );

            if ( added ) {

                this._update_tags_str ();
                this._update_input ();

            }

            return added;

        },

        remove: function ( tags_str, edit ) {

            if ( tags_str instanceof jQuery ) {

                var tags_obj = [tags_str],
                    tags = [tags_str.data ( 'tag-value' )];

            } else {

                var tags_obj = [],
                    tags = [];

                tags_str = tags_str.split ( this.options.characters.separator );

                for ( var i = 0, l = tags_str.length; i < l; i++ ) {

                    var tag_str = this._sanitize_tag_str ( tags_str[i] ),
                        $tag = this.$tagbox.find ( '.tagbox-tag[data-tag-value="' + tag_str + '"]');

                    if ( $tag.length ) {

                        tags_obj.push ( $tag );
                        tags.push ( tag_str );

                    }

                }

            }

            if ( tags_obj.length ) {

                for ( var i = 0, l = tags_obj.length; i < l; i++ ) {

                    this._partial_remove_tag ( tags_obj[i], tags[i] );

                }

                this._update_tags_str ();
                this._update_input ();

                if ( l === 1 && edit === true ) {

                    this.$partial.val ( tags[0] ).trigger ( 'change' );

                }

            }

        },

        clear: function () {

            if ( this.options.tags.arr.length ) {

                this.options.tags.str = '';
                this.options.tags.arr = [];

                this.$tagbox.find ( '.tagbox-tag' ).remove ();

                this._clear_partial ();

                this._update_input ();

            }

        },

        reset: function () {

            this.clear ();

            this._init ();

        }

    });

    /* READY */

    $(function () {

        $('.tagbox').each ( function () {

            var $tagbox = $(this),
                $input = $tagbox.find ( 'input' ).eq ( 0 ),
                options = {
                    tags: {
                        init: $input.val (),
                        str: '',
                        arr: []
                    }
                };

            $tagbox.tagbox ( options );

        });

    });

}( jQuery, _, window, document ));
