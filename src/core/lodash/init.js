
/* =========================================================================
 * Svelto - Core - lodash (Init)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./vendor/lodash.js
 * ========================================================================= */

(function () {

  'use strict';

  /* LODASH */

  let _ = window.lodash || window._;

  /* CHECKING */

  let version = _ ? _.VERSION : false,
      parts = version ? version.split ( '-' )[0].split ( '.' ) : false,
      nums = parts ? parts.map ( Number ) : false,
      supported = nums && nums[0] > 4 || nums[0] === 4 && ( nums[1] > 6 || nums[1] === 6 && nums[2] >= 1 );

  if ( !_ || !supported ) {

    throw new Error ( 'Svelto depends upon lodash v4.6.1 or higher, dependency not found' );

  }

  /* EXPORT */

  window.lodash = _;

}());
