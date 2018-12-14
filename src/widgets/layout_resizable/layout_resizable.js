
// @require core/widget/widget.js
// @require widgets/draggable/draggable.js

(function ( $, _, Svelto, Factory ) {

  /* CONFIG */

  let config = {
    name: 'layoutResizable',
    plugin: true,
    selector: '.layout.resizable',
    templates: {
      sash: _.template ( '<div class="sash"></div>' )
    },
    options: {
      classes: {
        horizontal: 'horizontal',
        nosash: 'no-sash'
      }
    }
  };

  /* LAYOUT RESIZER */

  class LayoutResizer extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$layout = this.$element;
      this.$panes = this.$layout.children ();
      this.$sashes = $.$empty;
      this.isHorizontal = this.$layout.hasClass ( this.options.classes.horizontal );
      this.mapping = {}; // id => [$pane, $sash, hasSash, isResizable, minDimension, dimension]

    }

    _init () {

      this._initMapping ();

      this.$layout.prepend ( this.$sashes );

      this._updateDimension ();
      this._updateMapping ();
      this._updatePanes ();
      this._updateSashes ();

    }

    _events () {

      this.___drag ();
      this.___resize ();

    }

    /* HELPERS */

    _initMapping () {

      this.$panes.get ().forEach ( ( pane, id ) => {

        const $pane = $(pane),
              isLast = id === ( this.$panes.length - 1 ),
              hasSash = !isLast && !$pane.hasClass ( this.options.classes.nosash ),
              isResizable = hasSash || ( id && this.mapping[id - 1][2] ),
              $sash = hasSash ? $(this._template ( 'sash' )) : undefined,
              minDimensionRaw = parseFloat ( $pane.css ( this.isHorizontal ? 'min-width' : 'min-height' ) ),
              minDimension = minDimensionRaw || ( parseFloat ( $pane.css ( this.isHorizontal ? 'padding-left' : 'padding-top' ) ) + parseFloat ( $pane.css ( this.isHorizontal ? 'padding-right' : 'padding-bottom' ) ) ) || 0,
              dimension = 0;

        this.mapping[id] = [$pane, $sash, hasSash, isResizable, minDimension, dimension];

        if ( !hasSash ) return;

        $sash[0]._resid = id;

        this.$sashes = this.$sashes.add ( $sash );

      });

    }

    _updateDimension () {

      this.dimension = this.isHorizontal ? this.$layout.outerWidth () : this.$layout.outerHeight ();

    }

    _updateMapping () {

      for ( let id in this.mapping ) {
        const mapping = this.mapping[id];
        const dimension = this.isHorizontal ? mapping[0].outerWidth () : mapping[0].outerHeight ();
        mapping[5] = dimension;
      }

    }

    _updatePanes () {

      for ( let id in this.mapping ) {
        const [$pane, $sash, hasSash, isResizable, minDimension, dimension] = this.mapping[id];
        this.isHorizontal ? $pane.css ( 'width', dimension ) : $pane.css ( 'height', dimension );
        if ( !isResizable ) continue;
        $pane.css ( 'flex-grow', dimension ); // So that panes scale properly on resize
      }

    }

    _updateSashes () {

      let offset = 0;

      for ( let id in this.mapping ) {
        const [$pane, $sash, hasSash, isResizable, minDimension, dimension] = this.mapping[id];
        offset += dimension;
        if ( !$sash ) continue;
        this.isHorizontal ? $sash.translateX ( offset ) : $sash.translateY ( offset );
      }

    }

    /* DRAGGING */

    ___drag () {

      this.$sashes.draggable ({
        axis: this.isHorizontal ? 'x' : 'y',
        callbacks: {
          start: this.__dragStart.bind ( this ),
          move: this.__dragMove.bind ( this ),
          end: this.__dragEnd.bind ( this )
        }
      });

    }

    __dragStart ( event, data ) {

      this._prevMoveXY = data.startXY;

    }

    __dragMove ( event, data ) {

      const {draggable, moveXY} = data,
            deltaDimension = this.isHorizontal ? moveXY.x - this._prevMoveXY.x : moveXY.y - this._prevMoveXY.y,
            id = draggable._resid;

      if ( !deltaDimension ) return;

      // We are starting by decrementing because we can actually determine when we've reached the limit

      let decSign = Math.sign ( deltaDimension ), // Direction of the decrement
          decId = decSign > 0 ? id + 1 : id, // Next id to target
          remDimension = Math.abs ( deltaDimension ), // Amount of remaining dimension left to distribute
          accDimension = 0; // Amount of accumulated dimension that has been redistributed

      while ( true ) {

        const mapping = this.mapping[decId];

        if ( !mapping ) break;

        if ( mapping[3] ) {

          const dimensionNext = Math.max ( mapping[4], mapping[5] - remDimension ),
                distributedDimension = mapping[5] - dimensionNext;

          accDimension += distributedDimension;
          remDimension -= distributedDimension;

          mapping[5] = dimensionNext;

          if ( !remDimension ) break;

        }

        decId += decSign;

      }

      if ( !accDimension ) return;

      this._prevMoveXY = data.moveXY; // If this event didn't cause any change, we don't consider it at all

      const incSign = - decSign, // Direction of the increment
            incId = incSign > 0 ? id + 1 : id; // Id to increment

      this.mapping[incId][5] += Math.abs ( deltaDimension );

      this._updatePanes ();

    }

    __dragEnd () {

      this._updateMapping ();
      this._updateSashes ();

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, $.$window, 'resize', this._throttle ( this.__resize.bind ( this ), 500 ) );

    }

    __resize () {

      this._updateDimension ();
      this._updateMapping ();
      this._updateSashes ();

    }

  }

  /* FACTORY */

  Factory.make ( LayoutResizer, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Factory ));
