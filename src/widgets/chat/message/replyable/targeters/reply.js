
/* =========================================================================
 * Svelto - Widgets - Chat - Message - Replyable - Targeters - Reply
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../replyable.js
 * @require widgets/targeter/opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'chatMessageReplyableReply',
    plugin: true,
    selector: '.chat-message-replyable-reply',
    options: {
      widget: Widgets.ChatMessageReplyable,
      methods: {
        open: 'reply'
      }
    }
  };

  /* CHAT MESSAGE REPLYABLE REPLY */

  class ChatMessageReplyableReply extends Widgets.Opener {}

  /* FACTORY */

  Factory.make ( ChatMessageReplyableReply, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
