
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
        nosash: 'no-sash',
        vertical: 'vertical'
      },
      callbacks: {
        resize: _.noop
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
      this.isHorizontal = !this.$layout.hasClass ( this.options.classes.vertical );
      this.mapping = {}; // id => [$pane, $sash, hasSash, isResizable, minDimension, maxDimension, dimension]

    }

    _init () {

      this._initMapping ();
      this._updateMapping ();
      this._updatePanes ();
      this._updateSashes ();

      this.$layout.prepend ( this.$sashes );

    }

    _events () {

      this.___drag ();
      this.___resizeRelative ();
      this.___resize ();
      this.___sashDoubleclick ();

    }

    _destroy () {

      this.$sashes.remove ();

    }

    /* HELPERS */

    _calcProp ( $ele, prop, fallback = 0 ) {

      return parseFloat ( $ele.css ( prop ) ) || fallback;

    }

    _initMapping () {

      this.$panes.get ().forEach ( ( pane, id ) => {

        const $pane = $(pane),
              isLast = id === ( this.$panes.length - 1 ),
              hasSash = !isLast && !$pane.hasClass ( this.options.classes.nosash ),
              isResizable = hasSash || ( id && this.mapping[id - 1][2] ),
              $sash = hasSash ? $(this._template ( 'sash' )) : undefined,
              minDimensionRaw = this._calcProp ( $pane, this.isHorizontal ? 'min-width' : 'min-height' ),
              minDimension = minDimensionRaw || ( this._calcProp ( $pane, this.isHorizontal ? 'padding-left' : 'padding-top' ) + this._calcProp ( $pane, this.isHorizontal ? 'padding-right' : 'padding-bottom' ) + this._calcProp ( $pane, this.isHorizontal ? 'border-left-width' : 'border-top-width' ) + this._calcProp ( $pane, this.isHorizontal ? 'border-right-width' : 'border-bottom-width' ) ) || 0,
              maxDimensionRaw = parseFloat ( $pane.css ( this.isHorizontal ? 'max-width' : 'max-height' ) ),
              maxDimension = maxDimensionRaw || Infinity,
              dimension = 0;

        this.mapping[id] = [$pane, $sash, hasSash, isResizable, minDimension, maxDimension, dimension];

        if ( !hasSash ) return;

        $sash[0]._resid = id;

        this.$sashes = this.$sashes.add ( $sash );

      });

    }

    _updateMapping () {

      for ( let id in this.mapping ) {
        const mapping = this.mapping[id];
        const dimension = this.isHorizontal ? mapping[0].outerWidth () : mapping[0].outerHeight ();
        mapping[6] = dimension;
      }

    }

    _updatePanes () {

      for ( let id in this.mapping ) {
        const mapping = this.mapping[id];
        const $pane = mapping[0];
        const dimension = mapping[6];
        this.isHorizontal ? $pane.css ( 'width', dimension ) : $pane.css ( 'height', dimension );
        if ( !mapping[3] ) continue;
        $pane.css ( 'flex-basis', dimension ); // So that panes scale properly on resize
      }

      this._trigger ( 'resize' );

    }

    _updateSashes () {

      let offset = 0;

      for ( let id in this.mapping ) {
        const mapping = this.mapping[id];
        const $sash = mapping[1];
        const dimension = mapping[6];
        offset += dimension;
        if ( !$sash ) continue;
        this.isHorizontal ? $sash.translateX ( offset ) : $sash.translateY ( offset );
      }

    }

    /* DRAGGING */

    ___drag () {

      this.$sashes.draggable ({
        axis: this.isHorizontal ? 'x' : 'y',
        classes: {
          layout: {
            priorityZIndex: 'layout-priority-z-index sash-dragging'
          }
        },
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
            deltaDimension = this.isHorizontal ? moveXY.x - this._prevMoveXY.x : moveXY.y - this._prevMoveXY.y;

      if ( !deltaDimension ) return;

      const id = draggable._resid,
            mapping = this.mapping[id];

      // We are starting by decrementing because we can actually determine when we've reached the limit

      let decSign = Math.sign ( deltaDimension ), // Direction of the decrement
          decId = decSign > 0 ? id + 1 : id, // Next id to target
          incSign = - decSign, // Direction of the increment
          incId = incSign > 0 ? id + 1 : id, // Id to increment
          extraId = incId, // Just a copy of incId, so that we can mutate it
          remDimension = Math.abs ( deltaDimension ), // Amount of remaining dimension left to distribute
          extraDimension = remDimension, // Dimension that goes over max-dimension and therefore can't be assigned
          accDimension = 0; // Amount of accumulated dimension that has been redistributed

      while ( true ) { // Checking how much extra dimension there is

        const mapping = this.mapping[extraId];

        if ( !mapping ) break;

        if ( mapping[3] ) {

          extraDimension -= Math.min ( extraDimension, ( mapping[5] - mapping[6] ) )

          if ( !extraDimension ) break;

        }

        extraId += incSign;

      }

      remDimension -= extraDimension;

      while ( true ) { // Decreasing dimension

        const mapping = this.mapping[decId];

        if ( !mapping ) break;

        if ( mapping[3] ) {

          const dimensionNext = Math.max ( mapping[4], mapping[6] - remDimension ),
                distributedDimension = mapping[6] - dimensionNext;

          accDimension += distributedDimension;
          remDimension -= distributedDimension;

          mapping[6] = dimensionNext;

          if ( !remDimension ) break;

        }

        decId += decSign;

      }

      if ( !accDimension ) return;

      this.isHorizontal ? data.moveXY.x -= remDimension + extraDimension : data.moveXY.y -= remDimension + extraDimension; // Removing remaining dimension in order to improve the alignment between the cursor and the sash
      this._prevMoveXY = data.moveXY; // If this event didn't cause any change, we don't consider it at all

      while ( true ) { // Increasing dimension

        const mapping = this.mapping[incId];

        if ( !mapping ) break;

        if ( mapping[3] ) {

          const partial = Math.min ( accDimension, ( mapping[5] - mapping[6] ) );

          mapping[6] += partial;
          accDimension -= partial;

          if ( !accDimension ) break;

        }

        incId += incSign;

      }

      this._updatePanes ();

    }

    __dragEnd () {

      this._updateMapping ();
      this._updateSashes ();

    }

    /* RESIZE RELATIVE */

    ___resizeRelative () {

      this._on ( true, $.$window, 'layoutresizable:resize', this._throttle ( this.__resizeRelative.bind ( this ), 500 ) );

    }

    __resizeRelative ( event ) {

      if ( !event.target.contains ( this.element ) && !this.element.contains ( event.target ) ) return; // The resize happened in another tree, ignoring

      this.__resize ();

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, $.$window, 'resize', this._throttle ( this.__resize.bind ( this ), 500 ) );

    }

    __resize () {

      this._updateMapping ();
      this._updateSashes ();

    }

    /* SASH DOUBLE CLICK */

    ___sashDoubleclick () {

      this._on ( this.$sashes, 'dblclick', this.__sashDoubleclick );

    }

    __sashDoubleclick ( event ) {

      const originalEvent = event.originalEvent || event,
            sash = originalEvent.target,
            index = sash._resid,
            mappingLeft = this.mapping[index],
            mappingRight = this.mapping[index + 1],
            centerDelta = ( ( mappingLeft[6] + mappingRight[6] ) / 2 ) - mappingLeft[6],
            clickXY = $.eventXY ( event ),
            x = this.isHorizontal ? clickXY.x + centerDelta : clickXY.x,
            y = this.isHorizontal ? clickXY.y : clickXY.y + centerDelta;

      this.__dragMove ( event, { // A little hacky, but it gets the job done with minimal code
        draggable: sash,
        moveXY: {x, y}
      });

    }

    /* API */

    getDimensions () {

      const dimensions = {};

      for ( let id in this.mapping ) {
        dimensions[id] = this.mapping[id][6];
      }

      return dimensions;

    }

    setDimensions ( dimensions ) {

      for ( let id in dimensions ) {
        if ( !this.mapping[id] ) break;
        this.mapping[id][6] = dimensions[id];
      }

      this._updatePanes ();
      this._updateMapping ();
      this._updateSashes ();

    }

  }

  /* FACTORY */

  Factory.make ( LayoutResizer, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Factory ));
