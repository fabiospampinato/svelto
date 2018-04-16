
// @priority 750
// @require ./calculator.js
// @require core/widget/widget.js

(function ( $, _, Svelto, Widgets, Widgetize, Factory, calculator ) {

  /* CONFIG */

  let config = {
    name: 'justifiedLayout',
    plugin: true,
    selector: '.justified-layout',
    options: {
      calculatorOptions: {}, // Custom options to pass to `justifiedLayoutCalculator`
      oneRow: {
        enabled: false, // Switch to `One Row` logic
        heights: [110, calculator.defaults.row.height], // Min and Max height, adjusted according to the viewport size
        belowWidth: 500 // Force 1 box per row below this width, set to -1 to disable it
      },
      sizes: {
        set: true, // Set the `sizes` attribute of the found images
        threshold: Infinity // It will be re-set if the previous differs by at least this amount of pixels // Effectively disabled by default
      },
      datas: {
        calculatorOptions: 'calculator-options',
        onerowBelowWidth: 'onerow-below-width'
      },
      classes: {
        onerow: 'onerow',
        rendered: 'rendered'
      },
      selectors: {
        // boxes: ':scope > *' //TODO: Limited browser support for `:scope`
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

      this.$widows = $.$empty;

      this.$boxes = this.$justified.children ();
      this.options.oneRow.enabled = this.$justified.hasClass ( this.options.classes.onerow ) || this.options.oneRow.enabled;
      this.options.oneRow.belowWidth = this.$justified.data ( this.options.datas.onerowBelowWidth ) || this.options.oneRow.belowWidth;

      const calculatorOptions = this.$justified.data ( this.options.datas.calculatorOptions );
      if ( calculatorOptions ) {
        this.options.calculatorOptions = _.merge ( this.options.calculatorOptions, calculatorOptions );
      }

    }

    async _init () {

      this._images = this._getImages ( this.$boxes );
      this._ratios = await this._getRatios ( this.$boxes );

      this.render ();

    }

    _events () {

      this.___remoteLoaderTarget ();
      this.___resize ();

    }

    /* REMOTE LOADER TARGET */

    ___remoteLoaderTarget () {

      this._on ( true, 'remoteloader:target', this.__remoteLoaderTarget );

    }

    async __remoteLoaderTarget ( event, { $elements } ) { //TODO: Make it faster, leverage the fact that the previous boxes minus widows are already well positionated

      this.$boxes = this.$boxes.add ( $elements );
      this._images = this._images.concat ( this._getImages ( $elements ) );
      this._ratios = this._ratios.concat ( await this._getRatios ( $elements ) );

      this.render ();

      $elements.removeClass ( this.options.classes.hidden );

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, $.$window, 'resize', this._frames ( this.render.bind ( this ) ) );

    }

    /* PRIVATE */

    _getImages ( $boxes ) {

      return $boxes.get ().map ( box => $(box).findAll ( 'img' )[0] );

    }

    async _box2ratio ( box ) {

      let ratio = box.getAttribute ( 'data-ratio' );

      if ( ratio ) return Number ( ratio );

      let img = $(box).find ( 'img' )[0];

      if ( !img ) return;

      let imgRatio = img.getAttribute ( 'width' ) / img.getAttribute ( 'height' );

      if ( imgRatio ) return imgRatio;

      return new Promise ( resolve => { //FIXME: Won't work that good if the image takes forever to load, or doesn't load at all
        img.onload = ({ srcElement }) => resolve ( srcElement.width / srcElement.height );
      });

    }

    async _getRatios ( $boxes ) {

      return ( await Promise.all ( $boxes.get ().map ( this._box2ratio ) ) ).map ( ratio => ({ratio}) );

    }

    _getOptions () {

      if ( !this._options ) this._options = _.merge ( {}, calculator.defaults, this.options.calculatorOptions );

      if ( this.options.oneRow.enabled ) {

        this._options.container.width = Infinity;
        this._options.row.boxes.min = Infinity;

        if ( this.options.oneRow.heights ) {

          this._options.row.height = _.clamp ( ( 1 / 11 * this.justified.offsetWidth ) + 90, this.options.oneRow.heights[0], this.options.oneRow.heights[1] );

        }

      } else {

        this._options.container.width = this.justified.offsetWidth;
        this._options.row.boxes.max = this._options.container.width <= this.options.oneRow.belowWidth ? 1 : calculator.defaults.row.maxBoxesNr;

      }

      return this._options;

    }

    /* API */

    isRendered () {

      return !!this._rendered;

    }

    render () {

      let options = this._getOptions (),
          layout = calculator ( this._ratios, options, false );

      this.$justified.height ( layout.height );

      layout.boxesRearrangements.forEach ( ([ from, to ]) => {
        $(this.$boxes[from]).after ( this.$boxes[to] );
        _.move ( this.$boxes, from, to );
        _.move ( this._images, from, to );
        _.move ( this._ratios, from, to );
        _.move ( layout.boxes, from, to );
      });

      layout.boxes.forEach ( ( layout, i ) => {
        let box = this.$boxes[i];
        box.style.width = `${layout.width}px`;
        box.style.height = `${layout.height}px`;
        if ( !this.options.oneRow.enabled ) {
          box.style.top = `${layout.top}px`;
          box.style.left = `${layout.left}px`;
        }
        let image = this._images[i];
        if ( this.options.sizes.set && image && ( !this.options.sizes.threshold || !image.__justified_layout_sizes || Math.abs ( image.__justified_layout_sizes - layout.width ) >= this.options.sizes.threshold ) ) {
          image.setAttribute ( 'sizes', `${layout.width}px` );
          image.__justified_layout_sizes = layout.width;
        }
      });

      if ( !options.row.widows.show && ( layout.widows !== this.$widows.length ) ) {

        let $nextWidows = $(_.takeRight ( this.$boxes.get (), layout.widows ) ),
            $changed = $(_.xor ( this.$widows.get (), $nextWidows.get () ));

        $changed.toggleClass ( this.options.classes.hidden );

        this.$widows = $nextWidows;

      }

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
