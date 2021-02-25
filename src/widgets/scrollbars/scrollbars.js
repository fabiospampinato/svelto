
(function ( $, _, Svelto, Browser, Factory, Pointer ) {

  /* CONFIG */

  let config = {
    name: 'scrollbars',
    plugin: true,
    selector: '.scrollbars',
    options: {
      thumb: {
        minSize: 5,
      },
      classes: {
        dragging: 'scrollbars-dragging',
        hasHorizontal: 'has-horizontal',
        hasVertical: 'has-vertical',
        isHorizontalDragging: 'is-horizontal-dragging',
        isVerticalDragging: 'is-vertical-dragging',
        isHorizontalScrolling: 'is-horizontal-scrolling',
        isVerticalScrolling: 'is-vertical-scrolling'
      },
      selectors: {
        track: '.scrollbars-track',
        trackHorizontal: '.scrollbars-track.horizontal',
        trackVertical: '.scrollbars-track.vertical',
        thumb: '.scrollbars-thumb',
        corner: '.scrollbars-corner',
        viewport: '.scrollbars-viewport',
        content: '.scrollbars-content'
      }
    }
  };

  /* SCROLLBARS */

  class Scrollbars extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$scrollbars = this.$element;
      this.$trackHorizontal = this.$scrollbars.children ( this.options.selectors.trackHorizontal );
      this.$trackVertical = this.$scrollbars.children ( this.options.selectors.trackVertical );
      this.$thumbHorizontal = this.$trackHorizontal.find ( this.options.selectors.thumb );
      this.$thumbVertical = this.$trackVertical.find ( this.options.selectors.thumb );
      this.$corner = this.$scrollbars.children ( this.options.selectors.corner );
      this.$viewport = this.$scrollbars.children ( this.options.selectors.viewport );
      this.$content = this.$viewport.children ( this.options.selectors.content );

      this.scrollbars = this.$scrollbars[0];
      this.trackHorizontal = this.$trackHorizontal[0];
      this.trackVertical = this.$trackVertical[0];
      this.thumbHorizontal = this.$thumbHorizontal[0];
      this.thumbVertical = this.$thumbVertical[0];
      this.corner = this.$corner[0];
      this.viewport = this.$viewport[0];
      this.content = this.$content[0];

      this.viewportObserver = null;
      this.contentObserver = null;

      this._isHorizontalScrolling = false;
      this._isVerticalScrolling = false;
      this._scrollTop = 0;
      this._scrollLeft = 0;
      this._resetScrolling = _.debounce ( this._resetScrolling.bind ( this ), 500 );

      this.__resizeContent = this.__resizeContent.bind ( this );
      this.__resizeViewport = this.__resizeViewport.bind ( this );
      this.__scrollViewport = this.__scrollViewport.bind ( this );

      this.horizontal = {
        enabled: false,
        sizeVisible: -1,
        sizeTotal: -1,
        sizeTrack: -1
      };

      this.vertical = {
        enabled: false,
        sizeVisible: -1,
        sizeTotal: -1,
        sizeTrack: -1
      };

    }

    _init () {

      this._update ();

    }

    _events () {

      this.___scrollViewport ();
      this.___scrollTrackHorizontal ();
      this.___scrollTrackVertical ();
      this.___resizeContent ();
      this.___resizeViewport ();
      this.___dragHorizontal ();
      this.___dragVertical ();

    }

    _destroy () {

      this.___scrollViewport_off ();
      this.___resizeContent_off ();
      this.___resizeViewport_off ();

    }

    /* PRIVATE */

    _update () {

      this._updateHorizontalTrack ();
      this._updateVerticalTrack ();

    }

    _updateHorizontalScrolling () {

      const scrollLeftPrev = this._scrollLeft,
            scrollLeft = this.viewport.scrollLeft;

      if ( scrollLeftPrev === scrollLeft ) return;

      this._scrollLeft = scrollLeft;

      this._resetScrolling ();

      if ( this._isHorizontalScrolling ) return;

      this._isHorizontalScrolling = true;

      this.scrollbars.classList.toggle ( this.options.classes.isHorizontalScrolling, true );

    }

    _updateHorizontalTrack () {

      const prev = this.horizontal,
            sizeVisible = this.viewport.clientWidth,
            sizeTotal = this.viewport.scrollWidth,
            sizeTrack = this.trackHorizontal.clientWidth,
            enabled = ( sizeVisible < sizeTotal );

      this.horizontal = { sizeVisible, sizeTotal, sizeTrack, enabled };

      if ( sizeVisible !== prev.sizeVisible || sizeTotal !== prev.sizeTotal || sizeTrack !== prev.sizeTrack ) {

        this._updateHorizontalThumb ();

      }

      if ( enabled !== prev.enabled ) {

        this.scrollbars.classList.toggle ( this.options.classes.hasHorizontal, enabled );

        this._updateVerticalTrack ();

      }

    }

    _updateHorizontalThumb () {

      const {enabled, sizeVisible, sizeTotal, sizeTrack} = this.horizontal;

      if ( !enabled ) return;

      const sizeScrolled = this.viewport.scrollLeft,
            percentageBefore = sizeScrolled / sizeTotal,
            percentageAfter = ( sizeTotal - sizeScrolled - sizeVisible ) / sizeTotal,
            percentageCenterMin = this.options.thumb.minSize / sizeTrack,
            percentageCenterOffset = Math.max ( 0, percentageCenterMin - ( 1 - percentageBefore - percentageAfter ) ) * ( percentageBefore < percentageAfter ? percentageBefore : 1 - percentageAfter ),
            left = percentageBefore - percentageCenterOffset,
            right = percentageAfter;

      this.thumbHorizontal.style.left = `${left * 100}%`;
      this.thumbHorizontal.style.right = `${right * 100}%`;

    }

    _updateVerticalScrolling () {

      const scrollTopPrev = this._scrollTop,
            scrollTop = this.viewport.scrollTop;

      if ( scrollTopPrev === scrollTop ) return;

      this._scrollTop = scrollTop;

      this._resetScrolling ();

      if ( this._isVerticalScrolling ) return;

      this._isVerticalScrolling = true;

      this.scrollbars.classList.toggle ( this.options.classes.isVerticalScrolling, true );

    }

    _updateVerticalTrack () {

      const prev = this.vertical,
            sizeVisible = this.viewport.clientHeight,
            sizeTotal = this.viewport.scrollHeight,
            sizeTrack = this.trackVertical.clientHeight,
            enabled = ( sizeVisible < sizeTotal );

      this.vertical = { sizeVisible, sizeTotal, sizeTrack, enabled };

      if ( sizeVisible !== prev.sizeVisible || sizeTotal !== prev.sizeTotal || sizeTrack !== prev.sizeTrack ) {

        this._updateVerticalThumb ();

      }

      if ( enabled !== prev.enabled ) {

        this.scrollbars.classList.toggle ( this.options.classes.hasVertical, enabled );

        this._updateHorizontalTrack ();

      }

    }

    _updateVerticalThumb () {

      const {enabled, sizeVisible, sizeTotal, sizeTrack} = this.vertical;

      if ( !enabled ) return;

      const sizeScrolled = this.viewport.scrollTop,
            percentageBefore = sizeScrolled / sizeTotal,
            percentageAfter = ( sizeTotal - sizeScrolled - sizeVisible ) / sizeTotal,
            percentageCenterMin = this.options.thumb.minSize / sizeTrack,
            percentageCenterOffset = Math.max ( 0, percentageCenterMin - ( 1 - percentageBefore - percentageAfter ) ) * ( percentageBefore < percentageAfter ? percentageBefore : 1 - percentageAfter ),
            top = percentageBefore - percentageCenterOffset,
            bottom = percentageAfter;

      this.thumbVertical.style.top = `${top * 100}%`;
      this.thumbVertical.style.bottom = `${bottom * 100}%`;

    }

    _resetScrolling () {

      this._isHorizontalScrolling = false;
      this._isVerticalScrolling = false;

      this.scrollbars.classList.toggle ( this.options.classes.isHorizontalScrolling, false );
      this.scrollbars.classList.toggle ( this.options.classes.isVerticalScrolling, false );

    }

    /* RESIZE CONTENT */

    ___resizeContent () {

      if ( !window.ResizeObserver ) return;

      this.contentObserver = new ResizeObserver ( this.__resizeContent );

      this.contentObserver.observe ( this.content );

    }

    ___resizeContent_off () {

      if ( !this.contentObserver ) return;

      this.contentObserver.disconnect ();

      this.contentObserver = null;

    }

    __resizeContent () {

      this._update ();

    }

    /* RESIZE VIEWPORT */

    ___resizeViewport () {

      if ( !window.ResizeObserver ) return;

      this.viewportObserver = new ResizeObserver ( this.__resizeViewport );

      this.viewportObserver.observe ( this.viewport );

    }

    ___resizeViewport_off () {

      if ( !this.viewportObserver ) return;

      this.viewportObserver.disconnect ();

      this.viewportObserver = null;

    }

    __resizeViewport () {

      this._update ();

    }

    /* SCROLL VIEWPORT */

    ___scrollViewport () {

      this.viewport.addEventListener ( 'scroll', this.__scrollViewport, { passive: true } );

    }

    ___scrollViewport_off () {

      this.viewport.removeEventListener ( 'scroll', this.__scrollViewport );

    }

    __scrollViewport () {

      this._updateHorizontalScrolling ();
      this._updateVerticalScrolling ();

      this._updateHorizontalThumb ();
      this._updateVerticalThumb ();

    }

    /* SCROLL TRACK HORIZONTAL */

    ___scrollTrackHorizontal () {

      this._on ( false, this.$trackHorizontal, 'wheel', this.__scrollTrackHorizontal );

    }

    __scrollTrackHorizontal ( event ) {

      const scrollLeftPrev = this.viewport.scrollLeft,
            scrollLeft = _.clamp ( scrollLeftPrev + event.deltaX, 0, this.viewport.scrollWidth - this.viewport.clientWidth );

      if ( scrollLeft === scrollLeftPrev ) return;

      this.viewport.scrollLeft = scrollLeft;

      event.preventDefault ();
      event.stopPropagation ();

    }

    /* SCROLL TRACK VERTICAL */

    ___scrollTrackVertical () {

      this._on ( false, this.$trackVertical, 'wheel', this.__scrollTrackVertical );

    }

    __scrollTrackVertical ( event ) {

      const scrollTopPrev = this.viewport.scrollTop,
            scrollTop = _.clamp ( scrollTopPrev + event.deltaY, 0, this.viewport.scrollHeight - this.viewport.clientHeight );

      if ( scrollTop === scrollTopPrev ) return;

      this.viewport.scrollTop = scrollTop;

      event.preventDefault ();
      event.stopPropagation ();

    }

    /* DRAG */

    ___drag ( track, thumb, handler, draggingClass ) {

      if ( Browser.is.mobile ) return;

      let isDragging = false,
          pointOffset = { x: 0, y: 0 }, // Recentering coordinates to make sure it feels like thumbs are dragged rather than recentered
          pointEvent = { x: 0, y: 0 };

      const updatePointOffset = event => {
        if ( event.target === thumb ) {
          const thumbRect = thumb.getBoundingClientRect ();
          const thumbX = thumbRect.left + ( thumbRect.width / 2 );
          const thumbY = thumbRect.top + ( thumbRect.height / 2 );
          pointOffset = {
            x: thumbX - event.clientX,
            y: thumbY - event.clientY
          };
        } else {
          pointOffset = { x: 0, y: 0 };
        }
      };

      const updatePointEvent = event => {
        pointEvent = {
          x: event.clientX + pointOffset.x,
          y: event.clientY + pointOffset.y
        };
      };

      const onDrag = event => {
        updatePointEvent ( event );
        handler ( pointEvent );
      };

      const onStart = event => {
        isDragging = true;
        $.$document.on ( Pointer.move, onMove );
        $.$document.one ( Pointer.up, onEnd );
        this.scrollbars.classList.toggle ( draggingClass, true );
        $.html.classList.toggle ( this.options.classes.dragging, true );
        updatePointOffset ( event );
        onDrag ( event );
      };

      const onMove = _.frames ( event => {
        if ( !isDragging ) return;
        onDrag ( event );
      });

      const onEnd = event => {
        isDragging = false;
        $.$document.off ( Pointer.move, onMove );
        $.$document.off ( Pointer.up, onEnd );
        this.scrollbars.classList.toggle ( draggingClass, false );
        $.html.classList.toggle ( this.options.classes.dragging, false );
        onDrag ( event );
      };

      this._on ( false, $(track), Pointer.down, onStart );

    }

    /* DRAG HORIZONTAL */

    ___dragHorizontal () {

      this.___drag ( this.trackHorizontal, this.thumbHorizontal, this.__dragHorizontal.bind ( this ), this.options.classes.isHorizontalDragging );

    }

    __dragHorizontal ( point ) {

      const rect = this.trackHorizontal.getBoundingClientRect (),
            percentage = ( point.x - rect.left ) / rect.width;

      return this.setHorizontalThumbPercentage ( percentage );

    }

    /* DRAG VERTICAL */

    ___dragVertical () {

      this.___drag ( this.trackVertical, this.thumbVertical, this.__dragVertical.bind ( this ), this.options.classes.isVerticalDragging );

    }

    __dragVertical ( point ) {

      const rect = this.trackVertical.getBoundingClientRect (),
            percentage = ( point.y - rect.top ) / rect.height;

      return this.setVerticalThumbPercentage ( percentage );

    }

    /* API */

    setHorizontalThumbPercentage ( percentage ) {

      percentage = _.clamp ( percentage, 0, 1 );

      const scrollLeft = ( this.horizontal.sizeTotal * percentage ) - ( this.horizontal.sizeVisible / 2 );

      this.viewport.scrollLeft = scrollLeft;

    }

    setVerticalThumbPercentage ( percentage ) {

      percentage = _.clamp ( percentage, 0, 1 );

      const scrollTop = ( this.vertical.sizeTotal * percentage ) - ( this.vertical.sizeVisible / 2 );

      this.viewport.scrollTop = scrollTop;

    }

  }

  /* FACTORY */

  Factory.make ( Scrollbars, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Browser, Svelto.Factory, Svelto.Pointer ));
