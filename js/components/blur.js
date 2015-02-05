
/* BLUR */

$.fn.blur = function ( activate ) {

    return this.each ( function ( node ) {

        $(node).toggleClass ( 'blur', activate );

    });

};
