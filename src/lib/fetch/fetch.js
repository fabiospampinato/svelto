
/* =========================================================================
 * Svelto - Lib - Fetch
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

//URL: https://github.com/developit/unfetch

//TODO: Add a demo for it

(function ( $, _, Svelto ) {

  'use strict';

  /* DEFAULTS */

  let defaults = {
    // url: 'https://example.com',
    method: 'get',
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

    let isMethodCacheable = _.includes ( ['get', 'head'], options.method );

    if ( options.cache && isMethodCacheable && fetch.cache[url] ) return fetch.cache[url];

    if ( options.batchUrl ) return fetch.batch ( url, options.batchUrl, options );

    let response = new Promise ( ( resolve, reject ) => {

      let request = options.request ();

      request.timeout = options.timeout;
      request.withCredentials = ( options.credentials === 'include' );

      if ( !options.cache && isMethodCacheable ) {
        url += ( url.includes ( '?' ) ? '&' : '?' ) + `anticache=${new Date ().getTime ()}`;
      }

      request.open ( options.method, url );

      if ( _.isPlainObject ( options.body ) ) {

        _.extend ( options.headers, {
          'Content-Type': 'application/json'
        });

        options.body = JSON.stringify ( options.body );

      }

      _.forOwn ( options.headers, ( val, key ) => {
        request.setRequestHeader ( key, val );
      });

      request.onload = () => {
        let response = fetch.request2response ( request );
        if ( options.notOKisError && !response.ok ) {
          options.error ( response );
        } else {
          options.success ( response );
        }
        options.complete ( response );
        resolve ( response );
      };

      request.onerror = () => {
        let response = fetch.request2response ( request );
        options.error ( response );
        options.complete ( response );
        reject ( response );
      };

      options.beforesend ( request );

      request.send ( options.body );

    });

    if ( options.cache && isMethodCacheable ) fetch.cache[url] = response;

    return response;

  }

  /* BATCH */

  async function batch ( url, batchUrl, options ) {

    options = _.omit ( options, ['url', 'batchUrl'] );

    const responses = await ( await fetch ( batchUrl, options ) ).json ();

    _.forOwn ( responses, ( response, url ) => {

      const responseText = _.isString ( response ) ? response : JSON.stringify ( response );
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

    });

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

  /* BINDING */

  fetch.batch = batch;
  fetch.defaults = defaults;
  fetch.cache = {};
  fetch.request2response = request2response;

  /* EXPORT */

  Svelto.fetch = fetch;

}( Svelto.$, Svelto._, Svelto ));
