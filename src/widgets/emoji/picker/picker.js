
// @require lib/emojify/emojify.js
// @require widgets/icon/icon.js
// @require widgets/storable/storable.js

(function ( $, _, Svelto, Widgets, Factory, Icon, Pointer, EmojiData, Emoji ) {

  /* CONFIG */

  let config = {
    name: 'emojipicker',
    plugin: true,
    selector: '.emojipicker',
    templates: {
      base: _.template ( `
        <div class="tabs emojipicker card bordered">
          <% print ( Svelto.Templates.Emojipicker.triggers ( o ) ) %>
          <% print ( Svelto.Templates.Emojipicker.containers ( o ) ) %>
          <% print ( Svelto.Templates.Emojipicker.footer ( o ) ) %>
        </div>
      ` ),
      triggers: _.template ( `
        <div class="tabs-triggers emojipicker-triggers card-header bordered">
          <% print ( Svelto.Templates.Emojipicker.triggerMain ( o ) ) %>
          <% for ( var i = 0, l = o.data.categories.length; i < l; i++ ) { %>
            <% print ( Svelto.Templates.Emojipicker.trigger ({ options: o, category: o.data.categories[i] }) ) %>
          <% } %>
        </div>
      ` ),
      trigger: _.template ( `
        <div class="button" title="<%= o.category.title %>">
          <i class="icon"><%= Svelto.Icon ( o.category.icon ) %></i>
        </div>
      ` ),
      triggerMain: _.template ( `
        <div class="button" title="Search & Frequent">
          <i class="icon"><%= Svelto.Icon ( 'clock' ) %></i>
        </div>
      ` ),
      containers: _.template ( `
        <div class="tabs-containers emojipicker-containers card-block">
          <% print ( Svelto.Templates.Emojipicker.containerMain ( o ) ) %>
          <% for ( var i = 0, l = o.data.categories.length; i < l; i++ ) { %>
            <% print ( Svelto.Templates.Emojipicker.container ({ options: o, category: o.data.categories[i] }) ) %>
          <% } %>
        </div>
      ` ),
      container: _.template ( `
        <div class="container">
          <% print ( Svelto.Templates.Emojipicker.emojis ({ emojis: o.category.emojis, tone: o.options.tone }) ) %>
        </div>
      ` ),
      containerMain: _.template ( `
        <div class="container main">
          <input autofocus name="search" type="search" class="gray fluid" placeholder="Search emoji">
          <% print ( Svelto.Templates.Emojipicker.search ( o ) ) %>
          <% print ( Svelto.Templates.Emojipicker.frequent ( o ) ) %>
        </div>
      ` ),
      search: _.template ( `
        <div class="search-section section">
          <% if ( !o.search.emojis.length ) { %>
            <div class="search-emojis emojis empty">No emoji found</div>
          <% } else { %>
            <div class="search-emojis emojis">
              <% print ( Svelto.Templates.Emojipicker.emojis ({ emojis: o.search.emojis, tone: o.tone }) ) %>
            </div>
          <% } %>
        </div>
      ` ),
      frequent: _.template ( `
        <div class="frequent-section section">
          <% if ( !o.frequent.emojis.length ) { %>
            <div class="frequent-emojis emojis empty">No emoji used recently</div>
          <% } else { %>
            <div class="frequent-emojis emojis">
              <% print ( Svelto.Templates.Emojipicker.emojis ({ emojis: o.frequent.emojis, tones: o.frequent.tones }) ) %>
            </div>
          <% } %>
        </div>
      ` ),
      footer: _.template ( `
        <div class="emojipicker-footer card-footer bordered">
          <% print ( Svelto.Templates.Emojipicker.preview ({ emoji: o.data.emojis[o.preview.id], tone: o.preview.tone }) ) %>
          <% print ( Svelto.Templates.Emojipicker.tones ( o ) ) %>
        </div>
      ` ),
      preview: _.template ( `
        <div class="emojipicker-preview">
          <div class="multiple center-y no-wrap">
            <div class="enlarged">
              <% print ( Svelto.Emoji.encode ( o.emoji.id, o.tone ) ) %>
            </div>
            <div class="multiple vertical joined texts">
              <div class="title" title="<%= o.emoji.name %>"><%= o.emoji.name %></div>
              <div class="short-names"><%= [o.emoji.id].concat ( o.emoji.alts || [] ).map ( Svelto.Emoji.encode ).join ( ' ' ) %></div>
            </div>
          </div>
        </div>
      ` ),
      tones: _.template ( `
        <div class="emojipicker-tones">
          <div class="multiple center-x joined">
            <div class="emojipicker-tone"></div>
            <div class="emojipicker-tone"></div>
            <div class="emojipicker-tone"></div>
            <div class="emojipicker-tone"></div>
            <div class="emojipicker-tone"></div>
            <div class="emojipicker-tone"></div>
          </div>
        </div>
      ` ),
      emojis: _.template ( `
        <div class="multiple emojis">
          <% print ( o.emojis.map ( function ( emoji, index ) { return Svelto.Emoji.encode ( emoji, o.tone || o.tones[index] ) } ).join ( ' ' ) ) %>
        </div>
      ` )
    },
    options: {
      data: undefined,
      tone: Emoji.options.tone,
      make: { // Options passed to Emoji.make
        css: 'actionable',
        sprite: true
      },
      preview: {
        id: 'grinning',
        tone: Emoji.options.tone
      },
      frequent: {
        limit: 126,
        emojis: [],
        tones: [],
        rank: []
      },
      search: {
        limit: 126,
        emojis: [],
        query: undefined
      },
      classes: {
        searching: 'searching',
        previewing: 'previewing',
        toneActive: 'active',
        emojified: 'emojified'
      },
      selectors: {
        emoji: 'i.emoji',
        tonables: '.container:not(.main) i.emoji[data-tonable="true"]',
        input: 'input',
        preview: '.emojipicker-preview',
        enlarged: '.enlarged',
        tones: '.emojipicker-tone',
        search: '.search-section',
        frequent: '.frequent-section',
        containers: {
          wrapper: '.emojipicker-containers',
          all: '.emojipicker-containers > *'
        }
      },
      callbacks: {
        pick: _.noop
      }
    }
  };

  /* EMOJI PICKER */

  class Emojipicker extends Widgets.Storable {

    /* WIDGETIZE */

    static widgetize ( ele, Widget ) {

      EmojiData.get ().then ( data => {

        Widget.config.options.data = data;

        $.widget.get ( ele, Widget );

      });

    }

    /* SPECIAL */

    _make () {

      if ( !this.$element.is ( ':empty' ) ) return;

      let picker = this._template ( 'base', this.options );

      $(picker).replaceAll ( this.$element ).widgetize ();

      return false;

    }

    _variables () {

      super._variables ();

      this.$picker = this.$element;
      this.$input = this.$picker.find ( this.options.selectors.input );
      this.$preview = this.$picker.find ( this.options.selectors.preview );
      this.$tones = this.$picker.find ( this.options.selectors.tones );
      this.$containersWrapper = this.$picker.find ( this.options.selectors.containers.wrapper );
      this.$containers = this.$picker.find ( this.options.selectors.containers.all );
      this.$search = this.$picker.find ( this.options.selectors.search );
      this.$frequent = this.$picker.find ( this.options.selectors.frequent );

      this._tabsInstance = this.$picker.tabs ( 'instance' );
      this._lazilyEmojified = {};

    }

    _init () {

      this._updateToneIndicator ();
      this._frequentRestore ();

    }

    _events () {

      this.___lazyEmojify ();
      this.___emojiTap ();
      this.___toneTap ();
      this.___preview ();
      this.___search ();

    }

    /* LAZI EMOJIFY */

    ___lazyEmojify () {

      this._on ( true, 'tabs:change', this.__lazyEmojify );

    }

    __lazyEmojify () {

      let index = this._tabsInstance.get ();

      if ( !index || this._lazilyEmojified[index] ) return;

      let $container = this.$containers.eq ( index );

      $container.emojify ( this.options.make )
                .then ( () => $container.addClass ( this.options.classes.emojified ) );

      this._lazilyEmojified[index] = true;

    }

    /* EMOJI */

    ___emojiTap () {

      this._on ( Pointer.tap, this.options.selectors.emoji, this.__emojiTap );

    }

    __emojiTap ( event ) {

      let $emoji = $(event.target).closest ( this.options.selectors.emoji ),
          emoji = $emoji.data ( 'id' ),
          tone = Number ( $emoji.data ( 'tone' ) ),
          data = { emoji, tone };

      this._frequentUpdate ( emoji, tone );

      this._trigger ( 'pick', data );

    }

    /* TONE */

    ___toneTap () {

      this._on ( this.$tones, Pointer.tap, this.__toneTap );

    }

    __toneTap ( event ) {

      let tone = this.$tones.get ().indexOf ( event.currentTarget ) + 1;

      if ( tone === this.options.tone ) return;

      this._previousTone = this.options.tone;

      this.options.tone = tone;

      this._updateTone ();

    }

    _updateTone () {

      this._updateToneEmojis ();
      this._updateToneIndicator ();

    }

    _updateToneEmojis () {

      let $tonables = this.$picker.find ( this.options.selectors.tonables ),
          tone = this.options.tone;

      $tonables.get ().forEach ( emoji => {

        let id = emoji.getAttribute ( 'data-id' );

        Emoji.make ( id, tone, this.options.make ).then ( replacement => $(replacement).replaceAll ( emoji ) );

      });

    }

    _updateToneIndicator () {

      if ( this._previousTone ) {

        this.$tones.eq ( this._previousTone - 1 ).removeClass ( this.options.classes.toneActive );

      }

      this.$tones.eq ( this.options.tone - 1 ).addClass ( this.options.classes.toneActive );

    }

    /* PREVIEW */

    ___preview () {

      this._on ( Pointer.move, this.options.selectors.emoji, this._frames ( this.__previewMove.bind ( this ) ) );
      this._on ( true, this.$containersWrapper, Pointer.leave, this.__previewLeave );

    }

    __previewMove ( event ) {

      let $emoji = $(event.target).closest ( this.options.selectors.emoji ),
          id = $emoji.data ( 'id' ),
          tone = $emoji.data ( 'tone' );

      if ( this.options.preview.id === id && this.options.preview.tone === tone ) return;

      this.options.preview.id = id;
      this.options.preview.tone = tone;

      this._updatePreview ();

      this._togglePreview ( true );

    }

    __previewLeave ( event ) {

      this._togglePreview ( false );

    }

    _updatePreview () {

      let options = {
        emoji: this.options.data.emojis[this.options.preview.id],
        tone: this.options.preview.tone
      };

      let $preview = $(this._template ( 'preview', options )),
          $enlarged = $preview.find ( this.options.selectors.enlarged );

      $enlarged.emojify ( this.options.make ).then ( () => {

        this.$preview = $preview.replaceAll ( this.$preview );

      });

    }

    _togglePreview ( force = !this._previewing ) {

      if ( !!force !== this._previewing ) {

        this._previewing = !!force;

        this.$picker.toggleClass ( this.options.classes.previewing, this._previewing );

      }

    }

    /* SEARCH */

    ___search () {

      this._on ( this.$input, 'change cut paste keyup', this.__search );

    }

    __search () {

      let query = this.$input.val ();

      if ( query === this.options.search.query ) return;

      this.options.search.query = query;

      let emojis = [];

      this._toggleSearch ( !!query );

      if ( query ) {

        if ( query[0] === '-' ) {

          emojis = ['-1'];

        } else if ( query[0] === '+' ) {

          emojis = ['+1'];

        } else if ( query.match ( Emoji.options.regexes.emoticon ) ) {

          let found = this.options.data.emoticons[query];

          emojis = found ? _.castArray ( found ) : [];

        } else {

          let keywords = query.toLowerCase ().split ( /[\s,_-]+/ );

          for ( let id in this.options.data.emojis ) {

            let emoji = this.options.data.emojis[id],
                match = true;

            for ( let i = 0, l = keywords.length; i < l; i++ ) {

              if ( emoji.tags.indexOf ( keywords[i] ) === -1 ) {

                match = false;
                break;

              }

            }

            if ( match ) {

              emojis.push ( id );

              if ( emojis.length === this.options.search.limit ) break;

            }

          }

        }

      }

      this.options.search.emojis = emojis;

      let $search = $(this._template ( 'search', this.options ));

      $search.emojify ( this.options.make ).then ( () => {

        this.$search = $search.replaceAll ( this.$search );

      });

    }

    _toggleSearch ( force = !this._searching ) {

      if ( !!force !== this._searching ) {

        this._searching = !!force;

        this.$picker.toggleClass ( this.options.classes.searching, this._searching );

      }

    }

    /* FREQUENT */

    _frequentDefault () {

      const emojis = ['smile', 'smiley', 'grin', 'joy', 'wink', 'smirk', 'sunglasses', 'relaxed', 'blush', 'heart_eyes', 'kissing_heart', 'thinking_face', 'sweat_smile', 'unamused', 'cry', 'pensive', 'weary', 'sob', 'rage', '+1', '-1', 'v', 'ok_hand', 'muscle', 'clap', 'pray', 'see_no_evil', '100', 'tada', 'heart'];

      return emojis.map ( emoji => [emoji, 1, 1] );

    }

    _frequentRefresh () {

      this.options.frequent.emojis = this.options.frequent.rank.map ( _.first );
      this.options.frequent.tones  = this.options.frequent.rank.map ( entry => entry[1] );

      let $frequent = $(this._template ( 'frequent', this.options ));

      $frequent.emojify ( this.options.make ).then ( () => {

        this.$frequent = $frequent.replaceAll ( this.$frequent );

      });

    }

    _frequentUpdate ( emoji, tone = this.options.tone ) {

      let rank = this.options.frequent.rank,
          entry = rank.find ( entry => entry[0] === emoji && entry[1] === tone );

      if ( entry ) {

        entry[2]++;

      } else {

        rank.push ([ emoji, tone, 1 ]);

      }

      rank = rank.sort ( ( a, b ) => b[2] - a[2] ).slice ( 0, this.options.frequent.limit );

      this.options.frequent.rank = rank;

      this._storageSet ( 'frequent', rank, 2592000 ); // 1 Month

      this._frequentRefresh ();

    }

    _frequentRestore () {

      let rank = this._storageGet ( 'frequent' ) || this._frequentDefault ();

      if ( rank && !_.isEqualJSON ( this.options.frequent.rank, rank ) ) {

        this.options.frequent.rank = rank;

      }

      this._frequentRefresh ();

    }

  }

  /* FACTORY */

  Factory.make ( Emojipicker, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Icon, Svelto.Pointer, Svelto.EmojiData, Svelto.Emoji ));
