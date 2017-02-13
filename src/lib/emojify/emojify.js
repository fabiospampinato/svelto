
/* =========================================================================
 * Svelto - Lib - Emojify
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widgetize/widgetize.js
 * @require lib/emoji/emoji.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgetize, EmojiData, Emoji ) {

  'use strict';

  /* EMOJIFY */

  let Emojify = {

    /* OPTIONS */

    options: {
      parse: {
        unicode: false, //FIXME: Doesn't work properly, and it's very slow
        emoticon: true,
        encoded: true
      }
    },

    /* UTILITIES */

    getEmoticons ( str ) {

      return _.findMatches ( str, Emoji.options.regexes.emoticon ).map ( _.first );

    },

    getEncoded ( str ) {

      let matches = _.findMatches ( str, Emoji.options.regexes.encoded );

      return matches.reduce ( ( acc, match ) => _.set ( acc, match[0], {
        name: match[1],
        tone: match[3] || Emoji.options.tone
      }), {} );

    },

    /* PARSE */

    async parseUnicode ( str ) {

      if ( !Emojify.options.parse.unicode ) return str;

      let data = await EmojiData.get ();

      for ( let [char, name] of data.chars ) {

        let emoji = await Emoji.getByName ( name ),
            tones = emoji.tones ? 6 : 1;

        for ( let i = 6, l = 1; i >= l; i-- ) {

          let unicode = await Emoji.emoji2unicode ( emoji, i );

          if ( str.indexOf ( unicode ) === -1 ) continue;

          str = str.replace ( unicode, await Emoji.make ( name, i ) );

        }

      }

      return str;

    },

    async parseEmoticon ( str ) { //FIXME: Won't work if we are parsing a `:/` emoticon and we have `http://` for instance (we should check if there's another forward slash immediately following the emoticon)

      if ( !Emojify.options.parse.emoticon ) return str;

      let emoticons = Emojify.getEmoticons ( str );

      for ( let emoticon of emoticons ) {

        let emoji = await Emoji.getByEmoticon ( emoticon );

        if ( !emoji ) continue;

        str = str.replace ( emoticon, await Emoji.make ( emoji.id ) );

      }

      return str;

    },

    async parseEncoded ( str ) {

      if ( !Emojify.options.parse.encoded ) return str;

      let matches = Emojify.getEncoded ( str );

      for ( let match in matches ) {

        let {name, tone} = matches[match],
            emoji = await Emoji.getByName ( name );

        if ( !emoji ) continue;

        str = str.replace ( match, await Emoji.make ( emoji.id, tone ) );

      }

      return str;

    },

    /* API */

    async emojify ( target ) {

      if ( target instanceof $ ) {

        return Promise.all ( target.get ().map ( Emojify.node ) );

      } else if ( _.isElement ( target ) ) {

        return Emojify.node ( target );

      } else if ( _.isString ( target ) ) {

        return Emojify.string ( target );

      }

    },

    async string ( str ) {

      return Emojify.parseUnicode ( str )
                    .then ( Emojify.parseEmoticon )
                    .then ( Emojify.parseEncoded );

    },

    async node ( node ) {

      let type = node.nodeType;

      if ( type === 3 ) { // Text node

        let value = node.nodeValue,
            parsed = await Emojify.string ( value );

        if ( value !== parsed ) {

          if ( Emoji.options.native.enabled && !Emoji.options.native.wrap ) {

            node.nodeValue = parsed;

          } else {

            let replacement = $.parseHTML ( `<span>${parsed}</span>` )[0];

            node.parentNode.replaceChild ( replacement, node );

          }

        }

      } else if ( type === 1 ) { // Element node

        return Promise.all ( Array.prototype.map.call ( node.childNodes, Emojify.node ) );

      }

    }

  };

  /* PLUGIN */

  $.fn.emojify = function () {

    Emojify.emojify ( this );

  };

  /* WIDGETIZE */

  Widgetize.add ( '.emojify', Emojify.emojify );

  /* EXPORT */

  Svelto.Emojify = Emojify;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgetize, Svelto.EmojiData, Svelto.Emoji ));
