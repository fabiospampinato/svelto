
// @require core/svelto/svelto.js

(function ( $, _, Svelto ) {

  /* VARIABLES */

  const pixelRatio = window.devicePixelRatio || 1;

  /* DEFAULTS */

  const defaults = {
    bounce: true, // Bounce the shape off the sides
    layers: 1, // Number of overall layers
    layer: 1, // Current layer
    // sides: 5, // Fixed sides
    sides: _.random ( 2, 6 ), // Random fixed sides
    radius: 50 * pixelRatio,
    fill: {
      enabled: false,
      rgba: {
        r: 255,
        g: 255,
        b: 255,
        a: .25
      },
      color: 'rgba( 255, 255, 255, .5 )'
    },
    stroke: {
      enabled: true,
      width: 2,
      rgba: {
        r: 255,
        g: 255,
        b: 255,
        a: .35
      },
      color: 'rgba( 255, 0, 0, .5 )'
    },
    coordinate: {
      x: 0,
      y: 0,
      angle: 0
    },
    speed: {
      x: .15 * pixelRatio,
      y: .15 * pixelRatio,
      angle: Math.PI / 360
    }
  };

  /* BACKGROUND GENERATOR SHAPE */

  class BackgroundGeneratorShape {

    /* CONSTRUCTOR */

    constructor ( canvas, ctx, options ) {

      this.options = _.merge ( {}, Svelto.BackgroundGeneratorShape.defaults, options );

      this.canvas = canvas;
      this.ctx = ctx;

      if ( !_.isNumber ( this.options.sides ) ) { // Random sides
        this.options.sides = _.random ( 2, 6 );
      }

      this.options.radius = this.options.radius / this.options.layers * this.options.layer; // Shapes in higher layers are larger

      this.options.fill.rgba.a = this.options.fill.rgba.a / this.options.layers * ( this.options.layers + 1 - this.options.layer ); // Shapes in higher layers are more transparent
      this.options.fill.color = `rgba( ${this.options.fill.rgba.r}, ${this.options.fill.rgba.g}, ${this.options.fill.rgba.b}, ${this.options.fill.rgba.a} )`;

      this.options.stroke.rgba.a = this.options.stroke.rgba.a / this.options.layers * ( this.options.layers + 1 - this.options.layer ); // Shapes in higher layers are more transparent
      this.options.stroke.color = `rgba( ${this.options.stroke.rgba.r}, ${this.options.stroke.rgba.g}, ${this.options.stroke.rgba.b}, ${this.options.stroke.rgba.a} )`;

      this.options.coordinate.x = _.clamp ( _.random ( 0, this.canvas.width ), this.options.radius, this.canvas.width - this.options.radius ); // Random coordinate
      this.options.coordinate.y = _.clamp ( _.random ( 0, this.canvas.height ), this.options.radius, this.canvas.height - this.options.radius ); // Random coordinate
      this.options.coordinate.angle = _.random ( 0, Math.PI * 2 ); // Random starting rotation angle

      this.options.speed.x *= ( _.random ( 0, 1 ) ? 1 : -1 ) / this.options.layer; // Shapes in higher layers are slower, random direction
      this.options.speed.y *= ( _.random ( 0, 1 ) ? 1 : -1 ) / this.options.layer; // Shapes in higher layers are slower, random direction
      this.options.speed.angle *= ( _.random ( 0, 1 ) ? 1 : -1 ) / this.options.layer; // Shapes in higher layers are slower, random direction

    }

    /* API */

    loop () {

      this.draw ();
      this.update ();

    }

    draw () {

      this.ctx.beginPath ();

      if ( this.options.sides <= 2 ) { // Circle

        this.ctx.arc ( this.options.coordinate.x, this.options.coordinate.y, this.options.radius, 0, Math.PI * 2 );

      } else { // Polygon

        this.ctx.moveTo ( this.options.coordinate.x + this.options.radius * Math.cos ( this.options.coordinate.angle ), this.options.coordinate.y + this.options.radius *  Math.sin ( this.options.coordinate.angle ) );

        for ( let i = 1; i <= this.options.sides; i++ ) {

          this.ctx.lineTo ( this.options.coordinate.x + this.options.radius * Math.cos ( this.options.coordinate.angle + i * 2 * Math.PI / this.options.sides ), this.options.coordinate.y + this.options.radius * Math.sin ( this.options.coordinate.angle + i * 2 * Math.PI / this.options.sides ) );

        }

      }

      if ( this.options.fill.enabled ) {

        this.ctx.fillStyle = this.options.fill.color;
        this.ctx.fill ();

      }

      if ( this.options.stroke.enabled ) {

        this.ctx.lineWidth = this.options.stroke.width;
        this.ctx.strokeStyle = this.options.stroke.color;
        this.ctx.stroke ();

      }

      this.ctx.closePath ();

    }

    update () {

      /* BOUNCE */

      if ( this.options.bounce ) {

        if ( this.options.coordinate.x + this.options.speed.x > this.canvas.width - this.options.radius || this.options.coordinate.x + this.options.speed.x < this.options.radius ) {

          this.options.speed.x = - this.options.speed.x;

        }

        if ( this.options.coordinate.y + this.options.speed.y > this.canvas.height - this.options.radius || this.options.coordinate.y + this.options.speed.y < this.options.radius ) {

          this.options.speed.y = - this.options.speed.y;

        }

      }

      /* MOVE */

      this.options.coordinate.x += this.options.speed.x;
      this.options.coordinate.y += this.options.speed.y;

      /* ROTATE */

      this.options.coordinate.angle += this.options.speed.angle;

    }

  }

  /* EXPORT */

  Svelto.BackgroundGeneratorShape = BackgroundGeneratorShape;
  Svelto.BackgroundGeneratorShape.defaults = defaults;

}( Svelto.$, Svelto._, Svelto ));
