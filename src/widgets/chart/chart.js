
// @require ./config.js
// @require core/widget/widget.js

/* CHART */

(function ( $, _, Svelto, Factory, ChartLib ) {

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
        ticks: undefined,
        tooltips: undefined,
        visibilities: [],
        chartOptions: {}
      },
      datas: {
        type: 'type',
        colors: 'colors',
        labels: 'labels',
        datas: 'datas',
        ticks: 'ticks',
        tooltips: 'tooltips',
        visibilities: 'visibilities',
        chartOptions: 'chart-options'
      }
    }
  };

  /* CHART */

  class Chart extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$chart = this.$element;
      this.chart = this.element;

    }

    _init () {

      this._initDatas ();

      let settings = this._getSettings ();

      this.chartInstance = new ChartLib ( this.chart, settings );

    }

    _initDatas () {

      Object.keys ( this.options.datas ).forEach ( property => {

        this[property] = this.$chart.data ( this.options.datas[property] ) || this.options.defaults[property];

      });

      if ( !_.isArray ( this.datas[0] ) ) this.datas = [this.datas];

    }

    _destroy () {

      this.chartInstance.destroy ();

    }

    /* PRIVATE */

    _getSettings () {

      const settings = {
        type: this.type,
        data: {
          labels: this.ticks || this.datas[0].map ( ( point, index ) => index + 1 ),
          datasets: this.labels.map ( ( label, index ) => ({
            label,
            data: this.datas[index],
            hidden: this.visibilities[index] === false,
            backgroundColor: this.colors[index]
          }))
        },
        options: this.chartOptions
      };

      if ( this.tooltips ) {

        _.merge ( settings.options, {
          tooltips: {
            callbacks: {
              title: datas => this.tooltips[datas[0].index]
            }
          }
        });

      }

      return settings;

    }

    /* API */

    update () {

      this._initDatas ();

      const {data} = this._getSettings ();

      this.chartInstance.data.labels = data.labels;
      this.chartInstance.data.datasets.forEach ( ( dataset, i ) => {
        _.merge ( dataset, data.datasets[i] );
      });

      this.chartInstance.update ();

    }

  }

  /* FACTORY */

  Factory.make ( Chart, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Factory, window.Chart ));
