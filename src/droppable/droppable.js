
/* =========================================================================
 * Svelto - Droppable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../touching/touching.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'droppable',
    plugin: true,
    selector: '.droppable',
    options: {
      selector: '*',
      classes: {
        droppable: false, //INFO: The class to attach to the droppable if the draggable can be dropped inside of it
        hover: false //INFO: The class to attach to the droppable when hovered by a draggable
      },
      callbacks: {
        enter: _.noop,
        leave: _.noop,
        drop: _.noop
      }
    }
  };

  /* DROPPABLE */

  class Droppable extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.droppable = this.element;
      this.$droppable = this.$element;

      this.__isCompatible = undefined;
      this._wasHovering = false;

    }

    _events () {

      /* DRAG MOVE */

      this._on ( $document, 'draggable:move', this._throttle ( this.__dragMove, 100 ) );

      /* DRAG END */

      this._on ( $document, 'draggable:end', this.__dragEnd );

    }

    /* PRIVATE */

    _isCompatible ( element ) {

      if ( _.isUndefined ( this.__isCompatible ) ) {

        this.__isCompatible = $(element).is ( this.options.selector );

        if ( this.__isCompatible ) {

          this.$droppable.addClass ( this.options.classes.droppable );

        }

      }

      return this.__isCompatible;

    }

    _isPointHovering ( pointXY ) {

      return !!this.$droppable.touching ({ point: pointXY }).length;

    }

    /* DRAG MOVE */

    __dragMove ( event, data ) {

      if ( this._isCompatible ( data.draggable ) ) {

        let isHovering = this._isPointHovering ( data.moveXY );

        if ( isHovering !== this._wasHovering ) {

          this.$droppable.toggleClass ( this.options.classes.hover, isHovering );

          this._trigger ( isHovering ? 'enter' : 'leave', { draggable: data.draggable, helper: data.helper, droppable: this.droppable } );

        }

        this._wasHovering = isHovering;

      }

    }

    /* DRAG END */

    __dragEnd ( event, data ) {

      if ( this._isCompatible ( data.draggable ) ) {

        this.$droppable.removeClass ( this.options.classes.droppable );

        if ( this._isPointHovering ( data.endXY ) ) {

          if ( this._wasHovering ) {

            this.$droppable.removeClass ( this.options.classes.hover );

          }

          this._trigger ( 'drop', { draggable: data.draggable, helper: data.helper, droppable: this.droppable } );

        }

      }

      this.__isCompatible = undefined;

    }

  }

  /* FACTORY */

  $.factory ( Droppable, config, Svelto );

}( Svelto.$, Svelto._, window, document ));
