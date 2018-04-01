
// @require ./loader.js

//TODO: Maybe namespace ajax-related options into an `ajax` key -> easier to read, harder to use

(function ( $, _, Svelto, RemoteLoader ) {

  /* DEFAULTS */

  let defaults = {
    template: _.template ( `
      <div class="remote-loader" data-<%= o.datas.method %>="<%= o.method %>" data-<%= o.datas.data %>='<%= JSON.stringify ( o.data ) %>' data-<%= o.datas.url %>="<%= o.url %>">
        <svg class="spinner">
          <circle cx="1.625em" cy="1.625em" r="1.25em"></circle>
        </svg>
      </div>
    ` ),
    url: '',
    data: {
      text: 'text'
    },
    datas: RemoteLoader.config.options.datas,
    method: ''
  };

  /* HELPER */

  $.remoteLoader = function ( options, $anchor, method = 'after' ) { // The method could me any valid jQuery method, like `before`, `prepend`, `append` or `after`

    /* OPTIONS */

    options = _.merge ( {}, $.remoteLoader.defaults, options );

    /* LOADER */

    let template = _.isFunction ( options.template ) ? options.template : _.template ( options.template, { variable: 'o' } ),
        html = template ( options ),
        $loader = $(html);

    $anchor[method]( $loader );

    $loader.widgetize ();

  };

  /* BINDING */

  $.remoteLoader.defaults = defaults;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets.RemoteLoader ));
