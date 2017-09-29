
/* =========================================================================
 * Svelto - Widgets - Icon
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* ICON */

  let Icons = { // Maps each icon to its ligature/html entity, required for a  custom icon font
    'car': 'directions_car',
    'chevron-left': 'chevron_left',
    'chevron-right': 'chevron_right',
    'clock': 'access_time',
    'close': 'close',
    'cutlery': 'restaurant',
    'dots-horizontal': 'more_horiz',
    'emoticon': 'insert_emoticon',
    'flag': 'flag',
    'gym': 'fitness_center',
    'heart': 'favorite',
    'objects': 'devices_other',
    'page-first': 'first_page',
    'page-last': 'last_page',
    'paw': 'pets',
    'search': 'search'
  };

  let Icon = name => Icons[name];

  /* EXPORT */

  Svelto.Icons = Icons;
  Svelto.Icon = Icon;

}( Svelto.$, Svelto._, Svelto ));
