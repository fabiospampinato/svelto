
/* =========================================================================
 * Svelto - Widgets - Tagbox
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/keyboard/keyboard.js
 * @require widgets/icon/icon.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//FIXME: Auto focus on the partial input doesn't work good on mobile, the keyboard keeps opening and closing

(function ( $, _, Svelto, Widgets, Factory, Colors, Icon, Sizes, Pointer, Keyboard ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'tagbox',
    plugin: true,
    selector: '.tagbox',
    templates: {
      tag: '<div class="label tagbox-tag <%= o.color %> <%= o.size %> <%= o.css %>" data-tag-value="<%= o.value %>">' +
             '<span>' +
               '<%= o.value %>' +
             '</span>' +
             `<i class="icon ${Sizes.xsmall} actionable tagbox-tag-remover">${Icon ( 'close' )}</i>` +
           '</div>'
    },
    options: {
      init: '', // Initial value
      tags: [],
      tag: {
        minLength: 3,
        color: Colors.gray,
        size: '',
        css: 'circular'
      },
      characters: {
        forbid: true, // Forbid or not
        forbidden: [ '<', '>', ';', '`' ],
        separator: ',', // It will also become kind of a forbidden character, used for insertion
        inserters: [Keyboard.keys.ENTER, Keyboard.keys.TAB] // They are keyCodes
      },
      sort: false, // The tags will be outputted in alphanumeric-sort order
      escape: false, // Escape potential XSS characters
      deburr: false, // Replace non basic-latin characters
      messages: {
        tooShort: '`$1` is shorter than $2 characters',
        duplicate: '`$1` is a duplicate',
        forbidden: 'The character you entered is forbidden'
      },
      datas: {
        value: 'tag-value'
      },
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
    }
  };

  /* TAGBOX */

  class Tagbox extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$tagbox = this.$element;
      this.$tags = this.$tagbox.find ( this.options.selectors.tags );
      this.$input = this.$tagbox.find ( this.options.selectors.input );
      this.$partial = this.$tagbox.find ( this.options.selectors.partial );
      this.partial = this.$partial[0];

    }

    _init ( suppressTriggers ) {

      /* REMOVE PREVIOUS */

      this.$tagbox.find ( this.options.selectors.tag ).remove ();

      /* OPTIONS */

      this.options.init = this.$input.val () || this.options.init;

      /* POPULATING */

      this.add ( this.options.init, suppressTriggers );

    }

    _events () {

      this.___partial ();

      this.___tapOnEmpty ();
      this.___tapOnTagRemover ();

    }

    /* PRIVATE */

    _sanitizeTag ( value ) {

      value = _.trim ( value );

      if ( this.options.escape ) {

        value = _.escape ( value );

      }

      if ( this.options.deburr ) {

        value = _.deburr ( value );

      }

      return value;

    }

    _getTagHtml ( value ) {

      return this._template ( 'tag', _.extend ( { value: value }, this.options.tag ) );

    }

    _clearPartial () {

      this.$partial.val ( '' ).trigger ( 'change' );

    }

    /* UPDATE */

    _updateInput () {

      this.$input.val ( this.options.tags.join ( this.options.characters.separator ) ).trigger ( 'change' );

    }

    /* TAG */

    _add ( value ) {

      let valueTrimmed = _.trim ( value );

      value = this._sanitizeTag ( value );

      if ( valueTrimmed.length < this.options.tag.minLength ) {

        if ( valueTrimmed.length ) { // So it won't be triggered when the user presses enter and the $partial is empty

          $.toast ( _.format ( this.options.messages.tooShort, value, this.options.tag.minLength ) );

        }

      } else if ( _.includes ( this.options.tags, value ) ) {

        $.toast ( _.format ( this.options.messages.duplicate, value ) );

      } else {

        this.options.tags.push ( value );

        if ( this.options.sort ) {

          this.options.tags.sort ();

        }

        let tagHtml = this._getTagHtml ( value );

        if ( this.options.tags.length === 1 ) {

          this.$tags.prepend ( tagHtml );

        } else if ( !this.options.sort ) {

          this.$tagbox.find ( this.options.selectors.tag ).last ().after ( tagHtml );

        } else {

          let index = this.options.tags.indexOf ( value );

          if ( index === 0 ) {

            this.$tagbox.find ( this.options.selectors.tag ).first ().before ( tagHtml );

          } else {

            this.$tagbox.find ( this.options.selectors.tag ).eq ( index - 1 ).after ( tagHtml );

          }

        }

        return true;

      }

      return false;

    }

    _remove ( $tag, tag ) {

      $tag.remove ();

      _.pull ( this.options.tags, tag );

    }

    /* PARTIAL */

    ___partial () {

      this._on ( this.$partial, 'keypress keydown', this.__keypressKeydown ); // `keypress` is for printable characters, `keydown` for the others

      this._on ( this.$partial, 'paste', this.__paste );

      this._on ( this.$partial, 'blur', this.___blur );

    }

    /* KEYPRESS / KEYDOWN */

    __keypressKeydown ( event ) {

      let value = this.$partial.val ();

      if ( _.includes ( this.options.characters.inserters, event.keyCode ) || event.keyCode === this.options.characters.separator.charCodeAt ( 0 ) ) {

        let added = this.add ( value );

        if ( added ) {

          this._clearPartial ();

        }

        event.preventDefault ();
        event.stopImmediatePropagation ();

      } else if ( event.keyCode === Keyboard.keys.BACKSPACE ) {

        if ( !value.length && this.options.tags.length ) {

          let $tag = this.$tagbox.find ( this.options.selectors.tag ).last (),
              edit = !Keyboard.keystroke.hasCtrlOrCmd ( event );

          this.remove ( $tag, edit );

          event.preventDefault ();
          event.stopImmediatePropagation ();

        }

      } else if ( this.options.characters.forbid && _.includes ( this.options.characters.forbidden, String.fromCharCode ( event.keyCode ) ) ) {

        $.toast ( this.options.messages.forbidden );

        event.preventDefault ();
        event.stopImmediatePropagation ();

      }

    }

    /* PASTE */

    __paste ( event ) {

        this.add ( event.originalEvent.clipboardData.getData ( 'text' ) );

        event.preventDefault ();
        event.stopImmediatePropagation ();

    }

    /* BLUR */

    ___blur ( event ) {

      let value = this.$partial.val ();

      if ( !value ) return;

      let added = this.add ( value );

      if ( added ) this._clearPartial ();

    }

    /* TAP ON TAG REMOVER */

    ___tapOnTagRemover () {

      this._on ( Pointer.tap, this.options.selectors.tagRemover, this.__tapOnTagRemover );

    }

    __tapOnTagRemover ( event ) {

      event.stopImmediatePropagation ();

      let $tag = $(event.currentTarget).closest ( this.options.selectors.tag );

      this.remove ( $tag );

    }

    /* TAP ON EMPTY */

    ___tapOnEmpty () {

      this._on ( Pointer.tap, this.__tapOnEmpty );

    }

    __tapOnEmpty ( event ) {

      if ( !$.isFocused ( this.partial ) && !$(event.target).is ( this.options.selectors.partial + ',' + this.options.selectors.tagLabel ) ) { //TODO: Add an helper for checking if is focused

        this.$partial.focus ();

      }

    }

    /* API */

    get () {

      return _.clone ( this.options.tags );

    }

    add ( tag, suppressTriggers ) { // The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings

      if ( _.isArray ( tag ) ) {

        tag = _.flatten ( tag ).join ( this.options.characters.separator );

      }

      let tags = tag.split ( this.options.characters.separator ),
          adds = _.map ( tags, this._add.bind ( this ) );

      let added = !!_.compact ( adds ).length;

      if ( added ) {

        this._updateInput ();

        if ( !suppressTriggers ) {

          this._trigger ( 'change' );

          let addedTags = _.filter ( tags, ( tag, index ) => adds[index] );

          this._trigger ( 'add', addedTags );

        }

      }

      return added;

    }

    remove ( tag, edit, suppressTriggers ) { // The tag can be a string containing a single tag, multiple tags separated by `this.options.characters.separator`, or it can be an array (nested or not) of those strings. In addition it can also be the jQuery object of that tag.

      let $tags = [],
          tags = [];

      if ( tag instanceof $ ) {

        $tags = [tag];
        tags = [tag.data ( this.options.datas.value )];

      } else {

        if ( _.isArray ( tag ) ) {

          tag = _.flatten ( tag ).join ( this.options.characters.separator );

        }

        tag = tag.split ( this.options.characters.separator );

        for ( let i = 0, l = tag.length; i < l; i++ ) {

          let value = this._sanitizeTag ( tag[i] ),
              $tag = this.$tagbox.find ( this.options.selectors.tag + '[data-' + this.options.datas.value + '="' + value.replace ( /"/g, '\\"' ) + '"]' );

          if ( $tag.length === 1 ) {

            $tags.push ( $tag );
            tags.push ( value );

          }

        }

      }

      if ( tags.length ) {

        for ( let i = 0, l = tags.length; i < l; i++ ) {

          this._remove ( $tags[i], tags[i] );

        }

        this._updateInput ();

        if ( tags.length === 1 && edit === true ) {

          this.$partial.val ( tags[0] ).trigger ( 'change' );

        }

        if ( !suppressTriggers ) {

          this._trigger ( 'change' );

          this._trigger ( 'remove', tags );

          if ( !this.options.tags.length ) {

            this._trigger ( 'empty' );

          }

        }

      }

    }

    clear ( suppressTriggers ) {

      if ( this.options.tags.length ) {

        let previous = this.options.tags;

        this.options.tags = [];

        this.$tagbox.find ( this.options.selectors.tag ).remove ();

        this._clearPartial ();

        this._updateInput ();

        if ( !suppressTriggers ) {

          this._trigger ( 'change' );

          this._trigger ( 'remove', previous );

          this._trigger ( 'empty' );

        }

      }

    }

    reset () {

      let previous = this.options.tags;

      this.clear ( true );

      this._init ( true );

      if ( !_.isEqual ( previous, this.options.tags ) ) {

        this._trigger ( 'change' );

        let added = _.difference ( this.options.tags, previous );

        if ( added.length ) {

          this._trigger ( 'add', added );

        }

        let removed = _.difference ( previous, this.options.tags );

        if ( removed.length ) {

          this._trigger ( 'remove', removed );

        }

        if ( !this.options.tags.length ) {

          this._trigger ( 'empty' );

        }

      }

    }

  }

  /* FACTORY */

  Factory.make ( Tagbox, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors, Svelto.Icon, Svelto.Sizes, Svelto.Pointer, Svelto.Keyboard ));
