
// @require core/svelto/svelto.js

//URL: https://github.com/developit/unfetch

//TODO: Add a demo for it

(function ( $, _, Svelto ) {

  /* DEFAULTS */

  let defaults = {
    // url: 'https://example.com',
    method: 'get',
    methodCacheableRe: /^(get|head)$/i,
    methodBodyableRe: /^(?!get|head)$/i,
    // body: {},
    cache: true,
    credentials: 'include', // Include cookies
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 0,
    notOKisError: true,
    request: () => new XMLHttpRequest (),
    beforesend: _.noop,
    error: _.noop,
    success: _.noop,
    complete: _.noop
  };

  /* FETCH */

  function fetch ( url, options ) {

    if ( !options && _.isPlainObject ( url ) ) {
      options = url;
      url = options.url;
    }

    options = _.merge ( {}, fetch.defaults, options );

    let isMethodBodyable = options.methodBodyableRe.test ( options.method );

    if ( options.body && !isMethodBodyable ) {
      options.method = 'post';
    }

    let isMethodCacheable = options.methodCacheableRe.test ( options.method );

    if ( options.cache && isMethodCacheable && fetch.cache[url] ) {
      let response = fetch.cache[url];
      response.then ( res => callbacksOnBeforeSend ( options, res.request ) );
      response.then ( res => callbacksOnLoad ( options, res ) );
      return response;
    }

    if ( options.batchUrl ) return fetch.batch ( url, options.batchUrl, options );

    let response = new Promise ( ( resolve, reject ) => {

      let request = options.request ();

      if ( !options.cache && isMethodCacheable ) {
        url += ( url.includes ( '?' ) ? '&' : '?' ) + `anticache=${new Date ().getTime ()}`;
      }

      request.open ( options.method, url, true );
      request.timeout = options.timeout;
      request.withCredentials = ( options.credentials === 'include' );

      if ( _.isPlainObject ( options.body ) ) {

        _.extend ( options.headers, {
          'Content-Type': 'application/json'
        });

        options.body = JSON.stringify ( options.body );

      }

      for ( let key in options.headers ) {
        if ( !options.headers.hasOwnProperty ( key ) ) continue;
        request.setRequestHeader ( key, options.headers[key] );
      }

      request.onload = () => {
        let response = fetch.request2response ( request );
        callbacksOnLoad ( options, response );
        resolve ( response );
      };

      request.onerror = () => {
        let response = fetch.request2response ( request );
        callbacksOnError ( options, response );
        reject ( response );
      };

      callbacksOnBeforeSend ( options, request );

      request.send ( options.body );

    });

    if ( options.cache && isMethodCacheable ) fetch.cache[url] = response;

    return response;

  }

  /* BATCH */

  async function batch ( url, batchUrl, options ) {

    options = _.omit ( options, ['url', 'batchUrl'] );

    const responses = await ( await fetch ( batchUrl, options ) ).json ();

    for ( let url in responses ) {

      if ( !responses.hasOwnProperty ( url ) ) continue;

      const response = responses[url],
            responseText = _.isString ( response ) ? response : JSON.stringify ( response );

      const request = {
        __fake: true,
        getAllResponseHeaders: () => '',
        status: 200,
        statusText: 'OK',
        responseURL: url,
        response: responseText,
        responseText
      };

      fetch.cache[url] = Promise.resolve ( fetch.request2response ( request ) );

    }

    return fetch.cache[url] || fetch ( url, options );

  }

  /* REQUEST 2 RESPONSE */

  function request2response ( request ) {

    let headers = {},
        headersKeys = [],
        headersEntries = [];

    request.getAllResponseHeaders ().replace ( /^(.*?):\s*([\s\S]*?)$/gm, ( match, key, value ) => {
      key = key.toLowerCase ();
      headersKeys.push ( key );
      headersEntries.push ([ key, value ]);
      let prevValue = headers[key];
      headers[key] = prevValue ? `${prevValue},${value}` : value;
    });

    return {
      request,
      ok: ( request.status / 200 | 0 ) === 1, // 200-299
      status: request.status,
      statusText: request.statusText,
      url: request.responseURL,
      clone: () => fetch.request2response ( request ),
      text: () => Promise.resolve ( request.responseText ),
      json: () => Promise.resolve ( JSON.parse ( request.responseText ) ),
      blob: () => Promise.resolve ( new Blob ([ request.response ]) ),
      headers: {
        keys: () => headersKeys,
        entries: () => headersEntries,
        get: key => headers[key.toLowerCase ()],
        has: key => key.toLowerCase () in headers
      }
    };

  }

  /* CALLBACKS */

  function callbacksOnLoad ( options, res ) {
    if ( options.notOKisError && !res.ok ) {
      options.error ( res );
    } else {
      options.success ( res );
    }
    options.complete ( res );
  }

  function callbacksOnError ( options, res ) {
    options.error ( res );
    options.complete ( res );
  }

  function callbacksOnBeforeSend ( options, req ) {
    options.beforesend ( req );
  }

  /* BINDING */

  fetch.batch = batch;
  fetch.defaults = defaults;
  fetch.cache = {};
  fetch.request2response = request2response;

  /* EXPORT */

  Svelto.fetch = fetch;

}( Svelto.$, Svelto._, Svelto ));
