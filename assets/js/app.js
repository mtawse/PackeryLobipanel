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


    $('.col-switch').click(function() {
        var $panelGrid = $(this).closest('.grid-item');
        var colWidth = $(this).data('col-width');
        var classes = ['col-md-4', 'col-md-8', 'col-md-12'];
        var gridClass = classes[colWidth - 1];
//        alert(gridClass);
        $panelGrid.removeClass (function (index, className) {
            return (className.match (/(^|\s)col-\S+/g) || []).join(' ');
        }).addClass(gridClass);
        $grid.packery();
        initTestChart();
    });

    initTestChart();


    function initTestChart() {
        var data = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        "label" : "A" ,
                        "value" : -29.765957771107
                    } ,
                    {
                        "label" : "B" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "C" ,
                        "value" : 32.807804682612
                    } ,
                    {
                        "label" : "D" ,
                        "value" : 196.45946739256
                    } ,
                    {
                        "label" : "E" ,
                        "value" : 0.19434030906893
                    } ,
                    {
                        "label" : "F" ,
                        "value" : -98.079782601442
                    } ,
                    {
                        "label" : "G" ,
                        "value" : -13.925743130903
                    } ,
                    {
                        "label" : "H" ,
                        "value" : -5.1387322875705
                    }
                ]
            }
        ]

        nv.addGraph(function() {
            var chart = nv.models.multiBarHorizontalChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .margin({top: 30, right: 20, bottom: 50, left: 175})
                .showValues(true)
                //.tooltips(false)
                .showControls(false);

            chart.yAxis
                .tickFormat(d3.format(',.2f'));

            d3.select('#chart svg')
                .datum(data)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });
    }
});