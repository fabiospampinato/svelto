
/* =========================================================================
 * Svelto - Lib - Autofocus
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/browser/browser.js
 * @require core/readify/readify.js
 * ========================================================================= */

(function ( $, _, Svelto, Browser, Readify ) {

  'use strict';

  /* VARIABLES */

  let $html = $('html');

  /* AUTOFOCUS */

  let Autofocus = {

    /* VARIABLES */

    enabled: Browser.is.desktop,
    history: [], // List of autofocused elements
    historySize: 3, // How many elements to keep in the history

    /* INIT */

    init () {

      Autofocus.focus ( $html );

    },

    /* API */

    set ( ele ) {

      if ( !Autofocus.enabled ) return;

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

      let $focusable = $parent.find ( '[autofocus], .autofocus' ).filter ( ( i, ele ) => $.isVisible ( ele ) );

      if ( _.isBoolean ( focused ) ) {

        $focusable = $focusable.filter ( ( index, ele ) => $.isFocused ( ele ) === focused );

      }

      return $focusable.length ? $focusable[0] : null;

    },

    focus ( $parent ) {

      if ( !Autofocus.enabled ) return;

      let focusable = Autofocus.find ( $parent );

      if ( !focusable || $.isFocused ( focusable ) ) return;

      Autofocus.set ( focusable );

    },

    blur ( $parent ) {

      if ( !Autofocus.enabled || !Autofocus.history[0] || !$.contains ( $parent[0], Autofocus.history[0] ) ) return;

      let previous = Autofocus.history.find ( $.isVisible ) || Autofocus.find ( $html );

      if ( previous ) Autofocus.set ( previous );

    }

  };

  /* EXPORT */

  Svelto.Autofocus = Autofocus;

  /* READY */

  Readify.add ( Autofocus.init.bind ( Autofocus ) );

}( Svelto.$, Svelto._, Svelto, Svelto.Browser, Svelto.Readify ));
