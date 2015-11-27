
/* =========================================================================
 * Svelto - Droppable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'droppable',
    options: {
      selector: '*',
      callbacks: {
        enter () {},
        leave () {},
        drop () {}
      }
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

      this.droppable = this.element;
      this.$droppable = this.$element;

      this._wasInside = false;

    }

    _events () {

      /* DRAG MOVE */

      this._on ( $document, 'draggable:move', this._throttle ( this.__dragMove, 100 ) );

      /* DRAG END */

      this._on ( $document, 'draggable:end', this.__dragEnd );

    }

    /* PRIVATE */

    __dragMove ( event, data ) {

      let isInside = this._isInside ( event, data );

      if ( isInside !== this._wasInside ) {

        if ( isInside ) {

          this._trigger ( 'enter', { draggable: data.draggable, droppable: this.droppable } );

        } else {

          this._trigger ( 'leave', { draggable: data.draggable, droppable: this.droppable } );

        }

      }

      this._wasInside = isInside;

    }

    __dragEnd ( event, data ) {

      if ( this._isInside ( event, data ) ) {

        if ( this._wasInside ) {

          this._trigger ( 'leave', { draggable: data.draggable, droppable: this.droppable } );

        }

        this._trigger ( 'drop', { draggable: data.draggable, droppable: this.droppable } );

      }

    }

    _isInside ( event, data ) {

      var $draggable = $(data.draggable);

      if ( $draggable.is ( this.options.selector ) ) {

        var rect = this.$droppable.getRect (),
            eventXY = $.eventXY ( data.event ),
            pointXY = {
              X: eventXY.X - $window.scrollTop (),
              Y: eventXY.Y - $window.scrollLeft ()
            };

        if ( pointXY.X >= rect.left && pointXY.X <= rect.right && pointXY.Y >= rect.top && pointXY.Y <= rect.bottom ) {

          return true;

        }

      }

      return false;

    }

  }

  /* BINDING */

  Svelto.Droppable = Droppable;
  Svelto.Droppable.config = config;

  /* FACTORY */

  $.factory ( Svelto.Droppable );

}( Svelto.$, Svelto._, window, document ));
