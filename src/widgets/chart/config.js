
// @optional ./vendor/Chart.js
// @require core/animations/animations.js

/* CHART */

(function ( $, _, Svelto, Animations, ChartLib ) {

  /* CHECK IF LOADED */

  if ( !ChartLib ) return;

  /* DEFAULTS */

  _.merge ( ChartLib.defaults.global, {
    maintainAspectRatio: false,
    hover: {
      animationDuration: Animations.normal
    },
    defaultColor: '#ffffff', // White background color
    defaultFontColor: '#3f3f3f', // White text color
    defaultFontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif", // Default font family
    defaultFontSize: 13.4544,
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 16,
        fontSize: 16,
        padding: 10
      }
    },
    tooltips: {
      backgroundColor: '#212121', // Black background color
      titleFontSize: 16,
      bodyFontSize: 16,
      footerFontSize: 16
    },
    animation: {
      duration: Animations.normal
    }
  });

}( Svelto.$, Svelto._, Svelto, Svelto.Animations, window.Chart ));
