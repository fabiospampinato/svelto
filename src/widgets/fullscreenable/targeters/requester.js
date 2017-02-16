
/* =========================================================================
 * Svelto - Widgets - Fullscreenable - Targeters - Requester
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../fullscreenable.js
 * @require widgets/targeter/opener/opener.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'fullscreenableRequester',
    plugin: true,
    selector: '.fullscreenable-requester, .fullscreen-requester',
    options: {
      widget: Widgets.Fullscreenable,
      $fallback: $.$html,
      methods: {
        open: 'request'
      }
    }
  };

  /* FULLSCREENABLE REQUESTER */

  class FullscreenableRequester extends Widgets.Opener {}

  /* FACTORY */

  Factory.make ( FullscreenableRequester, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
