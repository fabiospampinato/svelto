
// @require core/colors/colors.js
// @require core/widget/widget.js
// @require widgets/remote/loader/loader.js

//TODO: Add a demo for it

(function ( $, _, Svelto, Widgets, Factory, Colors ) {

  /* CONFIG */

  let config = {
    name: 'chatMessageReplyable',
    plugin: true,
    selector: '.chat-message.replyable',
    templates: {
      reply: _.template ( `
        <div class="chat-message-reply no-tip <%= o.cls %>">
          <%= o.img ? '<div class="chat-message-img"></div>' : '' %>
          <div class="chat-message-content remote-loader no-wrap container bordered" data-url="<%= o.url %>">
            <svg class="spinner">
              <circle cx="1.625em" cy="1.625em" r="1.25em"></circle>
            </svg>
          </div>
        </div>
      ` )
    },
    options: {
      url: false, // Url for remote-loading the actual reply widget
      datas: {
        url: 'reply-url'
      },
      selectors: {
        reply: '+ .chat-message-reply'
      },
      callbacks: {
        reply: _.noop,
        unreply: _.noop
      }
    }
  };

  /* CHAT MESSAGE REPLY */

  class ChatMessageReplyable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$replyable = this.$element;

      this.options.url = this.$replyable.data ( this.options.datas.url ) || this.options.url;

    }

    /* HELPERS */

    _getReply () {

      return this.$replyable.find ( this.options.selectors.reply );

    }

    /* API */

    reply () {

      let $reply = this._getReply ();

      if ( $reply.length ) return $reply.focus ();

      let cls = this.$replyable.attr ( 'class' ),
          img = !!this.$replyable.children ( '.chat-message-img' ).length,
          url = this.options.url,
          options = {cls, img, url};

      $reply = $(this._template ( 'reply', options ));

      this.$replyable.after ( $reply );

      $reply.focus ().widgetize ();

      this._trigger ( 'reply' );

    }

    unreply () {

      let $reply = this._getReply ();

      if ( !$reply.length ) return;

      $reply.trigger ( 'chatmessagereplyablereply:unreply' ).remove ();

      this._trigger ( 'unreply' );

    }

  }

  /* FACTORY */

  Factory.make ( ChatMessageReplyable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors ));
