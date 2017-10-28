
/* =========================================================================
 * Svelto - Widgets - Remote - Popover
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require ../widget/widget.js
 * @require widgets/popover/popover.js
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
      cache: {
        enabled: true
      },
      classes: {
        placeholder: 'remote-popover-placeholder',
        loaded: 'remote-popover-loaded',
        resizing: 'remote-popover-resizing',
        showing: 'remote-popover-showing'
      },
      animations: {
        placeholder: Animations.fast,
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

      super._widgetInit ();

    }

    _widgetReplaceWith ( $replacement ) {

      let {fullscreen, fullscreenRequest} = this.options.widget.config.options.classes,
          isFullscreen = $replacement.hasClass ( fullscreen ) || $replacement.hasClass ( fullscreenRequest ),
          matrix = this.$widget.matrix (),
          positionateGuid = this.$widget[0]._positionateGuid,
          {$anchor} = this.$widget.popover ( 'instance' );

      if ( !isFullscreen ) {

        let classList = this.$widget.attr ( 'class' ) || '',
            classes = classList.split ( ' ' ),
            positionateClass = classes.find ( cls => cls.startsWith ( 'positionate-' ) ),
            pointingClass = classes.find ( cls => cls.startsWith ( 'pointing-' ) );

        if ( positionateClass ) $replacement.addClass ( positionateClass );
        if ( pointingClass ) $replacement.addClass ( pointingClass );

      }

      super._widgetReplaceWith ( $replacement );

      this.$widget.popover ( 'instance' ).$anchor = $anchor;
      this.$widget.matrix ( matrix );
      this.$widget[0]._positionateGuid = positionateGuid;

      if ( !this.options.resize ) this._positionate ();

    }

    _widgetResizing () {

      this._positionate ();

    }

  }

  /* FACTORY */

  Factory.make ( RemotePopover, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations ));
