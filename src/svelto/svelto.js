
/* =========================================================================
 * Svelto - Svelto
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Remove the _ dependency, after all we use it only for a few functions

(function ( window, document, undefined ) {

  'use strict';

  /* SVELTO */

  window.Svelto = {
    version: '0.2.0-beta.6',
    $: jQuery || Zepto || ( $ && ( 'jquery' in $() || 'zepto' in $ ) ? $ : false ),
    _: lodash || ( _ && 'VERSION' in _ && Number ( _.VERSION[0] ) >= 3 ? _ : false )
  };

  /* KEY CODE */

  Svelto.keyCode = {
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38
  };

  /* MOUSE BUTTON */

  Svelto.mouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  };

  /* ANIMATION */

  Svelto.animation = {
    slow: 500,
    normal: 350,
    fast: 150
  };

  /* COLORS */

  Svelto.colors = {
    primary: '#1565c0',
    secondary: '#ef6c00',
    tertiary: '#6a1b9a',
    quaternary: '#2e7d32',

    white: '#ffffff',
    gray: '#e0e0e0',
    black: '#212121',
    yellow: '#fabf40',
    olive: '#cddc39',
    green: '#4caf50',
    blue: '#2196f3',
    violet: '#673ab7',
    orange: '#ff9800',
    purple: '#9c27b0',
    red: '#f44336',
    pink: '#e91e63',
    teal: '#009688',
    brown: '#795548',

    error: '#f44336',
    warning: '#fabf40',
    success: '#4caf50',

    transparent: 'rgba(0, 0, 0, 0)',
    base: '#eceff1'
  };

  /* ERRORS */

  if ( !Svelto.$ ) {

    throw 'Svelto depends upon jQuery, dependency unmet.';

  }

  if ( !Svelto._ ) {

    throw 'Svelto depends upon lo-dash, dependency unmet.'

  }

}( window, document ));
