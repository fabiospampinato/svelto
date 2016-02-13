
/* =========================================================================
 * Svelto - Validator
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../svelto/svelto.js
 * @require ../regexes/regexes.js
 * ========================================================================= */

// `value` is supposed to be a string
// Strings will be trimmed inside some validators

(function ( $, _, Svelto, Regexes ) {

  'use strict';

  /* VALIDATOR */

  let Validator = {

    /* TYPE */

    alpha ( value ) {
      return !!value.match ( Regexes.alpha );
    },
    alphanumeric ( value ) {
      return !!value.match ( Regexes.alphanumeric );
    },
    hexadecimal ( value ) {
      return !!value.match ( Regexes.hexadecimal );
    },
    number ( value ) {
      return !!value.match ( Regexes.integer ) || !!value.match ( Regexes.float );
    },
    integer ( value ) {
      return !!value.match ( Regexes.integer );
    },
    float ( value ) {
      return !!value.match ( Regexes.float );
    },

    /* NUMBER */

    min ( value, min ) {
      return ( Number ( value ) >= Number ( min ) );
    },
    max ( value, max ) {
      return ( Number ( value ) <= Number ( max ) );
    },
    range ( value, min, max ) {
      value = Number ( value );
      return ( value >= Number ( min ) && value <= Number ( max ) );
    },

    /* LENGTH */

    minLength ( value, minLength ) {
      return ( value.trim ().length >= Number ( minLength ) );
    },
    maxLength ( value, maxLength ) {
      return ( value.trim ().length <= Number ( maxLength ) );
    },
    rangeLength ( value, minLength, maxLength ) {
      value = value.trim ();
      return ( value.length >= Number ( minLength ) && value.length <= Number ( maxLength ) );
    },
    exactLength ( value, length ) {
      return ( value.trim ().length === Number ( length ) );
    },

    /* THINGS */

    email ( value ) {
      return !!value.match ( Regexes.email );
    },
    cc ( value ) {
      return !!value.match ( Regexes.cc );
    },
    ssn ( value ) {
      return !!value.match ( Regexes.ssn );
    },
    ipv4 ( value ) {
      return !!value.match ( Regexes.ipv4 );
    },
    url ( value ) {
      return !!value.match ( Regexes.url );
    },

    /* OTHERS */

    empty ( value ) {
      return _.isEmpty ( value.trim () );
    },
    included ( value, values ) {
      value = value.toLowerCase ();
      values = values.map ( value => value.toLowerCase () );
      return _.includes ( values, value );
    }

  };

  /* EXPORT */

  Svelto.Validator = Validator;

}( Svelto.$, Svelto._, Svelto, Svelto.Regexes ));