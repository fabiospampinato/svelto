
// @require lib/get_script/get_script.js

(function ( $, _, Svelto, getScript ) {

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
