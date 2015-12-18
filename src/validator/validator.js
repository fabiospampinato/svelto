
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
      return !!value.match ( RegExes.alpha );
    },
    alphanumeric ( value ) {
      return !!value.match ( RegExes.alphanumeric );
    },
    hexadecimal ( value ) {
      return !!value.match ( RegExes.hexadecimal );
    },
    number ( value ) {
      return !!value.match ( RegExes.integer ) || !!value.match ( RegExes.float );
    },
    integer ( value ) {
      return !!value.match ( RegExes.integer );
    },
    float ( value ) {
      return !!value.match ( RegExes.float );
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
      return !!value.match ( RegExes.email );
    },
    cc ( value ) {
      return !!value.match ( RegExes.cc );
    },
    ssn ( value ) {
      return !!value.match ( RegExes.ssn );
    },
    ipv4 ( value ) {
      return !!value.match ( RegExes.ipv4 );
    },
    url ( value ) {
      return !!value.match ( RegExes.url );
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
