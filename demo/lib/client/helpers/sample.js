
SampleHelpers = new AntiHelpers ();

SampleHelpers.registerAs ( 'sample' );

/* WIDGETS */

SampleHelpers.define ( 'image', function ( classes ) {

  return '<img src="/sample/sample.png" class="' + ( classes || '' ) + '"/>';

});

SampleHelpers.define ( 'imageWide', function () {

  return '<img src="/sample/sample-wide.jpg"';

});

SampleHelpers.define ( 'paragraph', function () {

  let widths = ['95%', '92%', '100%', '87%', '97%', '93%', '97%'];

  return widths.map ( width => SWHelpers.placeholder ( width, 10, false ) ).join ( '' );

});

SampleHelpers.define ( 'select', function ( name ) {

  return '<select name="' + ( name || '' ) + '" id="' + ( name || '' ) + '" placeholder="Select a value...">' +
           '<option value="public" selected="selected">Public</option>' +
           '<option value="private">Private</option>' +
           '<optgroup label="Elo">' +
             '<option value="1200">1200+</option>' +
             '<option value="1300">1300+</option>' +
             '<option value="1400">1400+</option>' +
             '<option value="1500">1500+</option>' +
             '<option value="1600">1600+</option>' +
             '<option value="1700">1700+</option>' +
             '<option value="1800">1800+</option>' +
             '<option value="1900">1900+</option>' +
             '<option value="2000">2000+</option>' +
             '<option value="2100">2100+</option>' +
           '</optgroup>' +
         '</select>';

});

SampleHelpers.define ( 'square', function ( classes ) {

  return '<div class="square-sample ' + ( classes || '' ) + '">' +
           '<p>' + SampleHelpers.text ( 10 ) + '</p>' +
         '</div>';

});

SampleHelpers.define ( 'text', function ( wordsNr ) {

  let loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquet tincidunt turpis, in pharetra mi convallis ut. Vivamus eget sodales nibh, eu placerat erat. Vivamus massa urna, volutpat non tempus eget, placerat quis elit. Nullam pretium id arcu sed eleifend. Phasellus sollicitudin quis ante nec ornare. Maecenas nibh eros, vehicula vel eros eget, viverra semper nisi. Nulla facilisi. Praesent pretium porttitor arcu, sit amet consequat neque luctus non. Cras sodales, justo quis tempus dignissim, diam est commodo orci, eget accumsan sem ante vitae sem. Curabitur quam ipsum, porta id sapien in, consectetur auctor nibh. Vivamus egestas ante vel cursus aliquet. In non ante nec velit tempus lacinia nec sollicitudin ex. Phasellus semper lorem a diam scelerisque, sed accumsan erat molestie. Mauris vulputate lacinia erat. Nunc urna risus, facilisis at posuere in, pulvinar quis odio. Maecenas et sollicitudin arcu.';

  if ( lodash.isNumber ( wordsNr ) ) {

    return loremIpsum.toLowerCase ().split ( '.' ).join ( '' ).split ( ',' ).join ( '' ).split ( ' ' ).slice ( 0, wordsNr ).join ( ' ' );

  } else {

    return loremIpsum;

  }

});

/* CODE */

SampleHelpers.define ( 'css', function () {

  return `.widget {
  @include last-child-no-gutter ();
  position: relative;
  margin: 0 0 $gutter;

  &.disabled {
    cursor: default !important;
    opacity: $widget-disabled-opacity !important;
  }
}`;

});

SampleHelpers.define ( 'html', function () {

  return `<div class="divider">
  <b>HTML</b>
</div>
<div class="multiple">
  <div class="label">Label</div>
  <div class="button">Button</div>
  <div class="container">Container</div>
</div>`;

});

SampleHelpers.define ( 'js', function () {

  return `(function ( $, _, window, document, undefined ) {
  'use strict';

  /* ANIMATION */

  UI.animation = {
    slow: 500,
    normal: 350,
    fast: 150 };
  }

( jQuery, _, window, document ));`;

});
