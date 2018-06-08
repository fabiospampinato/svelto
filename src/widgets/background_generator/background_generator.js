
// @require core/widget/widget.js
// @require ./shape.js

(function ( $, _, Svelto, Factory, Shape ) {

  /* VARIABLES */

  const pixelRatio = window.devicePixelRatio || 1;

  /* CONFIG */

  let config = {
    name: 'backgroundGenerator',
    plugin: true,
    selector: 'canvas.background-generator',
    options: {
      density: 15000 * pixelRatio, // One shape every this number of pixels
      shapes: 200,
      shapeOptions: {}, // Options to pass to the shape
      layers: 7,
      colorize: {
        enabled: false,
        hsla: {
          h: Date.now ().toString ().slice ( -5 ) / 100000 * 360, // Tying the starting hue to the timestamp
          s: 100,
          l: 15,
          a: 1
        },
        color: 'hsla( 0, 100%, 15%, 1 )',
        speed: .2
      },
      datas: {
        shapeOptions: 'shape-options'
      },
      animations: {
        enabled: true
      }
    }
  };

  /* BACKGROUND GENERATOR */

  class BackgroundGenerator extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$canvas = this.$element;
      this.canvas = this.element;

      this.ctx = this.canvas.getContext ( '2d' );

    }

    _init () {

      this._initCanvas ();
      this._initOptions ();
      this._initShapes ();

      this.draw ();

      if ( this.options.colorize.enabled ) {

        this.colorize ();

      }

    }

    _initCanvas () {

      this.canvas.width = this.canvas.offsetWidth * pixelRatio;
      this.canvas.height = this.canvas.offsetHeight * pixelRatio;

    }

    _initOptions () {

      this.options.shapeOptions = this.$canvas.data ( this.options.datas.shapeOptions ) || this.options.shapeOptions;

      if ( this.options.density ) {

        this.options.shapes = Math.round ( this.canvas.width * this.canvas.height * pixelRatio / this.options.density );

      }

    }

    _initShapes () {

      this.shapes = _.range ( 0, this.options.shapes ).map ( index => {

        const options = _.extend ( {}, this.options.shapeOptions, {
          layer: ( index % this.options.layers ) + 1,
          layers: this.options.layers
        });

        return new Shape ( this.canvas, this.ctx, options );

      });

    }

    _events () {

      this.___resize ();
      this.___loop ();

    }

    /* PRIVATE */

    _clearCanvas () {

      this.ctx.clearRect ( 0, 0, this.canvas.width, this.canvas.height );

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, $.$window, 'resize:width', this._throttle ( this._init.bind ( this ), 250 ) );

    }

    /* LOOP */

    ___loop () {

      if ( !this.options.animations.enabled ) return;

      setInterval ( this._frames ( this.loop.bind ( this ) ), 1000 / 30 );

    }

    /* API */

    loop () {

      this.draw ();

      if ( this.options.colorize.enabled && this.options.colorize.speed ) {

        this.colorize ();

      }

    }

    draw () {

      this._clearCanvas ();

      this.shapes.forEach ( shape => shape.loop () );

    }

    colorize () {

      const {h, s, l, a} = this.options.colorize.hsla;

      this.options.colorize.color = `hsl( ${h}, ${s}%, ${l}%, ${a} )`;

      this.canvas.style.backgroundColor = this.options.colorize.color;

      this.options.colorize.hsla.h = ( this.options.colorize.hsla.h + this.options.colorize.speed ) % 360;

    }

  }

  /* FACTORY */

  Factory.make ( BackgroundGenerator, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Factory, Svelto.BackgroundGeneratorShape ));
