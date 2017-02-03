
/* =========================================================================
 * Svelto - Lib - Autofocus
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* VARIABLES */

  let $html = $('html');

  /* AUTOFOCUS */

  let Autofocus = {

    /* VARIABLES */

    history: [], // List of autofocused elements
    historySize: 3, // How many elements to keep in the history

    /* INIT */

    init () {

      Autofocus.focus ( $html );

    },

    /* API */

    set ( ele ) {

      Autofocus.history.unshift ( ele );
      Autofocus.history = _.uniq ( Autofocus.history ).slice ( 0, Autofocus.historySize );

      ele.focus ();

      /* CARET TO THE END */

      if ( ele.setSelectionRange ) {

        let length = ele.value.length * 2; // Double the length because Opera is inconsistent about whether a carriage return is one character or two

        if ( !length ) return;

        setTimeout ( () => ele.setSelectionRange ( length, length ), 1 ); // Timeout seems to be required for Blink

        ele.scrollTop = 1000000; // In case it's a tall textarea

      }

    },

    find ( $parent = $html, focused ) {

      let $focusable = $parent.find ( '[autofocus], .autofocus' ).filter ( ':visible' );

      if ( _.isBoolean ( focused ) ) {

        $focusable = $focusable.filter ( ( index, ele ) => $.isFocused ( ele ) === focused );

      }

      return $focusable.length ? $focusable[0] : null;

    },

    focus ( $parent ) {

      let focusable = Autofocus.find ( $parent );

      if ( !focusable || focusable === Autofocus.history[0] ) return;

      Autofocus.set ( focusable );

    },

    blur ( $parent ) {

      if ( !Autofocus.history[0] || !$.contains ( $parent[0], Autofocus.history[0] ) ) return;

      let previous = Autofocus.history.find ( ele => $(ele).is ( ':visible' ) ) || Autofocus.find ( $html );

      if ( previous ) Autofocus.set ( previous );

    }

  };

  /* READY */

  $(Autofocus.init);

  /* EXPORT */

  Svelto.Autofocus = Autofocus;

}( Svelto.$, Svelto._, Svelto ));
