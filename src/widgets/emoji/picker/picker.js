
/* =========================================================================
 * Svelto - Widgets - Emoji - Picker
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require lib/emojify/emojify.js
 * @require widgets/storable/storable.js
 * ========================================================================= */

//TODO: Integration with editor

(function ( $, _, Svelto, Widgets, Factory, Pointer, EmojiData, Emoji ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'emojipicker',
    plugin: true,
    selector: '.emojipicker',
    templates: {
      base: '<div class="tabs emojipicker card bordered">' +
              '<% print ( self.triggers ( o ) ) %>' +
              '<% print ( self.containers ( o ) ) %>' +
              '<% print ( self.footer ( o ) ) %>' +
            '</div>',
      triggers: '<div class="tabs-triggers emojipicker-triggers card-header bordered">' +
                  '<% print ( self.triggerMain ( o ) ) %>' +
                  '<% for ( var i = 0, l = o.data.categories.length; i < l; i++ ) { %>' +
                    '<% print ( self.trigger ({ options: o, category: o.data.categories[i] }) ) %>' +
                  '<% } %>' +
                '</div>',
      trigger: '<div class="button" title="<%= o.category.title %>">' +
                 '<i class="icon"><%= o.category.icon %></i>' +
               '</div>',
      triggerMain: '<div class="button" title="Search & Frequent">' +
                     '<i class="icon">access_time</i>' +
                   '</div>',
      containers: '<div class="tabs-containers emojipicker-containers card-block">' +
                    '<% print ( self.containerMain ( o ) ) %>' +
                    '<% for ( var i = 0, l = o.data.categories.length; i < l; i++ ) { %>' +
                      '<% print ( self.container ({ options: o, category: o.data.categories[i] }) ) %>' +
                    '<% } %>' +
                   '</div>',
      container: '<div class="container">' +
                   '<% print ( self.emojis ({ emojis: o.category.emojis, tone: o.options.tone }) ) %>' +
                 '</div>',
      containerMain: '<div class="container main">' +
                       '<input autofocus name="search" type="search" class="gray fluid" placeholder="Search emoji">' +
                       '<% print ( self.search ( o ) ) %>' +
                       '<% print ( self.frequent ( o ) ) %>' +
                     '</div>',
      search: '<div class="search-section section">' +
                '<% if ( !o.search.emojis.length ) { %>' +
                  '<div class="search-emojis emojis empty">No emoji found</div>' +
                '<% } else { %>' +
                  '<div class="search-emojis emojis">' +
                    '<% print ( self.emojis ({ emojis: o.search.emojis, tone: o.tone }) ) %>' +
                  '</div>' +
                '<% } %>' +
              '</div>',
      frequent: '<div class="frequent-section section">' +
                  '<% if ( !o.frequent.emojis.length ) { %>' +
                    '<div class="frequent-emojis emojis empty">No emoji used recently</div>' +
                  '<% } else { %>' +
                    '<div class="frequent-emojis emojis">' +
                      '<% print ( self.emojis ({ emojis: o.frequent.emojis, tones: o.frequent.tones }) ) %>' +
                    '</div>' +
                  '<% } %>' +
                '</div>',
      footer: '<div class="emojipicker-footer card-footer bordered">' +
                '<% print ( self.preview ({ emoji: o.data.emojis[o.preview.id], tone: o.preview.tone }) ) %>' +
                '<% print ( self.tones ( o ) ) %>' +
              '</div>',
      preview: '<div class="emojipicker-preview">' +
                 '<div class="multiple center-y no-wrap">' +
                   '<div class="enlarged">' +
                     '<% print ( Svelto.Emoji.encode ( o.emoji.id, o.tone ) ) %>' +
                   '</div>' +
                   '<div class="multiple vertical joined texts">' +
                     '<div class="title" title="<%= o.emoji.name %>"><%= o.emoji.name %></div>' +
                     '<div class="short-names"><%= [o.emoji.id].concat ( o.emoji.alts || [] ).map ( Svelto.Emoji.encode ).join ( " " ) %></div>' +
                   '</div>' +
                 '</div>' +
               '</div>',
      tones: '<div class="emojipicker-tones">' +
               '<div class="multiple center-x joined">' +
                 '<div class="emojipicker-tone"></div>' +
                 '<div class="emojipicker-tone"></div>' +
                 '<div class="emojipicker-tone"></div>' +
                 '<div class="emojipicker-tone"></div>' +
                 '<div class="emojipicker-tone"></div>' +
                 '<div class="emojipicker-tone"></div>' +
               '</div>' +
             '</div>',
      emojis: '<div class="multiple emojis">' +
                '<% print ( o.emojis.map ( function ( emoji, index ) { return Svelto.Emoji.encode ( emoji, o.tone || o.tones[index] ) } ).join ( " " ) ) %>' +
              '</div>'
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

    static widgetize ( $ele, Widget ) {

      EmojiData.get ().then ( data => {

        Widget.config.options.data = data;
        $ele[Widget.config.name]();

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

      let emoji = event.currentTarget.getAttribute ( 'data-id' ),
          tone = Number ( event.currentTarget.getAttribute ( 'data-tone' ) ),
          data = { emoji, tone };

      this._frequentUpdate ( emoji, tone );

      this._trigger ( 'pick', data );

    }

    /* TONE */

    ___toneTap () {

      this._on ( this.$tones, Pointer.tap, this.__toneTap );

    }

    __toneTap ( event ) {

      let tone = this.$tones.get ().indexOf ( event.target ) + 1;

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

      this._on ( Pointer.enter, this.options.selectors.emoji, this.__previewEnter );
      this._on ( true, this.$containersWrapper, Pointer.leave, this.__previewLeave );

    }

    __previewEnter ( event ) {

      let emoji = event.currentTarget;

      this.options.preview.id = emoji.getAttribute ( 'data-id' );
      this.options.preview.tone = emoji.getAttribute ( 'data-tone' );

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

            for ( let keyword of keywords ) {

              if ( emoji.tags.indexOf ( keyword ) === -1 ) {

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

      rank = lodash.orderBy ( rank, [_.last, _.first, _.property ( 1 )], ['desc', 'asc', 'asc'] ).slice ( 0, this.options.frequent.limit );

      this.options.frequent.rank = rank;

      this._storageSet ( 'frequent', rank, 2592000 ); // 1 Month

      this._frequentRefresh ();

    }

    _frequentRestore () {

      let rank = this._storageGet ( 'frequent' );

      if ( !rank || _.isEqual ( this.options.frequent.rank, rank ) ) return;

      this.options.frequent.rank = rank;

      this._frequentRefresh ();

    }

  }

  /* FACTORY */

  Factory.make ( Emojipicker, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.EmojiData, Svelto.Emoji ));
