
// @require ../replyable.js
// @require widgets/targeter/closer/closer.js

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'chatMessageReplyableUnreply',
    plugin: true,
    selector: '.chat-message-replyable-unreply',
    options: {
      widget: Widgets.ChatMessageReplyable,
      methods: {
        close: 'unreply'
      }
    }
  };

  /* CHAT MESSAGE REPLYABLE UNREPLY */

  class ChatMessageReplyableUnreply extends Widgets.Closer {}

  /* FACTORY */

  Factory.make ( ChatMessageReplyableUnreply, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
