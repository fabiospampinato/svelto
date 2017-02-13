
/* =========================================================================
 * Svelto - Lib - Emoji
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./data/data.js
 * @require ./test.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Modernizr, Svelto, EmojiData ) {

  'use strict';

  /* EMOJI */

  let Emoji = {

    /* OPTIONS */

    options: {
      tone: 1, // Default tone
      regexes: {
        encoded: /:([a-zA-Z0-9+_-]+):(:tone-([1-6]):)?/g,
        emoticon: /(:o\))|(=-?\))|(;-?[bpP)])|(:-?[bdDoOpP>|()\\\/*])|(8-?\))|([cCD()]:)|(<\/?3)|(>:-?\()|(:'\()/g,
      },
      make: {
        css: '', // Additional wrapper classes
        sprite: false // Whether we should a sprite instead of single images
      },
      native: {
        enabled: Modernizr.emoji, // If enabled the unicode character will be used
        wrap: true // If enabled the emoji will be wrapped by a `i.emoji` element
      },
      image: {
        path: '//cdn.jsdelivr.net/emojione/assets/png/$1.png'
      },
      sprite: {
        columns: 41 // Number of columns in the sprite
      }
    },

    /* METHODS */

    async getByName ( name ) {

      let data = await EmojiData.get ();

      return data.emojis[name] || data.alts[name];

    },

    async getByEmoticon ( emoticon, single = false ) {

      let data = await EmojiData.get (),
          found = data.emoticons[emoticon];

      return single && _.isArray ( found ) ? found[0] : found;

    },

    async getByUnicode ( unicode ) {}, //TODO

    async getTone ( nr ) {

      let data = await EmojiData.get ();

      return data.tones[nr];

    },

    async emoji2hex ( emoji, tone = Emoji.options.tone ) {

      let codes = _.range ( emoji.char.length )
                   .map ( nr => emoji.char.codePointAt ( nr ) )
                   .filter ( c => c !== 0x200d && c !== 0xfe0f && ( c < 0xd800 || c > 0xdfff ) );

      if ( tone > 1 ) {

        tone = await Emoji.getTone ( tone );

        codes.push ( tone.char.codePointAt ( 0 ) );

      }

      return codes.map ( c => _.padStart ( c.toString ( 16 ), 4, 0 ) ).join ( '-' );

    },

    async hex2emoji () {}, //TODO

    async emoji2unicode ( emoji, tone = Emoji.options.tone ) {

      emoji = _.isString ( emoji ) ? await Emoji.getByName ( emoji ) : emoji;

      if ( !emoji ) return '';

      if ( !emoji.tones || tone < 2 ) return emoji.char;

      tone = await Emoji.getTone ( tone );

      return `${emoji.char}${tone.char}`;

    },

    async unicode2emoji ( unicode ) {}, //TODO

    async getImageUrl ( emoji, tone = Emoji.options.tone ) {

      let hex = await Emoji.emoji2hex ( emoji, tone );

      return _.format ( Emoji.options.image.path, hex );

    },

    getSpriteXY ( emoji, tone = Emoji.options.tone ) {

      let position = emoji.x + tone - 1,
          x = Math.floor ( position / Emoji.options.sprite.columns ),
          y = position % Emoji.options.sprite.columns;

      return {x, y};

    },

    encode ( emoji, tone = Emoji.options.tone ) {

      let name = _.isString ( emoji ) ? emoji : emoji.id;

      return tone > 1 ? `:${name}::tone-${tone}:` : `:${name}:`;

    },

    async make ( emoji, tone = Emoji.options.tone, options = Emoji.options.make ) {

      emoji = _.isString ( emoji ) ? await Emoji.getByName ( emoji ) : emoji;

      if ( !emoji ) return '';

      tone = emoji.tones ? tone : 1;

      if ( Emoji.options.native.enabled ) {

        let unicode = await Emoji.emoji2unicode ( emoji, tone );

        if ( Emoji.options.native.wrap ) {

          return `<i class="emoji ${options.css}" data-id="${emoji.id}" data-tone="${tone}" data-tonable="${!!emoji.tones}" title="${emoji.name}">${unicode}</i>`;

        } else {

          return unicode;

        }

      } else {

        if ( options.sprite ) {

          let {x, y} = Emoji.getSpriteXY ( emoji, tone ),
              scale = 100 / ( Emoji.options.sprite.columns - 1 ),
              posX = x * scale,
              posY = y * scale;

          return `<i class="emoji ${options.css}" data-id="${emoji.id}" data-tone="${tone}" data-tonable="${!!emoji.tones}" title="${emoji.name}" style="background-position:${posX}% ${posY}%"></i>`;

        } else {

          let url = await Emoji.getImageUrl ( emoji, tone );

          return `<i class="emoji ${options.css}" data-id="${emoji.id}" data-tone="${tone}" data-tonable="${!!emoji.tones}" title="${emoji.name}" style="background-image:url(${url})"></i>`;

        }

      }

    }

  };

  /* EXPORT */

  Svelto.Emoji = Emoji;

}( Svelto.$, Svelto._, Svelto.Modernizr, Svelto, Svelto.EmojiData ));
