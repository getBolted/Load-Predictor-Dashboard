var chart;

/**
 * Request data from the server, add it to the graph and set a timeout
 * to request again
 */
function requestData() {
    $.ajax({
        url: '/live-data',
        success: function(point) {
            var series = chart.series[0],
                shift = series.data.length > 290; 
            chart.series[0].addPoint(point[0], true, shift);
            chart.series[1].addPoint(point[1], true)
            setTimeout(requestData, 5000);
        },
        cache: false
    });
}

$(document).ready(function() {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'data-container',
            defaultSeriesType: 'spline',
            events: {
                load: requestData
            }
        },
        title: {
            text: 'Текущая нагрузка и 24ч прогноз'
        },
        navigator: {
            enabled: true
        },
        rangeSelector: {
            buttons: [
             {
                type: 'week',
                count: 1,
                text: '1w'
            }, {
                type: 'hour',
                count: 24,
                text: '24h'
            },{
                type: 'hour',
                count: 12,
                text: '12h'
            },{
                type: 'hour',
                count: 1,
                text: '1h'
            },{
                type: 'all',
                text: 'All'
            }],
            enabled: true
        },
        xAxis: {
            title:{
                text:'Дата и время',
                margin: 80
            },
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Потребляемая активная мощность, Вт',
                margin: 80
            }
        },
        series: [{
            name: 'Действительные данные',
            data: []
        }, {
            name: 'Предсказанные значения',
            data: []
        }
        ]
    });
});