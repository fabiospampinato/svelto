
// @require core/browser/browser.js
// @require core/svelto/svelto.js

(function ( $, _, Svelto, Browser ) {

  /* KEYBOARD */

  let Keyboard = {
    keys: {
      BACKSPACE: 8,
      COMMA: 188,
      DEL: 46,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESC: 27,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      SPACEBAR: 32,
      TAB: 9,
      UP: 38
    },
    keysModifiers: {
      ALT: true,
      CMD: true,
      CTRL: true,
      CTMD: true, // `ctmd` is treated as `cmd` on Mac, and as `ctrl` elsewhere
      SHIFT: true
    },
    keystroke: {

      parse: (() => {

        const cache = {};

        return keystroke => {

          const cached = cache[keystroke];

          if ( cached ) return cached;

          const keys = {};

          keystroke.split ( '+' ).forEach ( key => {

            key = key.trim ().toUpperCase ();

            keys[key] = true;

            if ( !Keyboard.keysModifiers[key] ) keys.trigger = key;

          });

          if ( keys.CTMD ) keys[Browser.is.mac ? 'CMD' : 'CTRL'] = true;

          return cache[keystroke] = keys;

        };

      })(),

      match ( event, keystroke ) {

        const keys = Keyboard.keystroke.parse ( keystroke );

        if ( !!keys.CTRL !== event.ctrlKey ) return false;
        if ( !!keys.CMD !== event.metaKey ) return false;
        if ( !!keys.ALT !== event.altKey ) return false;
        if ( !!keys.SHIFT !== event.shiftKey ) return false;

        let keyCode = event.keyCode;

        if ( keyCode === Keyboard.keys[keys.trigger] ) return true;

        if ( keyCode >= 96 && keyCode <= 105 ) keyCode -= 48; // Numpad patch

        return String.fromCharCode ( keyCode ).toUpperCase () === keys.trigger;

      },

      hasCtrlOrCmd ( event ) {

        return Browser.is.mac ? !!event.metaKey : !!event.ctrlKey;

      }

    }

  };

  /* EXPORT */

  Svelto.Keyboard = Keyboard;

}( Svelto.$, Svelto._, Svelto, Svelto.Browser ));
