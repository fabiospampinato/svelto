
/* =========================================================================
 * Svelto - Core - jQuery (Init)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./vendor/jquery.js
 * ========================================================================= */

(function () {

  'use strict';

  /* JQUERY */

  let $ = window.jQuery || window.$;

  /* CHECKING */

  let version = $ ? $().jquery : false,
      parts = version ? version.split ( '-' )[0].split ( '.' ) : false,
      nums = parts ? parts.map ( Number ) : false,
      supported = nums && nums[0] > 1 || nums[0] === 1 && ( nums[1] > 11 || nums[1] === 11 && nums[2] >= 2 );

  if ( !$ || !supported ) {

    throw new Error ( 'Svelto depends upon jQuery v1.11.2 or higher, dependency not found' );

  }

  /* EXPORT */

  window.jQuery = $;

}());
