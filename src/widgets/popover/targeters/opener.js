
/* =========================================================================
 * Svelto - Widgets - Popover - Targeters - Opener
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../popover.js
 * @require widgets/targeter/opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'popoverOpener',
    plugin: true,
    selector: '.popover-opener',
    options: {
      widget: Widgets.Popover
    }
  };

  /* POPOVER OPENER */

  class PopoverOpener extends Widgets.Opener {}

  /* FACTORY */

  Factory.init ( PopoverOpener, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));