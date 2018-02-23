
/* =========================================================================
 * Svelto - Widgets - Chat - Message - Editable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @optional lib/emojify/emojify.js
 * @optional widgets/editor/editor.js
 * @require core/widget/widget.js
 * @require widgets/remote/loader/loader.js
 * ========================================================================= */

//FIXME: If the editor gets empty, and it's supposed to be required, we output an error message that messes up the chat message layout
//TODO: Add a demo for it

(function ( $, _, Svelto, Widgets, Factory, Emojify ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'chatMessageEditable',
    plugin: true,
    selector: '.chat-message.editable',
    options: {
      classes: {
        editing: 'editing'
      },
      selectors: {
        message: '.chat-message-content > *:only-child, .chat-message-content > .card-header:first-child + .card-block',
        blocks: {
          hide: '.editable-hide',
          show: '.editable-show'
        }
      },
      callbacks: {
        edit: _.noop,
        unedit: _.noop
      }
    }
  };

  /* CHAT MESSAGE EDITABLE */

  class ChatMessageEditable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$editable = this.$element;
      this.$message = this.$editable.find ( this.options.selectors.message ).first ();

      this._isEditing = this.$editable.hasClass ( this.options.classes.editing );

    }

    _events () {

      this.___submit ();

    }

    /* SUBMIT */

    ___submit () {

      this._on ( true, 'submit formajax:success', this.__submit );

    }

    async __submit () {

      const content = this.$editable.find ( 'textarea' ).first ().val (),
            rendered = Widgets.Editor ? await Widgets.Editor.config.options.parser ( content ) : content;

      this.$message.html ( rendered );

      if ( Emojify ) this.$message.emojify ();

      this.unedit ();

    }

    /* HELPERS */

    _update () {

      let {hide, show} = this.options.selectors.blocks,
          blocks = this._isEditing ? show : hide;

      this.$editable.toggleClass ( this.options.classes.editing, this._isEditing )
                    .find ( blocks )
                    .filter ( ( i, ele ) => $.widget.is ( ele, Widgets.RemoteLoader ) )
                    .remoteLoader ( 'request' );

    }

    /* API */

    isEditing () {

      return this._isEditing;

    }

    toggle ( force = !this._isEditing ) {

      if ( !!force !== this._isEditing ) {

        this._isEditing = !!force;

        this._update ();

        this._trigger ( this._isEditing ? 'edit' : 'unedit' );

      }

    }

    edit () {

      this.toggle ( true );

    }

    unedit () {

      this.toggle ( false );

    }

  }

  /* FACTORY */

  Factory.make ( ChatMessageEditable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Emojify ));
