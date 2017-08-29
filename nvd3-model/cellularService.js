nv.addGraph(function() {
    var chart = cellularChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70});
        chart.xAxis.tickFormat(d3.format(',d'));
        chart.yAxis1.tickFormat(d3.format(',d'));
        chart.yAxis2.tickFormat(d3.format(',d'));
        chart.yAxis1.showMaxMin(false);
        chart.xAxis.showMaxMin(false);

    var data = getCellularChartData();

    d3.select('#cellularChart').append('svg')
        .datum(data)
        .call(chart);

    nv.utils.windowResize(chart.update);
    return chart;
});

// Navigation
var backButton = document.querySelector('.back-button');
backButton.addEventListener('click', goBack);

function goBack() {
    document.location.href  = "/";
}
