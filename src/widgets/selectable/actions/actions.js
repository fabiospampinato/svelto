
/* =========================================================================
 * Svelto - Widgets - Selectable - Actions
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/actions/actions.js
 * @require ../selectable.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectableActions',
    plugin: true,
    selector: '.selectable-actions',
    options: {
      widget: Widgets.Selectable,
      placeholders: {
        id: '%ID%'
      },
      datas: {
        id: 'id'
      },
      selectors: {
        id: false // Selects the element containing the id (from its `tr` element), for instance it could be `> td:first-child`. If falsy, `datas.id` will be used
      }
    }
  };

  /* SELECTABLE ACTIONS */

  class SelectableActions extends Widgets.Actions {

    /* UTILITIES */

    _getIds () {

      let $rows = this._targetInstance.get (),
          ids = $rows.get ().map ( row => this.options.selectors.id ? $(row).find ( this.options.selectors.id ).text () : $(row).data ( this.options.datas.id ) );

      return _.compact ( ids );

    }

    _getAjax ( $trigger ) {

      let ajax = super._getAjax ( $trigger ),
          ids = this._getIds ();

      ajax.url = ajax.url.replace ( this.options.placeholders.id, ids.join ( this.options.characters.separator ) );
      ajax.data = _.extend ( ajax.data, {ids} );

      return ajax;

    }

  }

  /* FACTORY */

  Factory.make ( SelectableActions, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
