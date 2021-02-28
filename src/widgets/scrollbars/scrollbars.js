
(function ( $, _, Svelto, Browser, Factory, Pointer ) {

  /* CONFIG */

  let config = {
    name: 'scrollbars',
    plugin: true,
    selector: '.scrollbars',
    options: {
      thumb: {
        minSize: 20
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

    _getThumbStateBySizeScrolled ( trackState, sizeScrolled ) {

      const {sizeVisible, sizeTotal, sizeTrack} = trackState;

      const percentageCenterMin = this.options.thumb.minSize / sizeTrack,
            percentageCenterVisible = sizeVisible / sizeTotal,
            percentageCenter = Math.max ( percentageCenterMin, percentageCenterVisible ),
            size = percentageCenter;

      const sizeScrollable = sizeTotal - sizeVisible,
            percentageScrolled = sizeScrolled / sizeScrollable,
            percentageDistance = percentageScrolled - ( percentageCenter / 2 ),
            percentageDistanceOffset = percentageCenter / 2,
            percentageDistanceOffsetWeight = ( percentageScrolled <= .5 ? 1 - ( percentageScrolled / .5 ): - ( percentageScrolled - .5 ) * 2 ),
            percentageDistanceAdjustment = percentageDistanceOffset * percentageDistanceOffsetWeight,
            distance = percentageDistance + percentageDistanceAdjustment;

      const midpoint = distance + ( size / 2 );

      return { size, sizeScrolled, percentageScrolled, distance, midpoint };

    }

    _getThumbStateByTargetMidpoint ( trackState, midpoint, iterations = 20, epsilon = .0001 ) { //UGLY: Binary searching is a brute force approach here, there should be a closed form equation that just returns the right value we need

      const sizeScrollable = trackState.sizeTotal - trackState.sizeVisible;

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

      if ( !this.horizontal.enabled ) return;

      const {size, distance} = this._getThumbStateBySizeScrolled ( this.horizontal, this.viewport.scrollLeft );

      this.thumbHorizontal.style.left = `${distance * 100}%`;
      this.thumbHorizontal.style.width = `${size * 100}%`;

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

    /* API */

    setHorizontalThumbPercentage ( percentage ) {

      percentage = _.clamp ( percentage, 0, 1 );

      const scrollLeft = ( this.horizontal.sizeTotal - this.horizontal.sizeVisible ) * percentage;

      this.viewport.scrollLeft = scrollLeft;

    }

    setVerticalThumbPercentage ( percentage ) {

      percentage = _.clamp ( percentage, 0, 1 );

      const scrollTop = ( this.vertical.sizeTotal - this.vertical.sizeVisible ) * percentage;

      this.viewport.scrollTop = scrollTop;

    }

  }

  /* FACTORY */

  Factory.make ( Scrollbars, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Browser, Svelto.Factory, Svelto.Pointer ));