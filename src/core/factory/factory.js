
// @require core/plugin/plugin.js
// @require core/readify/readify.js
// @require core/widgetize/widgetize.js

(function ( $, _, Svelto, Instances, Widgets, Plugin, Readify, Widgetize ) {

  /* FACTORY */

  let Factory = {

    /* API */

    make ( Widget, config, namespace = Widgets, instances = Instances ) {

      for ( let i = 0, l = this.makers.order.length; i < l; i++ ) {

        this.makers[this.makers.order[i]]( Widget, config, namespace, instances );

      }

    },

    unmake ( Widget, namespace = Widgets, instances = Instances ) {

      for ( let i = 0, l = this.unmakers.order.length; i < l; i++ ) {

        this.unmakers[this.unmakers.order[i]]( Widget, namespace, instances );

      }

    },

    ready ( Widget, namespace = Widgets, instances = Instances ) {

      for ( let i = 0, l = this.readifiers.order.length; i < l; i++ ) {

        this.readifiers[this.readifiers.order[i]]( Widget, namespace, instances );

      }

    },

    /* MAKERS */

    makers: {

      order: ['configure', 'namespace', 'instances', 'plugin', 'ready', 'widgetize'], // The order in which the makers will be called

      configure ( Widget, config = {} ) {

        config.Name = _.upperFirst ( config.name );

        Widget.config = config;

      },

      namespace ( Widget, config, namespace ) {

        if ( !_.isObject ( namespace ) ) return;

        namespace[Widget.config.Name] = Widget;

      },

      instances ( Widget, config, namespace, instances ) {

        if ( !_.isObject ( instances ) ) return;

        instances[Widget.config.Name] = [];

      },

      plugin ( Widget ) {

        Plugin.make ( Widget );

      },

      ready ( Widget, config ) {

        const initReady = Widget._initReady || Widget.__proto__._initReady || Widgets.Widget._initReady; //IE10 support -- static property

        initReady.call ( Widget );

        Readify.add ( Widget, config.ready );

      },

      widgetize ( Widget, config ) {

        Widgetize.add ( Widget, config.ready );

      }

    },

    /* UNMAKERS */

    unmakers: {

      order: ['widgetize', 'ready', 'plugin', 'instances', 'namespace', 'configure'], // The order in which the unmakers will be called

      configure ( Widget ) {

        delete Widget.config.Name;
        delete Widget.config;

      },

      namespace ( Widget, namespace ) {

        if ( !_.isObject ( namespace ) ) return;

        delete namespace[Widget.config.Name];

      },

      instances ( Widget, namespace, instances ) {

        if ( !_.isObject ( instances ) ) return;

        instances[Widget.config.Name].forEach ( instance => instance.destroy () );

        delete instances[Widget.config.Name];

      },

      plugin ( Widget ) {

        Plugin.unmake ( Widget );

      },

      ready ( Widget ) {

        Readify.remove ( Widget );

      },

      widgetize ( Widget ) {

        Widgetize.remove ( Widget );

      }

    },

    /* READIFIERS */

    readifiers: {

      order: ['ready', 'widgetize'], // The order in which the readifiers will be called

      ready ( Widget ) {

        Factory.unmakers.ready ( Widget );

      },

      widgetize ( Widget ) { //TODO: Code duplication, look at `Widgetize.add`

        let widgetize = Widget.widgetize || Widget.__proto__.widgetize || Widgets.Widget.widgetize, //IE10 support -- static property
            $widgets = $.$html.findAll ( Widget.config.selector );

        Widgetize.worker ( [[widgetize, Widget]], $widgets );

      }

    }

  };

  /* EXPORT */

  Svelto.Factory = Factory;

}( Svelto.$, Svelto._, Svelto, Svelto.Instances, Svelto.Widgets, Svelto.Plugin, Svelto.Readify, Svelto.Widgetize ));
