
// @require ./is_focused.js

(function ( $ ) {

  /* IS EDITABLE */

  $.isEditable = function ( ele ) {

    return $(ele).is ( 'input, textarea, [contenteditable]' );

  };

  $.fn.isEditable = function () {

    return $.isEditable ( this[0] );

  };

}( window.$ ));
