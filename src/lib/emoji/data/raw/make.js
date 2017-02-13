
/* =========================================================================
 * Svelto - Lib - Emoji - Data - Raw (Make)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

//TODO: Maybe add a gulp task for executing this file

/* REQUIRE */

const _          = require ( 'lodash' ),
      fs         = require ( 'fs' ),
      countries  = require ( 'country-data' ).countries,
      emojiData  = require ( 'emoji-datasource' ),
      emojiLib   = require ( 'emojilib' ),
      inflection = require ( 'inflection' );

/* UTILITIES */

function hex2dec ( hex ) {

  return hex.includes ( '-' ) ? hex.split ( '-' ).map ( hex2dec ) : parseInt ( hex, 16 );

}

function dec2char ( dec ) {

  return String.fromCodePoint ( ..._.castArray ( dec ) );

}

/* DATA */

const categories = ['People',           'Nature',            'Foods',          'Activity',       'Places',          'Objects',       'Symbols',  'Flags'],
      titles     = ['Smileys & People', 'Animals & Nature',  'Food & Drink',   'Activity',       'Travel & Places', 'Objects',       'Symbols',  'Flags'],
      icons      = ['insert_emoticon',  'pets',              'restaurant',     'fitness_center', 'directions_car',  'devices_other', 'favorite', 'flag'],
      data       = { categories: [], tones: {} },
      indexes    = {};

categories.forEach ( ( category, i ) => {

  data.categories[i] = {
    name: category,
    title: titles[i],
    icon: icons[i],
    emojis: []
  };

  indexes[category] = i;

});

emojiData.sort ( ( a, b ) => {

  const aTest = a.sort_order || a.short_name,
        bTest = b.sort_order || b.short_name;

  return aTest - bTest;

});

emojiData.forEach ( datum => {

  datum.name || (datum.name = datum.short_name.replace ( /\-/g, ' ' ) );
  datum.name = inflection.titleize ( datum.name || '' );

  if ( datum.category === 'Flags' ) {
    const code = datum.short_name.split ( '-' )[1].toUpperCase ();
    datum.name = `Flag of ${countries[code].name}`;
  }

  if ( datum.texts && datum.texts.length ) {
    datum.emoticons = datum.texts;
  } else if ( datum.text ) {
    datum.emoticons = [datum.text];
  }

  if ( emojiLib.lib[datum.short_name] ) {
    datum.tags = emojiLib.lib[datum.short_name].keywords.join ();
  }

  if ( datum.category === 'Skin Tones' ) {
    const id = _.last ( datum.short_name );
    datum.id = Number ( id );
    data.tones[id] = datum;
  } else {
    datum.id = datum.short_name;
    data.categories[indexes[datum.category]].emojis.push ( datum );
  }

  if ( datum.id === 'sunglasses' ) {
    datum.emoticons.push ( '8-)' );
  }

  if ( 'skin_variations' in datum ) datum.tones = 1;

  if ( datum.short_names.length > 1 ) {
    datum.alts = datum.short_names.slice ( 1 );
  }

  if ( datum.category !== 'Skin Tones' ) {
    let parts = [];
    parts.push ( datum.id.split ( /[_-]/ ).map ( _.lowerCase ) );
    parts.push ( datum.name.split ( /[ _-]/ ).map ( _.lowerCase ) );
    if ( datum.alts ) parts.push ( datum.alts.map ( s => s.split ( '_' ).map ( _.lowerCase ) ) );
    if ( datum.tags ) parts.push ( datum.tags.split ( ',' ).map ( _.lowerCase ) );
    if ( datum.emoticons ) parts.push ( datum.emoticons );
    datum.tags = _.uniq ( _.compact ( _.flatten ( parts ) ) ).sort ();
  }

  datum.char = dec2char ( hex2dec ( datum.unified ) );
  datum.x = ( datum.sheet_x * 41 ) + datum.sheet_y;

  delete datum.au;
  delete datum.category;
  delete datum.docomo;
  delete datum.google;
  delete datum.has_img_apple;
  delete datum.has_img_emojione;
  delete datum.has_img_google;
  delete datum.has_img_twitter;
  delete datum.image;
  delete datum.sheet_x;
  delete datum.sheet_y;
  delete datum.short_name;
  delete datum.short_names;
  delete datum.skin_variations;
  delete datum.softbank;
  delete datum.sort_order;
  delete datum.text;
  delete datum.texts;
  delete datum.unified;
  delete datum.variations;

});

/* FLAGS */

const flags = data.categories[indexes['Flags']];

flags.emojis = _.sortBy ( flags.emojis, emoji => emoji.id );

/* TONES */

data.tones[1] = {
  name: "Emoji Modifier Fitzpatrick Type-1",
  id: 1,
  char: '',
  x: 491
};

data.tones[2].name = data.tones[2].name.replace ( 'Type-1-2', 'Type-2' );

/* WRITE */

const content = JSON.stringify ( data, undefined, 2 );

fs.writeFile ( 'emoji.json', content );
fs.writeFile ( 'raw.js', `
/* @require core/svelto/svelto.js */
Svelto.EmojiDataRaw = ${content};
`);
