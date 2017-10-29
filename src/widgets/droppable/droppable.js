
/* =========================================================================
 * Svelto - Widgets - Droppable
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/touching/touching.js
 * @require widgets/draggable/draggable.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'droppable',
    plugin: true,
    selector: '.droppable',
    options: {
      selector: '*', // Only Draggables matching this selector will be able to drop inside this Droppable
      classes: {
        target: undefined, // The class to attach to the Droppable if the Draggable can be dropped inside of it
        hover: undefined // The class to attach to the Droppable when hovered by a Draggable
      },
      callbacks: {
        enter: _.noop,
        leave: _.noop,
        drop: _.noop
      }
    }
  };

  /* DROPPABLE */

  class Droppable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.droppable = this.element;
      this.$droppable = this.$element;

      this.__isCompatible = undefined;
      this._wasHovering = false;

    }

    _events () {

      this.___drag ();

    }

    /* PRIVATE */

    _isCompatible ( element ) {

      if ( _.isUndefined ( this.__isCompatible ) ) {

        this.__isCompatible = $(element).is ( this.options.selector );

        if ( this.__isCompatible ) {

          this.$droppable.addClass ( this.options.classes.target );

        }

      }

      return this.__isCompatible;

    }

    _isPointHovering ( pointXY, event  ) {

      let point = pointXY || $.eventXY ( event, 'clientX', 'clientY' );

      return !!this.$droppable.touching ({ point }).length;

    }

    /* DRAG */

    ___drag () {

      this.___dragMove ();
      this.___dragEnd ();

    }

    /* DRAG MOVE */

    ___dragMove () {

      this._on ( this.$layout, 'draggable:move', this._frames ( this.__dragMove.bind ( this ) ) );

    }

    __dragMove ( event, data ) {

      if ( !this._isCompatible ( data.draggable ) ) return;

      let isHovering = this._isPointHovering ( false, data.moveEvent );

      if ( isHovering !== this._wasHovering ) {

        this.$droppable.toggleClass ( this.options.classes.hover, isHovering );

        this._trigger ( isHovering ? 'enter' : 'leave', { draggable: data.draggable, helper: data.helper, droppable: this.droppable } );

      }

      this._wasHovering = isHovering;

    }

    /* DRAG END */

    ___dragEnd () {

      this._on ( this.$layout, 'draggable:end', this.__dragEnd );

    }

    __dragEnd ( event, data ) {

      if ( this._isCompatible ( data.draggable ) ) {

        this.$droppable.removeClass ( this.options.classes.target );

        if ( this._isPointHovering ( false, data.endEvent ) ) {

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

  Factory.make ( Droppable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
