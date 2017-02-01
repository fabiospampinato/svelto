
/* =========================================================================
 * Svelto - Widgets - Selectable - Actions
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before widgets/remote/action/action.js
 * @before widgets/remote/modal/modal.js
 * @require ../selectable.js
 * @require widgets/targeter/targeter.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//TODO: Cross-browser test

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectableActions',
    plugin: true,
    selector: '.selectable-actions',
    options: {
      ajax: {}, // Default values
      actions: {
        action ( ajax ) {
          new Widgets.RemoteAction ( { ajax: ajax } ).request ();
        },
        modal ( ajax ) {
          new Widgets.RemoteModal ( { ajax: ajax } ).request ();
        },
        page ( ajax ) {
          window.location.href = ajax.url;
        }
      },
      defaultAction: 'page',
      widget: Widgets.Selectable,
      characters: {
        separator: ','
      },
      messages: {
        no_selected: 'No entries selected'
      },
      placeholders: {
        id: '%ID%'
      },
      attributes: {
        href: 'href' // In order to better support `a` elements (the data value has higher priority)
      },
      datas: {
        id: 'id',
        type: 'type',
        url: 'url',
        data: 'data',
        method: 'method'
      },
      selectors: {
        action: '.action',
        id: false // Selects the element containing the id (from it's `tr` element), for instance it could be `> td:first-child`. If falsy, `datas.id` will be used
      },
      callbacks: {
        action: _.noop
      }
    }
  };

  /* SELECTABLE ACTIONS */

  class SelectableActions extends Widgets.Targeter {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$wrapper = this.$element;
      this.$actions = this.$wrapper.find ( this.options.selectors.action );

    }

    _events () {

      super._events ();

      this.___action ();

    }

    /* ACTION */

    ___action () {

      this._on ( this.$actions, Pointer.tap, this.__action );

    }

    __action ( event ) {

      let ids = this._getIds ();

      if ( !ids.length ) return $.toast ( this.options.messages.no_selected );

      let $action = $(event.target),
          type = $action.data ( this.options.datas.type ) || this.options.defaultAction,
          action = this.options.actions[type];

      if ( !action ) return;

      let url = $action.data ( this.options.datas.url ) || $action.attr ( this.options.attributes.href ) || this.options.ajax.url,
          data = $action.data ( this.options.datas.data ) || this.options.ajax.data,
          method = $action.data ( this.options.datas.method ) || this.options.ajax.method;

      url = url.replace ( this.options.placeholders.id, ids.join ( this.options.characters.separator ) );
      data = _.extend ( data || {}, { ids: ids } );

      let ajax = _.extend ( {}, this.options.ajax, {
        url: url,
        data: data,
        method: method
      });

      action ( ajax );

      this._trigger ( 'action', event, { type: type, ajax: ajax } );

    }

    /* IDs */

    _getIds () {

      let $rows = this._targetInstance.get (),
          ids = $rows.get ().map ( row => this.options.selectors.id ? $(row).find ( this.options.selectors.id ).text () : $(row).data ( this.options.datas.id ) );

      return _.compact ( ids );

    }

  }

  /* FACTORY */

  Factory.make ( SelectableActions, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
