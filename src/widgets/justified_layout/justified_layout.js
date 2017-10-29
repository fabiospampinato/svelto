
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

(function ( $, _, Svelto, Widgets, Factory, calculator ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'justifiedLayout',
    plugin: true,
    selector: '.justified-layout',
    options: {
      calculatorOptions: {}, // Custom options to pass to `justifiedLayoutCalculator`
      singleRowBelowWidth: 500, // Force 1 box per row below this width
      classes: {
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

    }

    _init () {

      this.render ();

    }

    _events () {

      this._on ( true, $.$window, 'resize', this._frames ( this.render.bind ( this ) ) );

    }

    /* PRIVATE */

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

      this._options.container.width = this.justified.offsetWidth;
      this._options.row.maxBoxesNr =  this._options.container.width <= this.options.singleRowBelowWidth ? 1 : calculator.defaults.row.maxBoxesNr;

      return this._options;

    }

    /* API */

    isRendered () {

      return !!this._rendered;

    }

    async render () {

      let ratios = await this._getCalculatorRatios (),
          options = this._getCalculatorOptions (),
          layout = calculator ( ratios, options, false );

      this.justified.style.height = `${layout.height}px`;

      layout.boxes.forEach ( ( layout, i ) => {
        let box = this.$boxes[i];
        box.style.width = `${layout.width}px`;
        box.style.height = `${layout.height}px`;
        box.style.top = `${layout.top}px`;
        box.style.left = `${layout.left}px`;
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

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.justifiedLayoutCalculator ));
