
// @require ../init.js

(function ( $ ) {

  /* OUTER HTML */

  $.fn.outerHTML = function ( replacement ) {

    let html = '';

    for ( let i = 0, l = this.length; i < l; i++ ) {

      if ( replacement ) {

        this[i].outerHTML = replacement;

      } else {

        html += this[i].outerHTML;

      }

    }

    return html || this;

  };

}( window.$ ));
