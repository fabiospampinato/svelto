
// @require ../init.js

(function ( $ ) {

  /* FIND ALL */ // Like find, but can also include the root elements

  $.fn.findAll = function ( selector ) {

    const $self = this.filter ( selector ),
          $nested = this.find ( selector );

    return $self.length
             ? $nested.length
               ? $nested.add ( $self )
               : $self
             : $nested;

  };

}( window.$ ));

