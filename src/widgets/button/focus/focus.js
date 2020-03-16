
// @require core/colors/colors.js
// @require core/keyboard/keyboard.js
// @require core/readify/readify.js
// @require widgets/modal/modal.js

(function ( $, _, Svelto, Pointer, Keyboard ) {

  Svelto.Readify.add ( () => {

    $.$document.on ( 'keydown', event => {

      const ele = document.activeElement;

      if ( !ele.classList.contains ( 'button' ) ) return;

      if ( !Keyboard.keystroke.match ( event, 'enter' ) && !Keyboard.keystroke.match ( event, 'space' ) ) return;

      $(ele).trigger ( Pointer.tap );

    });

  });

}( Svelto.$, Svelto._, Svelto, Svelto.Pointer, Svelto.Keyboard ));
