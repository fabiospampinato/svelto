
/* =========================================================================
 * Svelto - Widgets - Remote - Popover
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require widgets/popover/popover.js
 * @require widgets/remote/widget/widget.js
 * ========================================================================= */

//FIXME: The tip will disappear during a resize (not fixable without changing the markup of a popover just for this)

(function ( $, _, Svelto, Widgets, Factory, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remotePopover',
    templates: {
      placeholder: '<div class="popover container <%= o.classes.placeholder %> <%= o.classes.placeholderExtra %>">' +
                     '<svg class="spinner">' +
                       '<circle cx="1.625em" cy="1.625em" r="1.25em">' +
                     '</svg>' +
                   '</div>'
    },
    options: {
      widget: Widgets.Popover,
      positionate: {}, // Extending Widget.Popover.options.positionate
      classes: {
        placeholder: 'remote-popover-placeholder',
        loaded: 'remote-popover-loaded',
        resizing: 'remote-popover-resizing',
        showing: 'remote-popover-showing'
      },
      animations: {
        resize: Animations.fast
      }
    }
  };

  /* REMOTE POPOVER */

  class RemotePopover extends Widgets.RemoteWidget {

    /* PRIVATE */

    _positionate () {

      this.$widget.popover ( 'instance' )._positionate ();

    }

    /* WIDGET */

    _widgetInit () {

      this.$widget.popover ( 'option', 'positionate', this.options.positionate );

    }

    _widgetReplaceWith ( $replacement ) {

      let classList = this.$widget.attr ( 'class' ) || '',
          pointingClass = classList.split ( ' ' ).find ( cls => cls.startsWith ( 'pointing-' ) ),
          matrix = this.$widget.matrix (),
          positionateGuid = this.$widget[0]._positionateGuid;

      if ( pointingClass ) $replacement.addClass ( pointingClass );

      super._widgetReplaceWith ( $replacement );

      this.$widget.matrix ( matrix );
      this.$widget[0]._positionateGuid = positionateGuid;

      if ( !this.options.resize ) this._positionate ();

    }

    _widgetResizing () {

      this._positionate ();

    }

  }

  /* FACTORY */

  Factory.init ( RemotePopover, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations ));
