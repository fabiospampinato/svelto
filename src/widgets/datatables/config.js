
/* =========================================================================
 * Svelto - Widgets - Datatables (Config)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato - All rights reserved.
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ./vendor/datatables.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

/* DATATABLES */

(function ( $, _, Svelto, DataTable ) {

  'use strict';

  /* CHECK IF LOADED */

  if ( !DataTable ) return;

  /* DEFAULTS */

  _.extend ( DataTable.defaults, {
    dom: '<"card-header bordered"' +
           '<"multiple center" l <"spacer hidden-xs-down"> f>' +
         '>' +
         '<"card-block bordered table-wrapper" t>' +
         '<"card-footer bordered"' +
           '<"multiple center" i <"spacer hidden-xs-down"> p>' +
         '>',
    autoWidth: false,
    lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, 'All'] ],
    pageLength: 10,
    pagingType: 'simple_numbers_no_ellipses',
    renderer: 'svelto',
    drawCallback: function () {
      $(this).widgetize ();
    },
    initComplete: function () {
      $(this).closest ( '.datatable-wrapper' ).widgetize ();
    }
  });

  _.extend ( DataTable.defaults.oLanguage, {
    sInfo: 'Entries _START_-_END_ of _TOTAL_',
    sInfoEmpty: 'No entries to show',
    sInfoFiltered: ' (_MAX_ total)',
    sLengthMenu: '_MENU_<label>Show <strong><span class="select-value">10</span></strong> entries</label>',
    sSearch: '<div class="multiple joined no-separators">_INPUT_<div class="label compact bordered"><i class="icon">search</i></div></div>',
    sSearchPlaceholder: 'Search...'
  });

  _.extend ( DataTable.defaults.oLanguage.oPaginate, {
    sFirst: '<i class="icon">first_page</i>',
    sPrevious: '<i class="icon">chevron_left</i>',
    sNext: '<i class="icon">chevron_right</i>',
    sLast: '<i class="icon">last_page</i>'
  });

  _.extend ( DataTable.ext.classes, {
    sFilter: 'datatable-filter',
    sFilterInput: 'bordered',
    sInfo: 'datatable-info',
    sLength: 'datatable-length button bordered select',
    sLengthSelect: '',
    sPageButton: 'button bordered compact',
    sPageButtonActive: 'active highlighted',
    sPageButtonDisabled: 'disabled',
    sPaging: 'datatable-pagination pagination multiple joined ', // Not a type, `pagingType` will get attached after this
    sProcessing: 'datatable-processing',
    sRowEmpty: 'datatable-row-empty',
    sScrollBody: 'datatable-scroll-body',
    sScrollFoot: 'datatable-scroll-foot',
    sScrollFootInner: 'datatable-scroll-foot-inner',
    sScrollHead: 'datatable-scroll-head',
    sScrollHeadInner: 'datatable-scroll-head-inner',
    sScrollWrapper: 'datatable-scroll',
    sSortAsc: 'sortable sort-asc',
    sSortColumn: 'sort-',
    sSortDesc: 'sortable sort-desc',
    sSortable: 'sortable',
    sSortableAsc: 'sort-asc-disabled',
    sSortableDesc: 'sort-desc-disabled',
    sSortableNone: 'sort-disabled',
    sStripeEven: 'even',
    sStripeOdd: 'odd',
    sTable: 'datatable',
    sWrapper: 'datatable-wrapper card bordered limited centered'
  });

  /* PAGER */

  DataTable.ext.pager.numbers_length = 5;
  DataTable.ext.pager.simple_numbers_no_ellipses = function ( page, pages ) {

    let blocks = DataTable.ext.pager.numbers_length,
        halfBlocks = Math.floor ( blocks / 2 ),
        numbers;

    if ( pages <= blocks ) {

      numbers = _.range ( 0, pages );

    } else if ( page <= halfBlocks ) {

      numbers = _.range ( 0, blocks );

    } else if ( page >= pages - 1 - halfBlocks ) {

      numbers = _.range ( pages - blocks, pages );

    } else {

      numbers = _.range ( page - halfBlocks, page + halfBlocks + 1 );

    }

    numbers.DT_el = false;

    return ['previous', numbers, 'next'];

  };

  /* RENDERER */

  DataTable.ext.renderer.pageButton.svelto = function ( settings, previous, idx, buttons, page, pages ) {

    /* VARIABLES */

  	let api = new DataTable.Api ( settings ),
        classes = settings.oClasses,
  	    lang = settings.oLanguage.oPaginate,
  	    aria = settings.oLanguage.oAria.paginate || {},
        counter = 0;

    /* ATTACH */

  	let attach = function ( container, buttons ) {

      /* CLICK HANDLER */

  		let clickHandler = function ( event ) {

  			event.preventDefault ();

  			if ( $(event.currentTarget).hasClass ( classes.sPageButtonDisabled ) || api.page () === event.data.action ) return;

  			api.page ( event.data.action ).draw ( 'page' );

  		};

      /* CONTENT */

  		for ( let i = 0, l = buttons.length; i < l; i++ ) {

  			let button = buttons[i];

  			if ( $.isArray ( button ) ) {

          attach ( container, button );

          continue;

        }

				let btnText = '',
            btnClasses = button;

				switch ( button ) {

					case 'ellipsis':
						btnText = '<i class="icon">more_horiz</i>';
            break;

					case 'first':
            if ( page === 0 ) continue;
						btnText = lang.sFirst;
						break;

					case 'previous':
            if ( page === 0 ) continue;
						btnText = lang.sPrevious;
						break;

					case 'next':
            if ( pages === 0 || page === pages - 1 ) continue;
						btnText = lang.sNext;
						break;

					case 'last':
            if ( pages === 0 || page === pages - 1 ) continue;
						btnText = lang.sLast;
						break;

					default:
						btnText = button + 1;
						btnClasses += page === button ? ' ' + classes.sPageButtonActive : '';
						break;

				}

				let node = $('<div>', {
          'aria-controls': settings.sTableId,
          'aria-label': aria[button],
          'data-dt-idx': counter,
          'tabindex': settings.iTabIndex,
					'class': classes.sPageButton + ' ' + btnClasses,
					'id': idx === 0 && typeof button === 'string' ? settings.sTableId + '_' + button : null
				}).html ( btnText )
          .appendTo ( container );

        if ( button !== 'ellipsis' ) {

          settings.oApi._fnBindAction ( node, { action: button }, clickHandler );

        }

				counter++;

  		}

  	};

    /* FOCUS */

  	let activeIDX = $(previous).find ( document.activeElement ).data ( 'dt-idx' );

  	attach ( $(previous).empty (), buttons );

  	if ( activeIDX ) {

  		$(previous).find ( '[data-dt-idx=' + activeIDX + ']' ).focus ();

  	}

  };

  /* EXPORT */

  Svelto.DataTable = DataTable;

}( Svelto.$, Svelto._, Svelto, Svelto.$.fn.dataTable ));
