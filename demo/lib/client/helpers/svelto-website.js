
SWHelpers = new AntiHelpers ();

SWHelpers.registerAs ( 'sw' );

/* WIDGETS */

SWHelpers.define ( 'checkbox', function ( label, name, value ) {

  return '<label class="button checkbox outlined">' +
           '<span>' + label + '</span>' +
           '<input type="checkbox" name="' + ( name || '' ) + '" value="' + ( value || '' ) + '">' +
         '</label>';

});

SWHelpers.define ( 'checkAction', function ( label, action, checked ) {

  return '<label class="button checkbox outlined">' +
           '<span>' + label + '</span>' +
           '<input type="checkbox" ' + ( checked === true ? 'checked' : '' ) + ' onclick="' + action + '">' +
         '</label>';

});

SWHelpers.define ( 'colorpicker', function ( color ) {

  return '<div class="colorpicker">' +
           '<input name="colorpicker" value="' + ( color || '' ) + '">' +
           '<div class="colorpicker-sb">' +
             '<div class="colorpicker-handler"></div>' +
           '</div>' +
           '<div class="colorpicker-hue">' +
             '<div class="colorpicker-handler"></div>' +
           '</div>' +
         '</div>';

});

SWHelpers.define ( 'datepicker', function ( date ) {

  return '<div class="datepicker">' +
           '<input name="datepicker" value="' + ( date || '' ) + '">' +
           '<div class="datepicker-navigation">' +
             '<div class="button previous" title="Previous month">' +
               '<i class="icon">chevron_left</i>' +
             '</div>' +
             '<div class="datepicker-title"></div>' +
             '<div class="button today" title="Today">' +
               '<i class="icon">today</i>' +
             '</div>' +
             '<div class="button next" title="Next month">' +
               '<i class="icon">chevron_right</i>' +
             '</div>' +
           '</div>' +
           '<div class="datepicker-calendar">' +
             '<div class="datepicker-days-names">' +
               '<div title="Monday">M</div>' +
               '<div title="Tuesday">T</div>' +
               '<div title="Wednesday">W</div>' +
               '<div title="Thursday">T</div>' +
               '<div title="Friday">F</div>' +
               '<div title="Saturday">S</div>' +
               '<div title="Sunday">S</div>' +
             '</div>' +
             '<div class="datepicker-days">' +
               '<div class="previous">23</div>' +
               '<div class="previous">24</div>' +
               '<div class="previous">25</div>' +
               '<div class="previous">26</div>' +
               '<div class="previous">27</div>' +
               '<div class="previous">28</div>' +
               '<div class="previous">29</div>' +
               '<div class="previous">30</div>' +
               '<div class="previous">31</div>' +
               '<div>1</div>' +
               '<div>2</div>' +
               '<div>3</div>' +
               '<div>4</div>' +
               '<div>5</div>' +
               '<div>6</div>' +
               '<div>7</div>' +
               '<div>8</div>' +
               '<div>9</div>' +
               '<div>10</div>' +
               '<div>11</div>' +
               '<div>12</div>' +
               '<div>13</div>' +
               '<div>14</div>' +
               '<div>15</div>' +
               '<div>16</div>' +
               '<div>17</div>' +
               '<div>18</div>' +
               '<div>19</div>' +
               '<div>20</div>' +
               '<div>21</div>' +
               '<div>22</div>' +
               '<div>23</div>' +
               '<div>24</div>' +
               '<div>25</div>' +
               '<div>26</div>' +
               '<div>27</div>' +
               '<div>28</div>' +
               '<div>29</div>' +
               '<div>30</div>' +
               '<div>31</div>' +
               '<div class="next">1</div>' +
               '<div class="next">2</div>' +
               '<div class="next">3</div>' +
               '<div class="next">4</div>' +
               '<div class="next">5</div>' +
               '<div class="next">6</div>' +
              '</div>' +
            '</div>' +
          '</div>';

});

SWHelpers.define ( 'divider', function ( title ) {

  return '<div class="divider block">' +
           '<div class="divider-content">' + title + '</div>' +
         '</div>';

});

SWHelpers.define ( 'pager', function ( options ) {

  options = options.hash;

  options.url = ( options.url || '#' );

  if ( options.total > 1 ) {

    let parseUrl = ( nr ) => ( options.url.indexOf ( '{page}' ) !== -1 ? options.url.replace ( '{page}', nr ) : options.url + nr );

    let pager = '<div class="pager">';

    if ( options.current > 1 ) {

      let nr = options.current - 1;

      pager += '<a href="' + parseUrl ( nr ) + '" class="button outlined previous" title="Previous page">' +
                 '<i class="icon">chevron_left</i>' +
                 '<span>Previous</span>' +
               '</a>';

    }

    if ( options.current < options.total || options.total === Infinity || options.total === 'Infinity' ) {

      let nr = options.current + 1;

      pager += '<a href="' + parseUrl ( nr ) + '" class="button outlined next" title="Next page">' +
                 '<span>Next</span>' +
                 '<i class="icon">chevron_right</i>' +
               '</a>';

    }

    pager += '</div>';

    return pager;

  }

});

SWHelpers.define ( 'pagination', function ( options ) {

  options = options.hash;

  options.url = ( options.url || '#' );

  if ( options.total >= 2 ) {

    let parseUrl = ( nr ) => ( options.url.indexOf ( '{page}' ) !== -1 ? options.url.replace ( '{page}', nr ) : options.url + nr );

    let pagination = '<div class="pagination multiple joined center-x">';

    if ( options.total === Infinity || options.total == 'Infinity' ) {

      pagination += '<a href="' + options.url + '" class="button outlined">Load more</a>';

    } else {

      let blocks = ( options.blocks || 9 );

      if ( options.current > 1 ) {

        let nr = options.current - 1;

        pagination += '<a href="' + parseUrl ( nr ) + '" class="button compact outlined previous" title="Previous page">' +
                        '<i class="icon">chevron_left</i>' +
                      '</a>';

        blocks -= 1;

      }

      if ( options.current < options.total ) {

        var need_next = true;
        blocks -= 1;

      } else {

        var need_next = false;

      }

      if ( blocks > 0 ) {

        var need_current = true;
        blocks -= 1;

      } else {

        var need_current = false;

      }

      let left_blocks = options.current - 1,
          right_blocks = options.total - options.current,
          required_left_blocks = Math.floor ( blocks / 2 ),
          required_right_blocks = blocks - required_left_blocks,
          outputed_left_blocks,
          outputed_right_blocks;

      if ( left_blocks <= required_left_blocks && right_blocks <= required_right_blocks ) {

        outputed_left_blocks = left_blocks,
        outputed_right_blocks = right_blocks;

      } else if ( left_blocks <= required_left_blocks ) {

        outputed_left_blocks = left_blocks,
        outputed_right_blocks = Math.min ( right_blocks, blocks - outputed_left_blocks );

      } else if ( right_blocks <= required_right_blocks ) {

        outputed_right_blocks = right_blocks,
        outputed_left_blocks = Math.min ( left_blocks, blocks - outputed_right_blocks );

      } else {

        outputed_left_blocks = required_left_blocks,
        outputed_right_blocks = required_right_blocks;

      }

      while ( outputed_left_blocks > 0 ) {

        let nr = options.current - outputed_left_blocks;

        pagination += '<a href="' + parseUrl ( nr ) + '" class="button compact outlined" title="Page ' + nr + '">' + nr + '</a>';

        outputed_left_blocks -= 1;

      }

      if ( need_current ) {

        pagination += '<div class="label compact outlined active highlighted" title="Current page">' + options.current + '</div>';

      }

      let counter = 1;

      while ( counter <= outputed_right_blocks ) {

        let nr = options.current + counter;

        pagination += '<a href="' + parseUrl ( nr ) + '" class="button compact outlined" title="Page ' + nr + '">' + nr + '</a>';

        counter += 1;

      }

      if ( need_next ) {

        let nr = options.current + 1;

        pagination += '<a href="' + parseUrl ( nr ) + '" class="button compact outlined next" title="Next page">' +
                        '<i class="icon">chevron_right</i>' +
                      '</a>';

      }

    }

    pagination += '</div>';

    return pagination;

  }

});

SWHelpers.define ( 'placeholder', function ( width, height, content ) {

  width = isNaN ( width ) ? ( width || 0 ) : width + 'px';
  height = isNaN ( height ) ? ( height || 0 ) : height + 'px';
  content = ( content instanceof Spacebars.kw ) ? width + ' - ' + height : ( content || '' );

  return '<div class="placeholder" style="width:' + width + '; height:' + height + ';">' + content + '</div>';

});

SWHelpers.define ( 'progressbar', function ( value, decimals ) {

  return '<div data-value="' + ( value || 0 ) + '" data-decimals="' + ( decimals instanceof Spacebars.kw ? 0 : decimals || 0 ) + '" class="progressbar">' +
           '<div data-value="' + ( ( value || 0 ) + '%' ) + '" style="min-width: ' + ( ( value || 0 ) + '%' ) + '" class="progressbar-highlight"></div>' +
         '</div>';

});

SWHelpers.define ( 'radio', function ( label, name, value ) {

  return '<label class="button radio outlined">' +
           '<span>' + label + '</span>' +
           '<input type="radio" name="' + ( name || '' ) + '" value="' + ( value || '' ) + '">' +
         '</label>';

});

SWHelpers.define ( 'radioAction', function ( label, name, action, checked ) {

  return '<label class="button radio outlined">' +
           '<span>' + label + '</span>' +
           '<input type="radio" name="' + ( name || '' ) + '" ' + ( checked === true ? 'checked' : '' ) + ' onclick="' + action + '">' +
         '</label>';

});

SWHelpers.define ( 'rater', function ( rating, maximum ) {

  let rater = '<div class="rater">';

  for ( let i = 1; i <= maximum; i++ ) {

    rater += '<div class="rater-star ' + ( rating >= i ? 'active' : ( rating >= i - 0.5 ? 'half-active' : '' ) ) + '"></div>';

  }

  rater += '</div>';

  return rater;

});

SWHelpers.define ( 'slider', function ( options ) {

  options = options.hash;

  return '<div data-step="' + options.step + '" class="slider">' +
           '<input type="number" name="' + options.name + '" value="' + options.value + '">' +
           '<div title="Decrease" data-min="' + options.min + '" class="slider-min"></div>' +
           '<div class="slider-bar">' +
             '<div class="slider-unhighlight">' +
               '<div class="slider-highlight"></div>' +
             '</div>' +
             '<div class="slider-handler-wrp">' +
               '<div class="slider-handler">' +
                 '<div class="slider-label"></div>' +
               '</div>' +
             '</div>' +
           '</div>' +
           '<div title="Increase" data-max="' + options.max + '" class="slider-max"></div>' +
         '</div>';

});

SWHelpers.define ( 'spinner', function ( classes ) {

  return '<svg class="spinner ' + ( classes || '' ) + '">' +
           '<circle cx="1.625em" cy="1.625em" r="1.25em"></circle>' +
         '</svg>';

});

SWHelpers.define ( 'spinnerLabel', function ( classes ) {

  return '<div class="spinner-label ' + ( classes || '' ) + '">' + SWHelpers.spinner () + '</div>';

});

SWHelpers.define ( 'stepper', function ( options ) {

  options = options.hash;

  return '<div class="stepper" data-min="' + options.min + '" data-max="' + options.max + '" data-step="' + options.step + '">' +
           '<div class="button compact stepper-decreaser">' +
             '<i class="icon">remove</i>' +
           '</div>' +
           '<input value="' + options.value + '" name="' + options.name + '" class="autogrow compact">' +
           '<div class="button compact stepper-increaser">' +
             '<i class="icon">add</i>' +
           '</div>' +
         '</div>';

});

SWHelpers.define ( 'switch', function ( options ) {

  options = options.hash;

  return '<div data-color-on="' + options['color-on'] + '" data-color-off="' + options['color-off'] + '" class="switch">' +
           '<input type="checkbox" name="' + options['name'] + '" value="' + options['value'] + '">' +
           '<div class="switch-bar"></div>' +
           '<div class="switch-handler" ' + ( 'icon-on' in options ? 'data-icon-on="' + options['icon-on'] + '"' : '' ) + ' ' + ( 'icon-off' in options ? 'data-icon-off="' + options['icon-off'] + '"' : '' ) + '></div>' +
         '</div>';

});

/* TOOLS */

SWHelpers.define ( 'notification', function ( options ) {

  $.notification ( ( options instanceof Spacebars.kw ) ? options.hash : ( options || '' ) );

});

SWHelpers.define ( 'noty', function ( options ) {

  $.noty ( ( options instanceof Spacebars.kw ) ? options.hash : ( options || '' ) );

});

SWHelpers.define ( 'timeAgo', function ( timestamp ) {

  return lodash.timeAgo ( timestamp ).str;

});

/* UTILITIES */

SWHelpers.define ( 'times', function ( times, start ) {

  start = _.isNumber ( start ) ? start : 1;

  return lodash.range ( start, times + start );

});

SWHelpers.define ( 'nowSecs', function ( offset ) {

  return lodash.nowSecs () + ( offset || 0 );

});
