
// @require ../init.js
// @require core/lodash/lodash.js

(function ( $, _ ) {

  /* IS WIDGET */ // Checks if a variable is probably a widget //FIXME: Not very robust

  $.isWidget = function ( x ) {

    return _.isFunction ( x ) && _.isObject ( x.config ) && _.isString ( x.config.name );

  };

}( window.__svelto_jquery, window.__svelto_lodash ));
