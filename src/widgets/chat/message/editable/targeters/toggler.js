
// @require ../editable.js
// @require widgets/targeter/toggler/toggler.js

(function ( $, _, Svelto, Widgets, Factory ) {

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
