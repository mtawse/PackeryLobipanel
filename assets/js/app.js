/**
 * @author Martin Tawse martintawse@gmail.com
 * Date: 01/05/17
 */

$(function () {

    $('.panel').lobiPanel({
        sortable: false
    });

    var $grid = $('.grid').packery({
        // use a separate class for itemSelector, other than .col-
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

//    $grid.find('.grid-item').each( function( i, gridItem ) {
//        var draggie = new Draggabilly( gridItem );
//        // bind drag events to Packery
//        $grid.packery( 'bindDraggabillyEvents', draggie );
//    });

    // make all items draggable
    var $items = $grid.find('.grid-item').draggable({
        stop: function( event, ui ) {
            console.log('event: ', event);
            console.log('ui: ', ui);
        }

    });
    // bind drag events to Packery
    $grid.packery('bindUIDraggableEvents', $items);


});