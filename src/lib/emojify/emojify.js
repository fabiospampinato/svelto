
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
        emoticon: true,
        encoded: true,
        unicode: false //FIXME: Doesn't work properly, and it's very slow
      }
    },

    /* UTILITIES */

    getEmoticons ( str ) {

      return _.findMatches ( str, Emoji.options.regexes.emoticon )
              .map ( _.first )
              .sort ( ( a, b ) => b.length - a.length );

    },

    getEncoded ( str ) {

      let matches = _.findMatches ( str, Emoji.options.regexes.encoded )
                     .sort ( ( a, b ) => b[0].length - a[0].length );

      return matches.reduce ( ( acc, match ) => _.set ( acc, match[0], {
        name: match[1],
        tone: match[3] || Emoji.options.tone
      }), {} );

    },

    /* PARSE */

    async parseEmoticon ( str, options ) { //FIXME: Won't work if we are parsing a `:/` emoticon and we have `http://` for instance (we should check if there's another forward slash immediately following the emoticon)

      if ( !Emojify.options.parse.emoticon ) return str;

      let emoticons = Emojify.getEmoticons ( str );

      for ( let emoticon of emoticons ) {

        let emoji = await Emoji.getByEmoticon ( emoticon, true );

        if ( !emoji ) continue;

        str = _.replaceAll ( str, emoticon, await Emoji.make ( emoji.id, Emoji.options.tone, options ) );

      }

      return str;

    },

    async parseEncoded ( str, options ) {

      if ( !Emojify.options.parse.encoded ) return str;

      let matches = Emojify.getEncoded ( str );

      for ( let match in matches ) {

        let {name, tone} = matches[match],
            emoji = await Emoji.getByName ( name );

        if ( !emoji ) continue;

        str = _.replaceAll ( str, match, await Emoji.make ( emoji.id, tone, options ) );

      }

      return str;

    },

    async parseUnicode ( str, options ) {

      if ( !Emojify.options.parse.unicode ) return str;

      let data = await EmojiData.get ();

      for ( let [char, name] of data.chars ) {

        let emoji = await Emoji.getByName ( name ),
            tones = emoji.tones ? 6 : 1;

        for ( let i = 6, l = 1; i >= l; i-- ) {

          let unicode = await Emoji.emoji2unicode ( emoji, i );

          if ( str.indexOf ( unicode ) === -1 ) continue;

          str = _.replaceAll ( str, unicode, await Emoji.make ( name, i, options ) );

        }

      }

      return str;

    },

    /* API */

    async emojify ( target, options ) {

      if ( target instanceof $ ) {

        return Promise.all ( target.get ().map ( node => Emojify.node ( node, options ) ) );

      } else if ( _.isElement ( target ) ) {

        return Emojify.node ( target, options );

      } else if ( _.isString ( target ) ) {

        return Emojify.string ( target, options );

      }

    },

    async string ( str, options ) {

      return Emojify.parseUnicode ( str, options )
                    .then ( str => Emojify.parseEncoded ( str, options ) )
                    .then ( str => Emojify.parseEmoticon ( str, options ) );

    },

    async node ( node, options ) {

      let type = node.nodeType;

      if ( type === 3 ) { // Text node

        let value = node.nodeValue,
            parsed = await Emojify.string ( value, options );

        if ( value !== parsed ) {

          if ( Emoji.options.native.enabled && !Emoji.options.native.wrap ) {

            node.nodeValue = parsed;

          } else {

            let parent = node.parentNode;

            if ( parent.childNodes.length === 1 ) {

              parent.innerHTML = parsed;

            } else {

              let replacement = $.parseHTML ( `<span>${parsed}</span>` )[0];

              node.parentNode.replaceChild ( replacement, node );

            }

          }

        }

      } else if ( type === 1 ) { // Element node

        return Promise.all ( Array.prototype.map.call ( node.childNodes, node => Emojify.node ( node, options ) ) );

      }

    }

  };

  /* PLUGIN */

  $.fn.emojify = function ( options ) {

    return Emojify.emojify ( this, options );

  };

  /* WIDGETIZE */

  Widgetize.add ( '.emojify', Emojify.emojify );

  /* EXPORT */

  Svelto.Emojify = Emojify;

}( Svelto.$, Svelto._, Svelto, Svelto.Widgetize, Svelto.EmojiData, Svelto.Emoji ));
