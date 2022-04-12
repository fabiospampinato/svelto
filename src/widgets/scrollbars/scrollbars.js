
(function ( $, _, Svelto, Browser, Factory, Pointer ) {

  /* CONFIG */

  let config = {
    name: 'scrollbars',
    plugin: true,
    selector: '.scrollbars',
    options: {
      scroll: {
        fast: {
          enabled: true,
          multiplier: 5
        }
      },
      thumb: {
        minSize: 20
      },
      classes: {
        autohide: 'autohide',
        autohideHover: 'autohide-hover',
        autosize: 'autosize',
        autosizeFixedHeight: 'autosize-fixed-height',
        autosizeFixedWidth: 'autosize-fixed-width',
        dragging: 'scrollbars-dragging',
        hasHorizontal: 'has-horizontal',
        hasVertical: 'has-vertical',
        isHorizontalDragging: 'is-horizontal-dragging',
        isVerticalDragging: 'is-vertical-dragging',
        isHorizontalScrolledStart: 'is-horizontal-scrolled-start',
        isVerticalScrolledStart: 'is-vertical-scrolled-start',
        isHorizontalScrolledEnd: 'is-horizontal-scrolled-end',
        isVerticalScrolledEnd: 'is-vertical-scrolled-end',
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

      this._isAutohide = this.$scrollbars.hasClass ( this.options.classes.autohide );
      this._isAutohideHover = this._isAutohide && this.$scrollbars.hasClass ( this.options.classes.autohideHover );
      this._isAutosize = this.$scrollbars.hasClass ( this.options.classes.autosize );
      this._isAutosizeHeight = this._isAutosize && this.$scrollbars.hasClass ( this.options.classes.autosizeFixedHeight );
      this._isAutosizeWidth = this._isAutosize && this.$scrollbars.hasClass ( this.options.classes.autosizeFixedWidth );

      this._isHorizontalScrolledStart = false;
      this._isVerticalScrolledStart = false;
      this._isHorizontalScrolledEnd = false;
      this._isVerticalScrolledEnd = false;
      this._isHorizontalScrolling = false;
      this._isVerticalScrolling = false;
      this._scrollTop = 0;
      this._scrollLeft = 0;
      this._resetScrolling = _.debounce ( this._resetScrolling.bind ( this ), 500 );

      this.__resizeContent = this.__resizeContent.bind ( this );
      this.__resizeViewport = this.__resizeViewport.bind ( this );
      this.__scrollViewport = this.__scrollViewport.bind ( this );
      this.__enter = this.__enter.bind ( this );

      this.horizontal = {
        enabled: false,
        sizeVisible: -1,
        sizeTotal: -1,
        sizeTrack: -1,
        sizeScrollable: -1
      };

      this.vertical = {
        enabled: false,
        sizeVisible: -1,
        sizeTotal: -1,
        sizeTrack: -1,
        sizeScrollable: -1
      };

    }

    _init () {

      this._update ();
      this._updateAutoSize ();

    }

    _events () {

      this.___scrollViewport ();
      this.___wheelViewport ();
      this.___wheelTrackHorizontal ();
      this.___wheelTrackVertical ();
      this.___resizeContent ();
      this.___resizeViewport ();
      this.___dragHorizontal ();
      this.___dragVertical ();
      this.___enter ();

    }

    _destroy () {

      this.___scrollViewport_off ();
      this.___resizeContent_off ();
      this.___resizeViewport_off ();

    }

    /* PRIVATE */

    _getThumbStateBySizeScrolled ( trackState, sizeScrolled ) {

      const {sizeVisible, sizeTotal, sizeTrack, sizeScrollable} = trackState;

      const percentageCenterMin = this.options.thumb.minSize / sizeTrack,
            percentageCenterVisible = sizeVisible / sizeTotal,
            percentageCenter = Math.max ( percentageCenterMin, percentageCenterVisible ),
            size = percentageCenter;

      const percentageScrolled = sizeScrolled / sizeScrollable,
            percentageDistance = percentageScrolled - ( percentageCenter / 2 ),
            percentageDistanceOffset = percentageCenter / 2,
            percentageDistanceOffsetWeight = ( percentageScrolled <= .5 ? 1 - ( percentageScrolled / .5 ): - ( percentageScrolled - .5 ) * 2 ),
            percentageDistanceAdjustment = percentageDistanceOffset * percentageDistanceOffsetWeight,
            distance = percentageDistance + percentageDistanceAdjustment;

      const midpoint = distance + ( size / 2 );

      return { size, sizeScrolled, percentageScrolled, distance, midpoint };

    }

    _getThumbStateByTargetMidpoint ( trackState, midpoint, iterations = 20, epsilon = .0001 ) { //UGLY: Binary searching is a brute force approach here, there should be a closed form equation that just returns the right value we need

      const {sizeScrollable} = trackState;

      const min = this._getThumbStateBySizeScrolled ( trackState, 0 );

      if ( midpoint <= min.midpoint ) return min;

      const max = this._getThumbStateBySizeScrolled ( trackState, sizeScrollable );

      if ( midpoint >= max.midpoint ) return max;

      for ( let i = 0, start = 0, end = 1; true; i++ ) {

        const mid = ( start + end ) / 2,
              sizeScrolled = sizeScrollable * mid,
              state = this._getThumbStateBySizeScrolled ( trackState, sizeScrolled );

        if ( i >= iterations || Math.abs ( state.midpoint - midpoint ) <= epsilon ) return state; // Found a good enough one

        if ( state.midpoint < midpoint ) {

          start = mid;

        } else {

          end = mid;

        }

      }

    }

    _update () {

      this._updateScrollOffsets ();

      this._updateHorizontalTrack ();
      this._updateVerticalTrack ();

      this._updateHorizontalScrolled ();
      this._updateVerticalScrolled ();

    }

    _updateAutoSize () {

      if ( this._isAutosizeHeight ) {

        this.scrollbars.style.height = `${this.vertical.sizeTotal}px`;

      }

      if ( this._isAutosizeWidth ) {

        this.scrollbars.style.width = `${this.horizontal.sizeTotal}px`;

      }

    }

    _updateScrollOffsets () {

      this._scrollTop = this.viewport.scrollTop;
      this._scrollLeft = this.viewport.scrollLeft;

    }

    _updateHorizontalScrolled () {

      const scrolledStartPrev = this._isHorizontalScrolledStart,
            scrolledEndPrev = this._isHorizontalScrolledEnd,
            scrolledStart = !!this._scrollLeft,
            scrolledEnd = this._scrollLeft !== this.horizontal.sizeScrollable;

      if ( scrolledStartPrev !== scrolledStart ) {

        this._isHorizontalScrolledStart = scrolledStart;

        this.scrollbars.classList.toggle ( this.options.classes.isHorizontalScrolledStart, this._isHorizontalScrolledStart );

      }

      if ( scrolledEndPrev !== scrolledEnd ) {

        this._isHorizontalScrolledEnd = scrolledEnd;

        this.scrollbars.classList.toggle ( this.options.classes.isHorizontalScrolledEnd, this._isHorizontalScrolledEnd );

      }

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
            sizeScrollable = sizeTotal - sizeVisible,
            enabled = ( sizeVisible < sizeTotal );

      this.horizontal = { sizeVisible, sizeTotal, sizeTrack, sizeScrollable, enabled };

      if ( sizeVisible !== prev.sizeVisible || sizeTotal !== prev.sizeTotal || sizeTrack !== prev.sizeTrack ) {

        this._updateHorizontalThumb ();

      }

      if ( enabled !== prev.enabled ) {

        this.scrollbars.classList.toggle ( this.options.classes.hasHorizontal, enabled );

        this._updateVerticalTrack ();

      }

    }

    _updateHorizontalThumb () {

      if ( !this.horizontal.enabled ) return;

      const {size, distance} = this._getThumbStateBySizeScrolled ( this.horizontal, this.viewport.scrollLeft );

      this.thumbHorizontal.style.left = `${distance * 100}%`;
      this.thumbHorizontal.style.width = `${size * 100}%`;

    }

    _updateVerticalScrolled () {

      const scrolledStartPrev = this._isVerticalScrolledStart,
            scrolledEndPrev = this._isVerticalScrolledEnd,
            scrolledStart = !!this._scrollTop,
            scrolledEnd = this._scrollTop !== this.vertical.sizeScrollable;

      if ( scrolledStartPrev !== scrolledStart ) {

        this._isVerticalScrolledStart = scrolledStart;

        this.scrollbars.classList.toggle ( this.options.classes.isVerticalScrolledStart, this._isVerticalScrolledStart );

      }

      if ( scrolledEndPrev !== scrolledEnd ) {

        this._isVerticalScrolledEnd = scrolledEnd;

        this.scrollbars.classList.toggle ( this.options.classes.isVerticalScrolledEnd, this._isVerticalScrolledEnd );

      }
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
            sizeScrollable = sizeTotal - sizeVisible,
            enabled = ( sizeVisible < sizeTotal );

      this.vertical = { sizeVisible, sizeTotal, sizeTrack, sizeScrollable, enabled };

      if ( sizeVisible !== prev.sizeVisible || sizeTotal !== prev.sizeTotal || sizeTrack !== prev.sizeTrack ) {

        this._updateVerticalThumb ();

      }

      if ( enabled !== prev.enabled ) {

        this.scrollbars.classList.toggle ( this.options.classes.hasVertical, enabled );

        this._updateHorizontalTrack ();

      }

    }

    _updateVerticalThumb () {

      if ( !this.vertical.enabled ) return;

      const {size, distance} = this._getThumbStateBySizeScrolled ( this.vertical, this.viewport.scrollTop );

      this.thumbVertical.style.top = `${distance * 100}%`;
      this.thumbVertical.style.height = `${size * 100}%`;

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

      if ( !this.content ) return;

      if ( !this._isAutosize ) return;

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
      this._updateAutoSize ();

    }

    /* RESIZE VIEWPORT */

    ___resizeViewport () {

      if ( !window.ResizeObserver ) return;

      if ( this._isAutohideHover ) return;

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

      this._updateHorizontalScrolled ();
      this._updateVerticalScrolled ();

      this._updateHorizontalThumb ();
      this._updateVerticalThumb ();

    }

    /* WHEEL VIEWPORT */

    ___wheelViewport () {

      if ( !this.options.scroll.fast.enabled ) return;

      if ( this.options.scroll.fast.multiplier === 1 ) return;

      this._on ( false, this.$viewport, 'wheel', this.__wheelViewport );

    }

    __wheelViewport ( event ) {

      if ( !event.altKey ) return;

      const isPrimaryHorizonal = Math.abs ( event.deltaX ) >= Math.abs ( event.deltaY );

      if ( isPrimaryHorizonal ) {

        this.__wheelTrackHorizontal ( event );

      } else {

        this.__wheelTrackVertical ( event );

      }

    }

    /* WHEEL TRACK HORIZONTAL */

    ___wheelTrackHorizontal () {

      this._on ( false, this.$trackHorizontal, 'wheel', this.__wheelTrackHorizontal );

    }

    __wheelTrackHorizontal ( event ) {

      const deltaMultiplier = ( event.altKey && this.options.scroll.fast.enabled ) ? this.options.scroll.fast.multiplier : 1,
            deltaDistance = event.deltaX * deltaMultiplier;

      const scrollLeftPrev = this.viewport.scrollLeft,
            scrollLeft = _.clamp ( scrollLeftPrev + deltaDistance, 0, this.viewport.scrollWidth - this.viewport.clientWidth );

      if ( scrollLeft === scrollLeftPrev ) return;

      this.viewport.scrollLeft = scrollLeft;

      event.preventDefault ();
      event.stopPropagation ();

    }

    /* WHEEL TRACK VERTICAL */

    ___wheelTrackVertical () {

      this._on ( false, this.$trackVertical, 'wheel', this.__wheelTrackVertical );

    }

    __wheelTrackVertical ( event ) {

      const deltaMultiplier = ( event.altKey && this.options.scroll.fast.enabled ) ? this.options.scroll.fast.multiplier : 1,
            deltaDistance = event.deltaY * deltaMultiplier;

      const scrollTopPrev = this.viewport.scrollTop,
            scrollTop = _.clamp ( scrollTopPrev + deltaDistance, 0, this.viewport.scrollHeight - this.viewport.clientHeight );

      if ( scrollTop === scrollTopPrev ) return;

      this.viewport.scrollTop = scrollTop;

      event.preventDefault ();
      event.stopPropagation ();

    }

    /* DRAG */

    ___drag ( isHorizontal, handler ) {

      if ( Browser.is.mobile ) return;

      const track = isHorizontal ? this.trackHorizontal : this.trackVertical,
            thumb = isHorizontal ? this.thumbHorizontal : this.thumbVertical,
            draggingClass = isHorizontal ? this.options.classes.isHorizontalDragging : this.options.classes.isVerticalDragging,
            eventCoordinate = isHorizontal ? 'clientX' : 'clientY',
            rectDistance = isHorizontal ? 'left' : 'top',
            rectSize = isHorizontal ? 'width' : 'height';

      let isDragging = false,
          isThumbDragging = false,
          trackRect = null,
          thumbRect = null,
          startOffset = 0,
          startPercentage = 0,
          startPosition = 0;

      const onDragStart = event => {
        trackRect = track.getBoundingClientRect ();
        thumbRect = thumb.getBoundingClientRect ();
        startPosition = event[eventCoordinate];
        startOffset = isThumbDragging ? ( thumbRect[rectDistance] + ( thumbRect[rectSize] / 2 ) ) - startPosition : 0;
        startPercentage = ( startPosition + startOffset - trackRect[rectDistance] ) / trackRect[rectSize];
        onDragMove ( event );
      };

      const onDragMove = event => {
        const deltaPosition = event[eventCoordinate] - startPosition;
        const deltaPercentage = deltaPosition / trackRect[rectSize];
        const dragPercentage = startPercentage + deltaPercentage;
        const trackState = isHorizontal ? this.horizontal : this.vertical;
        const thumbState = this._getThumbStateByTargetMidpoint ( trackState, dragPercentage );
        handler ( thumbState.percentageScrolled );
      };

      const onStart = event => {
        isDragging = true;
        isThumbDragging = ( event.target === thumb );
        $.$document.on ( Pointer.move, onMove );
        $.$document.one ( Pointer.up, onEnd );
        this.scrollbars.classList.toggle ( draggingClass, true );
        $.html.classList.toggle ( this.options.classes.dragging, true );
        onDragStart ( event );
      };

      const onMove = _.frames ( event => {
        if ( !isDragging ) return;
        onDragMove ( event );
      });

      const onEnd = event => {
        isDragging = false;
        $.$document.off ( Pointer.move, onMove );
        $.$document.off ( Pointer.up, onEnd );
        this.scrollbars.classList.toggle ( draggingClass, false );
        $.html.classList.toggle ( this.options.classes.dragging, false );
      };

      this._on ( false, $(track), Pointer.down, onStart );

    }

    /* DRAG HORIZONTAL */

    ___dragHorizontal () {

      this.___drag ( true, this.__dragHorizontal.bind ( this ) );

    }

    __dragHorizontal ( percentage ) {

      return this.setHorizontalThumbPercentage ( percentage );

    }

    /* DRAG VERTICAL */

    ___dragVertical () {

      this.___drag ( false, this.__dragVertical.bind ( this ) );

    }

    __dragVertical ( percentage ) {

      return this.setVerticalThumbPercentage ( percentage );

    }

    /* ENTER */

    ___enter () {

      if ( !this._isAutohideHover ) return;

      this.viewport.addEventListener ( 'mouseenter', this.__enter );

    }

    __enter () {

      this._update ();

    }

    /* API */

    setHorizontalThumbPercentage ( percentage ) {

      percentage = _.clamp ( percentage, 0, 1 );

      const scrollLeft = this.horizontal.sizeScrollable * percentage;

      this.viewport.scrollLeft = scrollLeft;

    }

    setVerticalThumbPercentage ( percentage ) {

      percentage = _.clamp ( percentage, 0, 1 );

      const scrollTop = this.vertical.sizeScrollable * percentage;

      this.viewport.scrollTop = scrollTop;

    }

  }

  /* FACTORY */

  Factory.make ( Scrollbars, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Browser, Svelto.Factory, Svelto.Pointer ));
