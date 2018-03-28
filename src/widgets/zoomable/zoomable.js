
// @require core/animations/animations.js
// @require core/browser/browser.js
// @require core/widget/widget.js
// @require lib/fetch/fetch.js

//TODO: Generalize it for other kind of elements other than `img`

(function ( $, _, Svelto, Widgets, Factory, Browser, Pointer, Keyboard, Animations, fetch ) {

  /* CONFIG */

  let config = {
    name: 'zoomable',
    plugin: Browser.is.desktop,
    selector: 'img.zoomable',
    options: {
      offset: 50, // Size of the offset between the zoomed element and the viewport edges
      src: false, // Source of the image
      original: {
        src: false, // Original source of the image
        substitute: true, // Once load, permanently substitute the thumnail with it
        width: false,
        height: false
      },
      magnification: {
        enabled: false, // Zoom in magnified mode, where the image is enlarged
        limited: true, // Controls magnification over the zoomable actual dimensions
        offset: 50, // A spacing used in order not to trigger hot corners while reaching the edge of the zoomable
        minSide: Math.min ( screen.width, screen.height ) * 2, // Minimum length of each side
        maxSide: Math.min ( screen.width, screen.height ) * 3 // Maximum length of each side
      },
      preloading: {
        enabled: false, // Preload the original image
        wait: true // Don't zoom until the original has been preloaded
      },
      classes: {
        magnified: 'magnified',
        preload: 'preload',
        show: 'show',
        zoom: 'zoom',
        zoomed: 'zoomed',
        backdrop: {
          show: 'zoomable-backdrop obscured-show obscured',
          zoom: 'obscured-open',
          zoomed: ''
        }
      },
      attributes: {
        src: 'src'
      },
      datas: {
        original: 'original',
        width: 'width',
        height: 'height'
      },
      animations: {
        zoom: Animations.normal,
        unzoom: Animations.normal
      },
      keystrokes: {
        'esc': '__esc'
      },
      callbacks: {
        loading: _.noop,
        zoom: _.noop,
        unzoom: _.noop
      }
    }
  };

  /* ZOOMABLE */

  class Zoomable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$zoomable = this.$element;
      this.zoomable = this.element;

      this.$backdrop = $.$html;

      this._isZoomed = false;

    }

    _init () {

      this.options.src = this.$zoomable.attr ( this.options.attributes.src ) || this.options.src;
      this.options.original.src = this.$zoomable.data ( this.options.datas.original ) || this.options.original.src;
      this.options.original.width = this.$zoomable.data ( this.options.datas.width ) || this.options.original.width;
      this.options.original.height = this.$zoomable.data ( this.options.datas.height ) || this.options.original.height;
      this.options.magnification.enabled = this.$zoomable.hasClass ( this.options.classes.magnified ) || this.options.magnification.enabled;
      this.options.preloading.enabled = this.$zoomable.hasClass ( this.options.classes.preload ) || this.options.preloading.enabled;

      if ( this.options.original.src && ( !_.isNumber ( this.options.original.width ) || !_.isNumber ( this.options.original.height ) ) ) {

        console.error ( "Zoomable: wrong 'data-width' and/or 'data-height', they are required when using 'data-original'" );

        return false;

      }

      if ( this.options.preloading.enabled && this.options.original.src ) this.preload ();

      if ( this.$zoomable.hasClass ( this.options.classes.zoom ) ) this.zoom ();

    }

    _events () {

      this.___tap ();

      if ( !this._isZoomed ) return;

      this.___tapOutside ();
      this.___keydown ();
      this.___scroll ();
      this.___resize ();

      if ( this.options.magnification.enabled ) this.___move ();

    }

    _destroy () {

      this.unzoom ();

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.__tap );

    }

    __tap ( event ) {

      event.preventDefault ();
      event.stopImmediatePropagation ();

      if ( Keyboard.keystroke.match ( event.originalEvent, 'ctmd' ) ) {

        window.open ( this.options.original.src || this.options.src, '_new' );

      } else {

        this.toggle ( undefined, event );

      }

    }

    ___tapOutside () {

      this._on ( true, $.$html, Pointer.tap, this.__tapOutside );

    }

    __tapOutside ( event ) {

      if ( this.isLocked () || event.isDefaultPrevented () || event.isPropagationStopped () || !$.isAttached ( event.target ) || $(event.target).closest ( this.$zoomable ).length ) return;

      event.preventDefault ();
      event.stopImmediatePropagation ();

      this.unzoom ();

    }

    /* ESC */

    ___keydown () { //TODO: Listen to `keydown` only within the layout, so maybe just if the layout is hovered or focused (right?)

      this._on ( true, $.$document, 'keydown', this.__keydown );

    }

    __esc () {

      this.unzoom ();

    }

    /* SCROLL */

    ___scroll () {

      if ( this.options.magnification.enabled ) return;

      this._on ( true, $.$window.add ( this.$zoomable.parents () ), 'scroll', this._frames ( this.__scroll.bind ( this ) ) );

    }

    __scroll () {

      this.unzoom ();

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, $.$window, 'resize', this._frames ( this.__resize.bind ( this ) ) );

    }

    __resize () {

      this._positionate ();

    }

    /* MOVE */

    ___move () {

      this._on ( true, $.$document, Pointer.move, this._frames ( this.__move.bind ( this ) ) );

    }

    __move ( event ) {

      if ( !this._matrix ) return; // Not yet positionated

      let {x, y} = $.eventXY ( event, 'clientX', 'clientY' ),
          zOffset = this.options.offset,
          mOffset = this.options.magnification.offset,
          width = this._minWidth * this._scale,
          height = this._minHeight * this._scale,
          xClamped = _.clamp ( x - mOffset, 0, this._viewportWidth - mOffset ),
          yClamped = _.clamp ( y - mOffset, 0, this._viewportHeight - mOffset ),
          xPercentage = _.clamp ( xClamped / ( this._viewportWidth - ( mOffset * 2 ) ), 0, 1 ),
          yPercentage = _.clamp ( yClamped / ( this._viewportHeight - ( mOffset * 2 ) ), 0, 1 ),
          xExceeding = Math.max ( 0, width - this._viewportWidth + ( zOffset * 2 ) ),
          yExceeding = Math.max ( 0, height - this._viewportHeight + ( zOffset * 2 ) );

      /* SETTING */

      this._matrix[4] = this._translateX + ( xExceeding / 2 ) - ( xExceeding * xPercentage );
      this._matrix[5] = this._translateY + ( yExceeding / 2 ) - ( yExceeding * yPercentage );

      this.$zoomable.matrix ( this._matrix );

    }

    /* POSITIONING */

    _positionate ( initial ) {

      /* VARIABLES */

      if ( initial ) {

        this._initialMatrix = this.$zoomable.matrix ();
        this._translateX = 0;
        this._translateY = 0;

        this._minWidth = this.zoomable.width || this.$zoomable.outerWidth (); //FIXME: It may change on resize
        this._minHeight = this.zoomable.height || this.$zoomable.outerHeight (); //FIXME: It may change on resize

        this._maxWidth = this.options.original.src ? this.options.original.width : ( this.zoomable.naturalWidth ? this.zoomable.naturalWidth : this._minWidth );
        this._maxHeight = this.options.original.src ? this.options.original.height : ( this.zoomable.naturalHeight ? this.zoomable.naturalHeight : this._minHeight );
        this._aspectRatio = this._maxWidth / this._maxHeight;
        this._maxScale = this._maxWidth / this._minWidth;

      }

      this._viewportRect = $.$window.getRect ();
      this._viewportWidth = this._viewportRect.width;
      this._viewportHeight = this._viewportRect.height;
      this._viewportAspectRatio = this._viewportWidth / this._viewportHeight;

      let rect = this.$zoomable.getRect ();

      /* SCALE */

      if ( this._maxWidth <= this._viewportWidth - this.options.offset && this._maxHeight <= this._viewportHeight - this.options.offset ) {

        this._scale = this._maxScale;

      } else if ( this._aspectRatio < this._viewportAspectRatio ) {

        this._scale = ( ( this._viewportHeight - this.options.offset ) / this._maxHeight ) * this._maxScale;

      } else {

        this._scale = ( ( this._viewportWidth - this.options.offset ) / this._maxWidth ) * this._maxScale;

      }

      if ( this.options.magnification.enabled ) {

        if ( this._maxWidth <= this._maxHeight ) {

          this._scale += this.options.magnification.minSide / ( this._minWidth * this._scale );

          if ( this._minHeight * this._scale > this.options.magnification.maxSide ) {

            this._scale = this.options.magnification.maxSide * this._maxScale / this._maxHeight;

          }

        } else {

          this._scale += this.options.magnification.minSide / ( this._minHeight * this._scale );

          if ( this._minWidth * this._scale > this.options.magnification.maxSide ) {

            this._scale = this.options.magnification.maxSide * this._maxScale / this._maxWidth;

          }

        }

        if ( this.options.magnification.limited ) {

          this._scale = Math.min ( this._maxScale, this._scale );

        }

      }

      /* CENTER */

      this._translateX = this._translateX + ( initial ? this._initialMatrix[4] : 0 ) + ( this._viewportWidth / 2 ) - ( rect.left + ( rect.width / 2 ) );
      this._translateY = this._translateY + ( initial ? this._initialMatrix[5] : 0 ) + ( this._viewportHeight / 2 ) - ( rect.top + ( rect.height / 2 ) );

      /* SETTING */

      this._matrix = [this._scale, this._initialMatrix[1], this._initialMatrix[2], this._scale, this._translateX, this._translateY];

      this.$zoomable.matrix ( this._matrix );

    }

    _unpositionate () {

      this.$zoomable.matrix ( this._initialMatrix );

    }

    /* REQUEST HANDLERS */

    __request () {

      let request = fetch.defaults.request ();

      request.addEventListener ( 'progress', event => {

        if ( !event.lengthComputable ) return;

        this._trigger ( 'loading', {
          loaded: event.loaded,
          total: event.total,
          percentage: event.loaded / event.total * 100
        });

      }, false );

      return request;

    }

    __error () {

      console.error ( `Zoomable: failed to preload "${this.options.original.src}"` );

    }

    __success ( callback ) {

      this._isPreloaded = true;

      if ( this.options.original.substitute ) {

        this.$zoomable.attr ( 'src', this.options.original.src );
        this.$zoomable.attr ( 'srcset', this.options.original.src );

      }

      if ( callback ) callback ();

    }

    __complete () {

      this._isPreloading = false;

    }

    /* API */

    isPreloading () {

      return !!this._isPreloading;

    }

    isPreloaded () {

      return !!this._isPreloaded;

    }

    preload ( callback ) {

      if ( this._isPreloading || this._isPreloaded ) return;

      this._isPreloading = true;

      fetch ({
        url: this.options.original.src,
        request: this.__request.bind ( this ),
        error: this.__error.bind ( this ),
        success: () => this.__success ( callback ),
        complete: this.__complete.bind ( this )
      });

    }

    isZoomed () {

      return this._isZoomed;

    }

    toggle ( force = !this._isZoomed, event ) {

      if ( !!force !== this._isZoomed ) {

        this[force ? 'zoom' : 'unzoom']( event );

      }

    }

    zoom ( event ) {

      if ( this.isLocked () || this._isZoomed ) return;

      if ( this.options.original.src && this.options.preloading.wait && !this._isPreloaded ) return this.preload ( () => this.zoom ( event ) );

      this.lock ();

      this._isZoomed = true;

      if ( this.options.magnification.enabled ) this.$layout.disableScroll ();

      this._frame ( function () {

        this.$zoomable.addClass ( this.options.classes.show );
        this.$backdrop.addClass ( this.options.classes.backdrop.show );

        this._frame ( function () {

          this.$zoomable.addClass ( this.options.classes.zoom );
          this.$backdrop.addClass ( this.options.classes.backdrop.zoom );

          this._positionate ( true );

          if ( this.options.magnification.enabled && event ) this.__move ( event );

          this._delay ( function () {

            this.$zoomable.addClass ( this.options.classes.zoomed );
            this.$backdrop.addClass ( this.options.classes.backdrop.zoomed );

            if ( this.options.original.src ) this.$zoomable.attr ( 'src', this.options.original.src );

            this.unlock ();

            this._trigger ( 'zoom' );

          }, this.options.animations.zoom );

        });

      });

      this._reset ();

      this.___tap ();
      this.___tapOutside ();
      this.___keydown ();
      this.___scroll ();
      this.___resize ();

      if ( this.options.magnification.enabled ) this.___move ();

    }

    unzoom () {

      if ( this.isLocked () || !this._isZoomed ) return;

      this._isZoomed = false;

      this.lock ();

      this._frame ( function () {

        this.$zoomable.removeClass ( this.options.classes.zoomed );
        this.$backdrop.removeClass ( this.options.classes.backdrop.zoomed );

        this._frame ( function () {

          this._unpositionate ();

          this.$zoomable.removeClass ( this.options.classes.zoom );
          this.$backdrop.removeClass ( this.options.classes.backdrop.zoom );

          this._delay ( function () {

            if ( this.options.original.src && !this.options.original.substitute ) this.$zoomable.attr ( 'src', this.options.src );

            this.$zoomable.removeClass ( this.options.classes.show );
            this.$backdrop.removeClass ( this.options.classes.backdrop.show );

            if ( this.options.magnification.enabled ) this.$layout.enableScroll ();

            this.unlock ();

            this._trigger ( 'unzoom' );

          }, this.options.animations.unzoom );

        });

      });

      this._reset ();

      this.___tap ();

    }

  }

  /* FACTORY */

  Factory.make ( Zoomable, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Browser, Svelto.Pointer, Svelto.Keyboard, Svelto.Animations, Svelto.fetch ));
