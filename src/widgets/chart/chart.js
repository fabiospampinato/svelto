
// @require ./config.js
// @require core/widget/widget.js

/* CHART */

(function ( $, _, Svelto, Widgets, Factory, ChartLib ) {

  /* CHECK IF LOADED */

  if ( !ChartLib ) return;

  /* CONFIG */

  let config = {
    name: 'chart',
    plugin: true,
    selector: 'canvas.chart',
    options: {
      defaults: {
        type: 'line',
        colors: ['#1565c0'], // Primary color
        labels: ['Dataset'],
        datas: [[]],
        chartOptions: {}
      },
      datas: {
        type: 'type',
        colors: 'colors',
        labels: 'labels',
        datas: 'datas',
        chartOptions: 'chart-options'
      }
    }
  };

  /* CHART */

  class Chart extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$chart = this.$element;
      this.chart = this.element;

      Object.keys ( this.options.datas ).forEach ( property => {

        this[property] = this.$chart.data ( this.options.datas[property] ) || this.options.defaults[property];

      });

      if ( !_.isArray ( this.datas[0] ) ) this.datas = [this.datas];

    }

    _init () {

      let settings = this._getSettings ();

      this.chartInstance = new ChartLib ( this.chart, settings );

    }

    _destroy () {

      this.chartInstance.destroy ();

    }

    /* PRIVATE */

    _getSettings () {

      return {
        type: this.type,
        data: {
          labels: this.datas[0].map ( ( point, index ) => index + 1 ),
          datasets: this.labels.map ( ( label, index ) => ({
            label,
            data: this.datas[index],
            backgroundColor: this.colors[index]
          }))
        },
        options: this.chartOptions
      };

    }

  }

  /* FACTORY */

  Factory.make ( Chart, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, window.Chart ));
