
// @require core/widget/widget.js

(function ( $, _, Svelto, Widgets, Factory ) {

  /* CONFIG */

  let config = {
    name: 'timeAgo',
    plugin: true,
    selector: '.timeago, .time-ago',
    options: {
      template: '[timeago]', // Template used for rendering the text
      timestamp: false, // UNIX timestamp
      title: false, // Update the title or the text?
      abort: { // Abort the loop if it has to wait more than `threshold`
        enabled: true, // Whether the abort functionality should be enabled (recommended, at least to avoid overflowing the delay https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
        threshold: 604800, // 1 week
      },
      datas: {
        template: 'template',
        timestamp: 'timestamp'
      },
      callbacks: {
        change: _.noop
      }
    }
  };

  /* TIME AGO */

  class TimeAgo extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$timeAgoElement = this.$element;

    }

    _init () {

      this.options.template = this.$timeAgoElement.data ( this.options.datas.template ) || this.options.template;

      if ( !this.options.timestamp ) {

        this.options.timestamp = this.$timeAgoElement.data ( this.options.datas.timestamp );

      }

      this._loop ();

    }

    _destroy () {

      clearTimeout ( this.loopId );

    }

    /* LOOP */

    _loop ( seconds = 0 ) {

      if ( this.options.abort.enabled && seconds > this.options.abort.threshold ) return;

      this.loopId = this._delay ( function () {

        this._loop ( this._update ().next );

      }, seconds * 1000 );

    }

    /* UPDATE */

    _update () {

      let timeAgo = _.timeAgo ( this.options.timestamp ),
          str = this.options.template.replace ( '[timeago]', timeAgo.str );;

      if ( this.options.title ) {

        this.$timeAgoElement.attr ( 'title', str );

      } else {

        this.$timeAgoElement.text ( str );

      }

      this._trigger ( 'change' );

      return timeAgo;

    }

    /* API OVERRIDES */

    enable () {

      super.enable ();

      this._loop ();

    }

    disable () {

      super.disable ();

      clearTimeout ( this.loopId );

    }

  }

  /* FACTORY */

  Factory.make ( TimeAgo, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Timer ));
