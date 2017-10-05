
/* =========================================================================
 * Svelto - Widgets - Chat - Message - Editable - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../editable.js
 * @require widgets/targeter/toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'chatMessageEditableToggler',
    plugin: true,
    selector: '.chat-message-editable-toggler',
    options: {
      widget: Widgets.ChatMessageEditable
    }
  };

  /* CHAT MESSAGE EDITABLE TOGGLER */

  class ChatMessageEditableToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.make ( ChatMessageEditableToggler, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
