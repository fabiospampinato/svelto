
/* =========================================================================
 * Svelto - Widgets - Rails
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/animations/animations.js
 * @require core/widget/widget.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Animations, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'rails',
    plugin: true,
    selector: '.rails',
    options: {
      scroll: {
        speed: 200 // The distance scrolled when calling `left` or `right`
      },
      selectors: {
        start: '.rails-start',
        left: '.rails-left',
        right: '.rails-right',
        end: '.rails-end',
        content: '.rails-content',
        active: '.rails-active'
      },
      animations: {
        scroll: Animations.fast
      },
      keystrokes: {
        'home, page_up': 'start',
        'left': 'left',
        'right': 'right',
        'end, page_down': 'end'
      }
    }
  };

  /* RAILS */

  class Rails extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$rails = this.$element;

      this.$start = this.$rails.find ( this.options.selectors.start );
      this.$left = this.$rails.find ( this.options.selectors.left );
      this.$right = this.$rails.find ( this.options.selectors.right );
      this.$end = this.$rails.find ( this.options.selectors.end );
      this.$content = this.$rails.find ( this.options.selectors.content );
      this.$active = this.$content.find ( this.options.selectors.active );

    }

    _init () {

      this._scrollToElement ( this.$active );
      this._updateButtons ();

    }

    _events () {

      this.___keydown ();
      this.___scroll ();
      this.___startTap ();
      this.___leftTap ();
      this.___rightTap ();
      this.___endTap ();

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( [this.$document, 'keydown', this.__keydown] );

    }

    /* START TAP */

    ___startTap () {

      this._on ( this.$start, Pointer.tap, this.start );

    }

    /* LEFT TAP */

    ___leftTap () {

      this._on ( this.$left, Pointer.tap, this.left );

    }

    /* RIGHT TAP */

    ___rightTap () {

      this._on ( this.$right, Pointer.tap, this.right );

    }

    /* END TAP */

    ___endTap () {

      this._on ( this.$end, Pointer.tap, this.end );

    }

    /* UPDATE */

    _updateButtons () {

      let scrollLeft;

      if ( this.$start.length || this.$left.length || this.$right.length || this.$end.length ) {

        scrollLeft = this.$content.scrollLeft ();

      }

      if ( this.$start.length || this.$left.length ) {

        let isStart = ( scrollLeft === 0 );

        this.$start.add ( this.$left ).toggleClass ( this.options.classes.disabled, isStart );

      }

      if ( this.$end.length || this.$right.length ) {

        let isEnd = ( this.$content[0].scrollWidth - scrollLeft - this.$content.outerWidth () <= 1 );

        this.$end.add ( this.$right ).toggleClass ( this.options.classes.disabled, isEnd );

      }

    }

    /* SCROLL */

    ___scroll () {

      this._on ( true, this.$content, 'scroll', this._throttle ( this._updateButtons, Math.max ( this.options.animations.scroll || 100 ) ) );

    }

    _scroll ( left ) {

      this.$content.animate ( { scrollLeft: left }, this.options.animations.scroll );

    }

    _deltaScroll ( delta )  {

      this._scroll ( this.$content.scrollLeft () + delta );

    }

    _scrollToElement ( $element ) {

      if ( !$element.length ) return;

      let left = $element.position ().left + this.$content.scrollLeft () + ( $element.outerWidth () / 2 ) - ( this.$content.outerWidth () / 2 );

      this._scroll ( left );

    }

    /* API */

    start () {

      this._scroll ( 0 );

    }

    left () {

      this._deltaScroll ( - this.options.scroll.speed );

    }

    right () {

      this._deltaScroll ( this.options.scroll.speed );

    }

    end () {

      this._scroll ( this.$content[0].scrollWidth );

    }

  }

  /* FACTORY */

  Factory.init ( Rails, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations, Svelto.Pointer ));
