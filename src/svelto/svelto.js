
/* =========================================================================
 * Svelto - Svelto
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Move the different sections like `colors` or `breakpoints` to their respective files

(function () {

  'use strict';

  /* SVELTO */

  window.Svelto = {
    version: '0.3.0-beta2',
    $: jQuery ? jQuery : ( ( $ && 'jquery' in $() ) ? $ : false ), //INFO: Checking the presence of the `jquery` property in order to distinguish it from `Zepto` and other `jQuery`-like libraries
    _: lodash ? lodash : ( ( _ && 'VERSION' in _ && Number ( _.VERSION[0] ) === 3 ) ? _ : false ) //INFO: Checking the version also in order to distinguish it from `underscore`
  };

  /* WIDGETS */

  Svelto.Widgets = {};

  /* BREAKPOINTS */

  Svelto.breakpoints = {
    xsmall: 0,
    small: 512,
    medium: 768,
    large: 1024,
    xlarge: 1216
  };

  /* ANIMATION */

  Svelto.animation = {
    xslow: 900,
    slow: 500,
    normal: 350,
    fast: 150,
    xfast: 75
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

    throw new Error ( 'Svelto depends upon jQuery, dependency unmet' );

  }

  if ( !Svelto._ ) {

    throw new Error ( 'Svelto depends upon lodash, dependency unmet' );

  }

}());
