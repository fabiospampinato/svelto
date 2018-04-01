
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
    keystroke: {

      match ( event, keystroke ) {

        // `ctmd` is treated as `cmd` on Mac, and as `ctrl` elsewhere

        let specialKeys = ['ctrl', 'cmd', 'ctmd', 'alt', 'shift'],
            keys = keystroke.split ( '+' ).map ( key => key.trim ().toLowerCase () );

        if ( keys.includes ( 'ctmd' ) ) {

          if ( !Keyboard.keystroke.hasCtrlOrCmd ( event ) ) return false;

        } else {

          if ( keys.includes ( 'ctrl' ) !== event.ctrlKey ) return false;
          if ( keys.includes ( 'cmd' ) !== event.metaKey ) return false;

        }

        if ( keys.includes ( 'alt' ) !== event.altKey ) return false;
        if ( keys.includes ( 'shift' ) !== event.shiftKey ) return false;

        for ( let i = 0, l = keys.length; i < l; i++ ) {

          let key = keys[i];

          if ( specialKeys.includes ( key ) ) {

            if ( !( event.keyCode === Keyboard.keys[key.toUpperCase ()] || String.fromCharCode ( event.keyCode ).toLowerCase () === key ) ) return false;

          }

        }

        return true;

      },

      hasCtrlOrCmd ( event ) {

        return ( !Browser.is.mac && event.ctrlKey ) || ( Browser.is.mac && event.metaKey );

      }

    }

  };

  /* EXPORT */

  Svelto.Keyboard = Keyboard;

}( Svelto.$, Svelto._, Svelto, Svelto.Browser ));
