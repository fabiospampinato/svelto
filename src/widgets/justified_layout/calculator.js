
// @require core/svelto/svelto.js

//TODO: limit ultra portrait images height

(function ( $, _, Svelto ) {

  'use strict';

  /* DEFAULTS */

  let defaults = {
    container: {
      width: 1048,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    rows: {
      max: Infinity // Maximum number of rows to calculate dimensions for
    },
    row: {
      height: 250, // Target row's height
      margin: 5, // Vertical margin between rows
      boxes: {
        min: 1, // Minimum number of boxes in the row
        max: Infinity // Maximum number of boxes in the row
      },
      tolerance: {
        min: .85, // Tunes the minimum ratio
        max: 1.85 // Tunes the maximum ratio
      },
      widows: { // Row not completelly filled with boxes
        show: true, // Compute boxes for widows
        average: true, // Set the height to the average of the previous heights
        justify: false, // Set the height so that no space is left unfilled
        previous: false // Set the height to that of the previous row
      }
    },
    box: {
      rearrange: {
        enabled: true, // Boxes can be rearranged in order to achieve the best grid possible
        deltaThreshold: 0.5 // Minimum difference in ratio that will trigger a rearrangement
      },
      margin: 5, // Horizontal margin between boxes
      ratio: undefined // Fixed ratio for all boxes
    }
  };

  /* CALCULATOR */

  function calculator ( ratios, options, _needsMerge = true ) {

    if ( !options || _needsMerge ) {

      options = options ? _.merge ( {}, calculator.defaults, options ) : calculator.defaults;

    }

    ratios = options.box.ratio ? _.fill ( Array ( ratios.length ), options.box.ratio ) : ratios;

    let boxes = _.isNumber ( ratios[0] ) ? ratios.map ( ratio => ({ratio}) ) : ratios;

    return makeLayout ( options, boxes );

  }

  /* ROW */

  const row = { //FIXME: It's global-ish, which it's bad, but it's fast

    init ( options, layout, boxes ) {

      this.options = options;
      this.layout = layout;
      this.boxes = boxes;

      this.reset ();

    },

    reset () {

      if ( this.prevState ) { // Restoring state

        this._setState ( this.prevState );

        this.prevState = undefined;

      } else { // New state

        this._resetState ();

      }

    },

    _resetState () {

      this.width = this.options.container.width - this.options.container.padding.left - this.options.container.padding.right;
      this.height = 0;
      this.ratio = 0;
      this.left = this.options.container.padding.left;
      this.top = this.layout.height - this.options.container.padding.bottom;
      this.minRatio = this.width / this.options.row.height * this.options.row.tolerance.min;
      this.maxRatio = this.width / this.options.row.height * this.options.row.tolerance.max;
      this.boxesStartIndex = this.layout.boxesIndex;
      this.boxesSkipIndexes = undefined;
      this.boxesNr = 0;

      this._complete = false;

    },

    _getStateKeys: ['width', 'height', 'ratio', 'left', 'top', 'minRatio', 'maxRatio', 'boxesStartIndex', 'boxesSkipIndexes', 'boxesNr', '_complete'],

    _getState () {

      return _.pick ( this, this._getStateKeys );

    },

    _setState ( state ) {

      _.extend ( this, state );

    },

    forEachBox ( callback ) {

      let index = 0;

      for ( let i = this.boxesStartIndex, l = this.layout.boxesIndex; i < l; i++ ) {

        if ( this.boxesSkipIndexes && this.boxesSkipIndexes.indexOf ( i ) !== -1 ) continue;

        callback ( this.layout.boxes[i], index++ );

      }

    },

    _add ( box ) { // Actually add the box

      this.layout.boxes[this.layout.boxesIndex++] = box;

      this.boxesNr++;

      this.ratio += box.ratio;

    },

    add ( box ) {

      if ( this.layout.heightsIndex === this.options.rows.max ) { // Maximum number of rows reached

        this._add ( box );

        return true;

      }

      let newRatio = this.ratio + box.ratio,
          widthWithoutMargin = this.width - ( this.boxesNr * this.options.row.margin );

      if ( newRatio < this.minRatio || this.boxesNr < this.options.row.boxes.min ) { // There's enough space for this and probably another box

        this._add ( box );

        if ( this.boxesNr >= this.options.row.boxes.max || ( this.boxesNr > this.options.row.boxes.min && newRatio >= this.maxRatio ) ) {

          this.complete ( widthWithoutMargin / newRatio );

        }

        return true;

      } else if ( newRatio > this.maxRatio ) { // Maybe there's space for this

        if ( !this.boxesNr ) { // It's the only box, so it's added

          this._add ( box );

          this.complete ( widthWithoutMargin / newRatio );

          return true;

        }

        let prevWidthWithoutMargin = this.width - ( this.boxesNr - 1 ) * this.options.row.margin,
            prevTargetRatio = prevWidthWithoutMargin / this.options.row.height,
            newTargetRatio = widthWithoutMargin / this.options.row.height;

        if ( Math.abs ( newRatio - newTargetRatio ) > Math.abs ( this.ratio - prevTargetRatio ) ) { // The ratio is closer to the ranges without it

          if ( this.options.box.rearrange.enabled ) { // Put this box before the current row (in order to fix the "normal before very wide" situation)

            const deltaRatio = box.ratio - this.ratio;

            if ( ( this.boxesNr === 1 && deltaRatio > this.options.box.rearrange.deltaThreshold ) || ( this.boxesNr > 1 && deltaRatio >= this.options.box.rearrange.deltaThreshold ) ) {

              const insertIndex = this.boxesStartIndex + ( this.boxesSkipIndexes ? this.boxesSkipIndexes.length : 0 );

              this.prevState = this._getState ();
              if ( !this.prevState.boxesSkipIndexes ) this.prevState.boxesSkipIndexes = [];
              this.prevState.boxesSkipIndexes.push ( this.layout.boxesIndex );

              this.layout.boxesRearrangements.push ([ this.layout.boxesIndex, insertIndex ]);

              this._resetState ();

              this._add ( box );

              this.complete ( this.width / this.ratio );

              this.prevState.top += this.height + this.options.row.margin;

              return true;

            }

          }

          // Just complete the row without it

          this.complete ( prevWidthWithoutMargin / this.ratio );

          return false;

        } else { // The ratio is closer to the ranges with it

          this._add ( box );

          this.complete ( widthWithoutMargin / newRatio );

          return true;

        }

      } else { // Fills perfectly the space

        this._add ( box );

        this.complete ( widthWithoutMargin / newRatio );

        return true;

      }

    },

    isComplete () {

      return this._complete;

    },

    complete ( height = this.options.row.height, isWidows = false ) { // Set metadata on boxes

      this.height = height;

      if ( isWidows && !this.options.row.widows.justify ) { // Checking for sane height values

        let maxHeight;

        if ( this.options.container.width !== Infinity ) {

          let widthWithoutMargin = this.width - ( ( this.boxesNr - 1 ) * this.options.row.margin );

          maxHeight = widthWithoutMargin / this.ratio;

        } else {

          maxHeight = this.options.row.height;

        }

        this.height = _.isNaN ( this.height ) ? maxHeight : Math.min ( maxHeight, this.height );

      }

      let boxLeft = this.left;

      this.forEachBox ( box => {

        box.width = box.ratio * this.height;
        box.height = this.height;
        box.top = this.top;
        box.left = boxLeft;

        boxLeft += box.width + this.options.box.margin;

      });

      boxLeft -= ( this.options.box.margin + this.left );

      if ( isWidows && this.options.row.widows.justify ) {

        let errorWidthPerItem = ( this.width - boxLeft ) / this.boxesNr;

        if ( errorWidthPerItem ) {

          this.forEachBox ( ( box, i ) => {

            let currentWidth = ( i + 1 ) * errorWidthPerItem,
                previousWidth = i ? currentWidth - errorWidthPerItem : 0,
                deltaWidth = ( currentWidth - previousWidth ),
                deltaHeight = deltaWidth / box.ratio;

            box.left += previousWidth;
            box.width += deltaWidth;
            box.height += deltaHeight;

            if ( !i ) {
              this.height += deltaHeight;
            }

          });

        }

      }

      this._complete = true;

    }

  };

  /* HELPERS */

  function addRow ( options, layout ) {

    layout.heights[layout.heightsIndex++] = row.height;

    layout.height += row.height + options.row.margin;

  }

  function addRowWidows ( options, layout ) {

    layout.widows = row.boxesNr;

    if ( row.isComplete () || options.row.widows.show ) {

      if ( !row.isComplete () ) {

        let height = options.row.widows.justify
                       ? undefined
                       : !layout.heightsIndex
                         ? options.row.height
                         : options.row.widows.average
                           ? layout.height / layout.heightsIndex
                           : options.row.widows.previous
                             ? layout.heights[layout.heightsIndex - 1]
                             : undefined;

        row.complete ( height, true );

      }

      addRow ( options, layout );

    } else {

      layout.boxesIndex = row.boxesStartIndex;

    }

  }

  function addBox ( options, layout, box ) {

    let added = row.add ( box );

    if ( row.isComplete () ) {

      addRow ( options, layout );

      row.reset ();

      if ( !added ) addBox ( options, layout, box );

    }

  }

  function makeLayout ( options, boxes ) {

    let layout = {
      width: options.container.width,
      height: options.container.padding.top + options.container.padding.bottom,
      heights: Array ( boxes.length ),
      heightsIndex: 0,
      boxes: Array ( boxes.length ),
      boxesIndex: 0,
      boxesRearrangements: [],
      widows: 0
    };

    row.init ( options, layout, boxes );

    boxes.forEach ( box => addBox ( options, layout, box ) );

    if ( row.boxesNr ) {
      addRowWidows ( options, layout );
    }

    const entraHeightsNr = layout.heights.length - layout.heightsIndex;
    if ( entraHeightsNr ) {
      layout.heights.splice ( layout.heightsIndex, entraHeightsNr );
    }

    const extraBoxesNr = layout.boxes.length - layout.boxesIndex;
    if ( extraBoxesNr ) {
      layout.boxes.splice ( layout.boxesIndex, extraBoxesNr );
    }

    if ( layout.heightsIndex ) {
      layout.height -= options.row.margin;
    }

    if ( layout.boxesRearrangements.length > 1 ) {
      layout.boxesRearrangements = getOptimalRearrangements ( layout.boxesRearrangements );
    }

    return layout;

  }

  function getOptimalRearrangements ( rearrangements ) { //TODO: Maybe this algorithm does not generate optimal rearrangements

    let rearrangement, previous;

    const optimal = [];

    for ( let i = 0, l = rearrangements.length; i < l; i++ ) {
      let current = rearrangements[i];
      if ( current[0] === ( current[1] + 1 ) ) { // Is potentially collapsible
        if ( previous ) {
          if ( current[1] === previous[0] ) { // They are contiguous
            if ( rearrangement ) {
              rearrangement[1] = current[0];
            } else {
              rearrangement = [previous[1], current[0]];
            }
          } else {
            optimal.push ( rearrangement || previous );
            rearrangement = undefined;
          }
        }
        previous = current;
      } else {
        optimal.push ( current );
      }
    }

    if ( rearrangement || previous ) {
      optimal.push ( rearrangement || previous );
    }

    return optimal;

  }

  /* BINDINGS */

  calculator.defaults = defaults;

  /* EXPORT */

  Svelto.justifiedLayoutCalculator = calculator;

}( Svelto.$, Svelto._, Svelto ));
