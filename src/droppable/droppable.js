
/* =========================================================================
 * Svelto - Droppable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

//TODO: Add a anction on hovering

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'droppable',
      selector: '*',
      callbacks: {
        drop () {}
      }
  };

  /* DROPPABLE */

  class Droppable extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.droppable' ).droppable ();
      $root.filter ( '.droppable' ).droppable ();

    }

    _variables () {

      this.$droppable = this.$element;

    }

    _events () {

      /* DRAG END */

      this._on ( $document, 'draggable:end', this.__dragEnd );

    }

    /* PRIVATE */

    __dragEnd ( event, data ) {

      var $draggable = $(data.draggable);

      if ( $draggable.is ( this.options.selector ) ) {

        var rect = this.$droppable.getRect (),
            eventXY = $.eventXY ( data.event ),
            pointXY = {
              X: eventXY.X - $window.scrollTop (),
              Y: eventXY.Y - $window.scrollLeft ()
            };

        if ( pointXY.X >= rect.left && pointXY.X <= rect.right && pointXY.Y >= rect.top && pointXY.Y <= rect.bottom ) {

          this._trigger ( 'drop', { draggable: data.draggable, droppable: this.element } );

        }

      }

    }

  }

  /* BINDING */

  Svelto.Droppable = Droppable;
  Svelto.Droppable.config = config;

  /* FACTORY */

  $.factory ( Svelto.Droppable );

}( Svelto.$, Svelto._, window, document ));
