
/* =========================================================================
 * Svelto - Widgets - Remote - Loader (Helper)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./loader.js
 * ========================================================================= */

//TODO: Maybe namespace ajax-related options into an `ajax` key -> easier to read, harder to use

(function ( $, _, Svelto, Widgets, RemoteLoader ) {

  'use strict';

  /* DEFAULTS */

  let datas = RemoteLoader.config.options.datas;
  let defaults = {
    template: `<div class="remote-loader" data-${datas.method}="<%= o.method %>" data-${datas.data}='<%= JSON.stringify ( o.data ) %>' data-${datas.url}="<%= o.url %>">` +
                '<svg class="spinner">' +
                  '<circle cx="1.625em" cy="1.625em" r="1.25em"></circle>' +
                '</svg>' +
              '</div>',
    url: '',
    data: {
      text: "test"
    },
    method: ''
  };

  /* HELPER */

  $.remoteLoader = function ( options, $anchor, method = 'after' ) { // The method could me any valid jQuery method, like `before`, `prepend`, `append` or `after`

    /* OPTIONS */

    options = _.merge ( {}, $.remoteLoader.defaults, options );

    /* LOADER */

    let html = _.template ( options.template, { variable: 'o' } )( options ),
        $loader = $(html);

    $anchor[method]( $loader );

    $loader.widgetize ();

  };

  /* BINDING */

  $.remoteLoader.defaults = defaults;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Widgets.RemoteLoader ));
