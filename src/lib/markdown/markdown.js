
/* =========================================================================
 * Svelto - Lib - Markdown
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require lib/get_script/get_script.js
 * ========================================================================= */

(function ( $, _, Svelto, getScript ) {

  'use strict';

  /* MARKDOWN */

  const Markdown = {

    markedUrl: `template/dist/javascript/marked.js?v=${Svelto.VERSION}`,

    async parse ( str ) {

      if ( window.marked ) return marked ( str );

      try {

        await getScript ( Markdown.markedUrl );

        return marked ( str );

      } catch ( e ) {

        return str;

      }

    }

  };

  /* EXPORT */

  Svelto.Markdown = Markdown;

}( Svelto.$, Svelto._, Svelto, Svelto.getScript ));
