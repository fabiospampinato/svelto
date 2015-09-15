
/* =========================================================================
 * Svelto - Tagbox v0.3.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * @requires ../noty/noty.js
 * ========================================================================= */

//FIXME: Do we handle the insertion of characters like `&` or `'` propertly?
//FIXME: Should we forbid characters or just escape them?
//FIXME: If we disable the escaping, does it break using characters like `"`? `It does, at leas when calling `remove`
//FIXME: Partial's text cursor is not visible whan it's empty

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TAGBOX */

  $.factory ( 'svelto.tagbox', {

    /* TEMPLATES */

    templates: {
      tag: '<div class="label-tag tagbox-tag" data-tag-value="{%=o.value%}">' +
              '<div class="label {%=o.color%} {%=o.size%} {%=o.css%}">' +
                '<span>' +
                  '{%=o.value%}' +
                '</span>' +
                '<div class="sub right gray actionable tagbox-tag-remover">' +
                  '<i class="icon">close</i>' +
                '</div>' +
              '</div>' +
            '</div>'
    },

    /* OPTIONS */

    options: {
      init: '',
      tags: [],
      tag: {
        minLength: 3,
        color: '',
        size: '',
        css: 'outlined'
      },
      characters: {
        forbidden: [ '<', '>', ';', '`' ],
        separator: ',', //INFO: It will also become kind of a forbidden character, used for insertion
        inserters: [$.ui.keyCode.ENTER, $.ui.keyCode.TAB] //INFO: They are keyCodes
      },
      sort: false, //INFO: The tags will be outputted in alphanumeric-sort order
      escape: true, //INFO: Escape potential XSS characters
      deburr: false, //INFO: Replace non basic-latin characters
      selectors: {
        input: 'input.hidden',
        partial: 'input.tagbox-partial, .tagbox-partial input',
        tags: '.tagbox-tags',
        tag: '.tagbox-tag',
        tagLabel: 'span',
        tagRemover: '.tagbox-tag-remover'
      },
      callbacks: {
        change: _.noop,
        add: _.noop,
        remove: _.noop,
        empty: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$tagbox = this.$element;
      this.$tags = this.$tagbox.find ( this.options.selectors.tags );
      this.$input = this.$tagbox.find ( this.options.selectors.input );
      this.$partial = this.$tagbox.find ( this.options.selectors.partial );

    },

    _init: function ( suppressTriggers ) {

      this.add ( this.options.init, suppressTriggers );

    },

    _events: function () {

      /* PARTIAL */

      this._on ( this.$partial, 'keypress keydown', this.__keypressKeydown ); //INFO: `keypress` is for printable characters, `keydown` for the others

      this._on ( this.$partial, 'paste', this.__paste );

      /* CLICK ON EMPTY */

      this._on ( $.Pointer.tap, this.__clickOnEmpty );

      /* CLICK ON TAG REMOVER */

      this._on ( $.Pointer.tap, this.options.selectors.tagRemover, this.__clickOnTagRemover );

    },

    /* PRIVATE */

    _sanitizeTag: function ( value ) {

      value = _.trim ( value );

      if ( this.options.escape ) {

        value = _.escape ( value );

      }

      if ( this.options.deburr ) {

        value = _.deburr ( value );

      }

      return value;

    },

    _getTagHtml: function ( value ) {

      return this._tmpl ( 'tag', _.merge ( { value: value }, this.options.tag ) );

    },

    _clearPartial: function () {

      this.$partial.val ( '' ).trigger ( 'change' );

    },

    /* UPDATE */

    _updateInput: function () {

      this.$input.val ( this.options.tags.join ( this.options.characters.separator ) ).trigger ( 'change' );

    },

    /* TAG */

    _add: function ( value ) {

      var valueTrimmed = _.trim ( value ),
          value = this._sanitizeTag ( value );

      if ( valueTrimmed.length < this.options.tag.minLength ) {

        if ( valueTrimmed.length > 0 ) { //INFO: So it won't be triggered when the user presses enter and the $partial is empty

          $.noty ( '`' + value + '` is shorter than ' + this.options.tag.minLength + ' characters' );

        }

      } else if ( _.contains ( this.options.tags, value ) ) {

        $.noty ( '`' + value + '` is a duplicate' );

      } else {

        this.options.tags.push ( value );

        if ( this.options.sort ) {

          this.options.tags.sort ();

        }

        var tagHtml = this._getTagHtml ( value );

        if ( this.options.tags.length === 1 ) {

          this.$tags.prepend ( tagHtml );

        } else if ( !this.options.sort ) {

          this.$tagbox.find ( this.options.selectors.tag ).last ().after ( tagHtml );

        } else {

          var index = this.options.tags.indexOf ( value );

          if ( index === 0 ) {

            this.$tagbox.find ( this.options.selectors.tag ).first ().before ( tagHtml );

          } else {

            this.$tagbox.find ( this.options.selectors.tag ).eq ( index - 1 ).after ( tagHtml );

          }

        }

        return true;

      }

      return false;

    },

    _remove: function ( $tag, tag ) {

      $tag.remove ();

      _.pull ( this.options.tags, tag );

    },

    /* KEYPRESS / KEYDOWN */

    __keypressKeydown: function ( event ) {

      var value = this.$partial.val ();

      if ( _.contains ( this.options.characters.inserters, event.keyCode ) || event.keyCode === this.options.characters.separator.charCodeAt ( 0 ) ) {

        var added = this.add ( value );

        if ( added ) {

          this._clearPartial ();

        }

        event.preventDefault ();

      } else if ( event.keyCode === $.ui.keyCode.BACKSPACE ) {

        if ( value.length === 0 && this.options.tags.length > 0 ) {

          var $tag = this.$tagbox.find ( this.options.selectors.tag ).last (),
              edit = !$.hasCtrlOrCmd ( event );

          this.remove ( $tag, edit );

          event.preventDefault ();

        }

      } else if ( _.contains ( this.options.characters.forbidden, String.fromCharCode ( event.keyCode ) ) ) {

        $.noty ( 'The character you entered is forbidden' );

        event.preventDefault ();

      }

    },

    /* PASTE */

    __paste: function ( event ) {

        this.add ( event.originalEvent.clipboardData.getData ( 'text' ) );

        event.preventDefault ();

    },

    /* CLICK ON CLOSE */

    __clickOnTagRemover: function ( event, tagRemover ) {

      var $tag = $(tagRemover).parents ( this.options.selectors.tag );

      this.remove ( $tag );

    },

    /* CLICK ON EMPTY */

    __clickOnEmpty: function ( event ) {

      if ( document.activeElement !== this.$partial[0] && !$(event.target).is ( 'input, ' + this.options.selectors.tagLabel ) ) {

        this.$partial.focus ();

      }

    },

    /* PUBLIC */

    get: function () {

      return _.clone ( this.options.tags );

    },

    add: function ( tag, suppressTriggers ) { //INFO: The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings

      if ( _.isArray ( tag ) ) {

        tag = _.flatten ( tag ).join ( this.options.characters.separator );

      }

      var previous = _.clone ( this.options.tag );

      var tags = tag.split ( this.options.characters.separator ),
          adds = _.map ( tags, this._add, this );

      var added = ( _.compact ( adds ).length > 0 );

      if ( added ) {

        this._updateInput ();

        if ( !suppressTriggers ) {

          this._trigger ( 'change', {
            previous: previous,
            tags: _.clone ( this.options.tags )
          })

          var addedTags = _.filter ( tags, function ( tag, index ) {
            return adds[index];
          });

          this._trigger ( 'add', addedTags );

        }

      }

      return added;

    },

    remove: function ( tag, edit, suppressTriggers ) { //INFO: The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings. In addition it can also be the jQuery object of that tag.

      if ( tag instanceof $ ) {

        var $tags = [tag],
            tags = [tag.data ( 'tag-value' )];

      } else {

        var $tags = [],
            tags = [];

        if ( _.isArray ( tag ) ) {

          tag = _.flatten ( tag ).join ( this.options.characters.separator );

        }

        tag = tag.split ( this.options.characters.separator );

        for ( var i = 0, l = tag.length; i < l; i++ ) {

          var value = this._sanitizeTag ( tag[i] ),
              $tag = this.$tagbox.find ( this.options.selectors.tag + '[data-tag-value="' + value + '"]' );

          if ( $tag.length === 1 ) {

            $tags.push ( $tag );
            tags.push ( value );

          }

        }

      }

      if ( tags.length > 0 ) {

        var previous = _.clone ( this.options.tags );

        for ( var i = 0, l = tags.length; i < l; i++ ) {

          this._remove ( $tags[i], tags[i] );

        }

        this._updateInput ();

        if ( tags.length === 1 && edit === true ) {

          this.$partial.val ( tags[0] ).trigger ( 'change' );

        }

        if ( !suppressTriggers ) {

          this._trigger ( 'change', {
            previous: previous,
            tags: _.clone ( this.options.tags )
          })

          this._trigger ( 'remove', tags );

          if ( this.options.tags.length === 0 ) {

            this._trigger ( 'empty' );

          }

        }

      }

    },

    clear: function ( suppressTriggers ) {

      if ( this.options.tags.length > 0 ) {

        var data = {
          previous: _.clone ( this.options.tags ),
          tags: []
        };

        this.options.tags = [];

        this.$tagbox.find ( this.options.selectors.tag ).remove ();

        this._clearPartial ();

        this._updateInput ();

        if ( !suppressTriggers ) {

          this._trigger ( 'change', data );

          if ( data.previous.length > 0 ) {

            this._trigger ( 'remove', data.previous );

          }

          this._trigger ( 'empty' );

        }

      }

    },

    reset: function () {

      var previous = _.clone ( this.options.tags );

      this.clear ( true );

      this._init ( true );

      if ( !_.isEqual ( previous, this.options.tags ) ) {

        this._trigger ( 'change', {
          previous: previous,
          tags: _.clone ( this.options.tags )
        });

        var added = _.difference ( this.options.tags, previous );

        if ( added.length > 0 ) {

          this._trigger ( 'add', added );

        }

        var removed = _.difference ( previous, this.options.tags );

        if ( removed.length > 0 ) {

          this._trigger ( 'remove', removed );

        }

        if ( this.options.tags.length === 0 ) {

          this._trigger ( 'empty' );

        }

      }

    }

  });

  /* READY */

  $(function () {

    $('.tagbox').each ( function () {

      var $tagbox = $(this);

      $tagbox.tagbox ({ init: $tagbox.find ( 'input' ).val () });

    });

  });

}( jQuery, _, window, document ));
