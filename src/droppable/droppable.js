
/* =========================================================================
 * Svelto - Droppable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../touching/touching.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'droppable',
    selector: '.droppable',
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

        if ( this._wasInside ) { //FIXME: Should it be fired???

          this._trigger ( 'leave', { draggable: data.draggable, droppable: this.droppable } );

        }

        this._trigger ( 'drop', { draggable: data.draggable, droppable: this.droppable } );

      }

    }

    _isInside ( event, data ) {

      var $draggable = $(data.draggable);

      if ( $draggable.is ( this.options.selector ) ) {

        return this.$droppable.touching ({ point: $.eventXY ( data.event ) }).length > 0;

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
