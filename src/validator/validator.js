
/* =========================================================================
 * Svelto - Validator
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../svelto/svelto.js
 * @requires ../regexes/regexes.js
 * ========================================================================= */

//INFO: `value` is supposed to be a string
//INFO: Strings will be trimmed inside some validators

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VALIDATOR */

  window.Validator = {

    /* TYPE */

    alpha ( value ) {
      return !!value.match ( Svelto.regexes.alpha );
    },
    alphanumeric ( value ) {
      return !!value.match ( Svelto.regexes.alphanumeric );
    },
    hexadecimal ( value ) {
      return !!value.match ( Svelto.regexes.hexadecimal );
    },
    number ( value ) {
      return !!value.match ( Svelto.regexes.integer ) || !!value.match ( Svelto.regexes.float );
    },
    integer ( value ) {
      return !!value.match ( Svelto.regexes.integer );
    },
    float ( value ) {
      return !!value.match ( Svelto.regexes.float );
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
      return !!value.match ( Svelto.regexes.email );
    },
    cc ( value ) {
      return !!value.match ( Svelto.regexes.cc );
    },
    ssn ( value ) {
      return !!value.match ( Svelto.regexes.ssn );
    },
    ipv4 ( value ) {
      return !!value.match ( Svelto.regexes.ipv4 );
    },
    url ( value ) {
      return !!value.match ( Svelto.regexes.url );
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

}( Svelto.$, Svelto._, window, document ));
