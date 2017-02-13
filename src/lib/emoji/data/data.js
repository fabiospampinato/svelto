
/* =========================================================================
 * Svelto - Lib - Emoji - Data
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./raw/raw.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto, EmojiDataRaw ) {

  'use strict';

  /* EMOJI DATA */

  let EmojiData = {

    /* VARIABLES */

    _raw: EmojiDataRaw,
    _rawUrl: '/json/emoji.json',
    _data: undefined,

    /* UTILITIES */

    _parse ( data ) {

      // data = JSON.parse ( JSON.stringify ( data ) );

      data.alts = {};
      // data.chars = [];
      data.emojis = {};
      data.emoticons = {};

      for ( let category of data.categories ) {

        for ( let emoji of category.emojis ) {

          if ( emoji.alts ) {

            emoji.alts.forEach ( alt => data.alts[alt] = emoji );

          }

          // data.chars.push ([ emoji.char, emoji.id ]);

          data.emojis[emoji.id] = emoji;

          if ( emoji.emoticons ) {

            emoji.emoticons.forEach ( emoticon => {

              let prev = data.emoticons[emoticon];

              if ( _.isUndefined ( prev ) ) {

                data.emoticons[emoticon] = emoji;

              } else if ( _.isArray ( prev ) ) {

                data.emoticons[emoticon].push ( emoji );

              } else {

                data.emoticons[emoticon] = [prev, emoji];

              }

            });

          }

        }

      }

      // data.chars = data.chars.sort ( ( a, b ) => b[0].length - a[0].length );

      return data;

    },

    /* METHODS */

    async getRemoteRaw () {

      return $.uniqueAjax ( 'EmojiDataRaw', EmojiData._rawUrl );

    },

    async getRaw () {

      if ( EmojiData._raw ) return EmojiData._raw;

      return EmojiData._raw = await EmojiData.getRemoteRaw ();

    },

    async get () {

      if ( EmojiData._data ) return EmojiData._data;

      let raw = await EmojiData.getRaw ();

      if ( EmojiData._data ) return EmojiData._data; // It may have been already parsed by another concurrent call

      return EmojiData._data = EmojiData._parse ( raw );

    }

  };

  /* EXPORT */

  Svelto.EmojiData = EmojiData;

}( Svelto.$, Svelto._, Svelto, Svelto.EmojiDataRaw ));
