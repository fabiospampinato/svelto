
/* =========================================================================
 * Svelto - Core - Shims - Shims (localStorage)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/lodash/lodash.js
 * ========================================================================= */

(function () {

  'use strict';

  /* LOCAL STORAGE */

  if ( window.localStorage ) return;

  window.localStorage = {
    key: _.null,
    removeItem: _.undefined,
    clear: _.undefined,
    getItem: _.null,
    setItem: _.undefined
  };

}());
