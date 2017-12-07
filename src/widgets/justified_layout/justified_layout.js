
/* =========================================================================
 * Svelto - Widgets - Justified Layout
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 750
 * @require ./calculator.js
 * @require core/widget/widget.js
 * ========================================================================= */

//TODO: In case we have `normal image + very wide image` add an option for swapping them

(function ( $, _, Svelto, Widgets, Widgetize, Factory, calculator ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'justifiedLayout',
    plugin: true,
    selector: '.justified-layout',
    options: {
      calculatorOptions: {}, // Custom options to pass to `justifiedLayoutCalculator`
      oneRow: false, // Switch to `One Row` logic
      oneRowHeights: [110, calculator.defaults.row.height], // Min and Max height, adjusted according to the viewport size
      singleRowBelowWidth: 500, // Force 1 box per row below this width
      sizes: {
        set: true, // Set the `sizes` attribute of the found images
        threshold: 50 // It will be re-set if the previous differs by at least this amount of pixels
      },
      classes: {
        onerow: 'onerow',
        rendered: 'rendered'
      },
      selectors: {
        boxes: '> *'
      },
      callbacks: {
        firstrender: _.noop,
        render: _.noop
      }
    }
  };

  /* JUSTIFIED LAYOUT */

  class JustifiedLayout extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.justified = this.element;
      this.$justified = this.$element;

      this.$boxes = this.$justified.find ( this.options.selectors.boxes );
      this.options.oneRow = this.$justified.hasClass ( this.options.classes.onerow ) || this.options.oneRow;

    }

    _init () {

      this.render ();

    }

    _events () {

      this._on ( true, $.$window, 'resize', this._frames ( this.render.bind ( this ) ) );

    }

    /* PRIVATE */

    _getImages () {

      if ( this._images ) return this._images;

      this._images = this.$boxes.get ().map ( box => Widgetize._getWidgets ( 'img', $(box) ).get ()[0] ); //FIXME: Ugly, `Widgetize._getWidgets` should be an external utility

      return this._images;

    }

    async _box2ratio ( box ) {

      let ratio = box.getAttribute ( 'data-ratio' );

      if ( ratio ) return Number ( ratio );

      let img = $(box).find ( 'img' )[0];

      if ( !img ) return;

      let imgRatio = img.getAttribute ( 'width' ) / img.getAttribute ( 'height' );

      if ( imgRatio ) return imgRatio;

      return new Promise ( resolve => { //FIXME: Won't work that good if the image takes forever to load, or doesn't load at all
        img.onload = ({srcElement}) => resolve ( srcElement.width / srcElement.height );
      });

    }

    async _getCalculatorRatios () {

      if ( this._ratios ) return this._ratios;

      this._ratios = ( await Promise.all ( this.$boxes.get ().map ( this._box2ratio ) ) ).map ( ratio => ({ratio}) );

      return this._ratios;

    }

    _getCalculatorOptions () {

      if ( !this._options ) this._options = _.merge ( {}, calculator.defaults, this.options.calculatorOptions );

      if ( this.options.oneRow ) {

        this._options.container.width = Infinity;
        this._options.row.boxes.min = Infinity;

        if ( this.options.oneRowHeights ) {

          this._options.row.height = _.clamp ( ( 1 / 11 * this.justified.offsetWidth ) + 90, this.options.oneRowHeights[0], this.options.oneRowHeights[1] );

        }

      } else {

        this._options.container.width = this.justified.offsetWidth;
        this._options.row.boxes.max = this._options.container.width <= this.options.singleRowBelowWidth ? 1 : calculator.defaults.row.maxBoxesNr;

      }

      return this._options;

    }

    /* API */

    isRendered () {

      return !!this._rendered;

    }

    async render () {

      let ratios = await this._getCalculatorRatios (),
          images = this._getImages (),
          options = this._getCalculatorOptions (),
          layout = calculator ( ratios, options, false );

      this.$justified.height ( layout.height );

      layout.boxes.forEach ( ( layout, i ) => {
        let box = this.$boxes[i];
        box.style.width = `${layout.width}px`;
        box.style.height = `${layout.height}px`;
        if ( !this.options.oneRow ) {
          box.style.top = `${layout.top}px`;
          box.style.left = `${layout.left}px`;
        }
        let image = images[i];
        if ( this.options.sizes.set && image && ( !this.options.sizes.threshold || !image.__justified_layout_sizes || Math.abs ( image.__justified_layout_sizes - layout.width ) >= this.options.sizes.threshold ) ) {
          image.setAttribute ( 'sizes', `${layout.width}px` );
          image.__justified_layout_sizes = layout.width;
        }
      });

      if ( !this._rendered ) {

        this.$justified.addClass ( this.options.classes.rendered );

        this._rendered = true;

        this._trigger ( 'firstrender' );

      }

      this._trigger ( 'render' );

    }

  }

  /* FACTORY */

  Factory.make ( JustifiedLayout, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Widgetize, Svelto.Factory, Svelto.justifiedLayoutCalculator ));
