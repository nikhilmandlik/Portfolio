cellularChart = function() {
    // "use strict";

    // *************************************************************************************************
    // Public Variables with Default Settings

    var margin = {top: 30, right: 20, bottom: 50, left: 60},
        color = nv.utils.defaultColor(),
        forceY = [0],
        width = null,
        height = null,
        showLegend = true,
        strokeWidth = 4,
        noData = null,
        yDomain1,
        yDomain2,
        yRange,
        getX = function(d) { return d.x },
        getY = function(d) { return d.y},
        interpolate = 'monotone',
        useVoronoi = true
        ;

    // *************************************************************************************************
    // Private Variables

    var xScale = d3.scale.ordinal(),
        yScale1 = d3.scale.linear(),
        yScale2 = d3.scale.linear(),

        lines1 = nv.models.line().yScale(yScale2),
        bars1 = nv.models.multiBar().stacked(true).yScale(yScale1),
        bars2 = nv.models.multiBar().stacked(true).yScale(yScale2),

        xAxis = nv.models.axis(),
        yAxis1 = nv.models.axis().scale(yScale1).orient('left').tickPadding(15),
        yAxis2 = nv.models.axis().scale(yScale2).orient('right').tickPadding(15),

        legend = nv.models.legend().height(30),
        tooltip = nv.models.tooltip(),
        dispatch = d3.dispatch();

    function chart(selection) {
        selection.each(function(data) {
            var container = d3.select(this),
                that = this;
            nv.utils.initSVG(container);

            chart.update = function() { container.transition().call(chart); };
            chart.container = this;

            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            var dataBars1 =  data.filter(function(d) {return d.type == 'issueBar'  && d.yAxis == 1});
            var dataBars2 =  data.filter(function(d) {return d.type == 'modeBar'  && d.yAxis == 2});
            var dataLines1 = data.filter(function(d) {return d.type == 'line' && d.yAxis == 2});

            // Display noData message if there's nothing to show.
            if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
                nv.utils.noData(chart, container);
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            var series1 = data.filter(function(d) {
                    return !d.disabled && d.yAxis == 1
                }).map(function(d, i) {
                    return d.values.map(function(d,i) {
                            return { x: d.x, y: d.y }
                    })
            });

            var series2 = data.filter(function(d) {
                    return !d.disabled && d.yAxis == 2
                }).map(function(d, i) {
                    return d.values.map(function(d,i) {
                            return { x: d.x, y: d.y }
                    })
            });

            var xDomain = d3.extent(d3.merge(series1.concat(series2)), function(d, i) {
                    if (d.length == null)  {
                        return d.x;
                    } else {
                        return d.forEach(function(d,i) {
                            return d.x
                        })
                    }
                });

            var range = dataLines1[0].values.length;
            var xRange = d3.range(range).map(function(d, i){
                return dataLines1[0].values[i].x;
            });
            var xScaleBars = d3.scale.ordinal()
                            .domain(xRange)
                            .rangeRoundBands([0, availableWidth], 0);
            var xScaleLine = function(d) {
                var offset = xScaleBars.rangeBand() / 2;
                return xScaleBars(d) + offset;
            };

            xAxis.scale(xScaleBars).orient('bottom').tickPadding(10);
            xScale.domain(xDomain)
                .range([1, availableWidth]);

            var wrap = container.selectAll('g.wrap.cellularChart').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 cellularChart').append('g');

            gEnter.append('g').attr('class', 'nv-x nv-axis');
            gEnter.append('g').attr('class', 'nv-y1 nv-axis');
            gEnter.append('g').attr('class', 'bars2Wrap');
            gEnter.append('g').attr('class', 'bars1Wrap');
            gEnter.append('g').attr('class', 'lines1Wrap');
            gEnter.append('g').attr('class', 'nv-y2 nv-axis');
            gEnter.append('g').attr('class', 'legendWrap');

            var g = wrap.select('g');

            var color_array = [];
            data.forEach(function(d,i) {
                var type = d.type;
                d.color.forEach (function(d,i,a) {
                    var obj = {};
                    obj[type] = d;
                    color_array.push(obj);
                })
            });

            if (showLegend) {
                var legendWidth = legend.align() ? availableWidth  : availableWidth;
                var legendXPosition = legend.align() ? 0 : 0;

                legend.width(legendWidth);

                var legend_color_array = [];
                var legendData = [];
                data.forEach(function(d,i) {
                    if (d.legend) {
                        d.color.forEach (function(d,i) {
                            legend_color_array.push(d);
                        });
                        legendData.push(d);
                    }
                });
                legend.color(legend_color_array);

                g.select('.legendWrap')
                    .datum(legendData.map(function(series) {
                        if (!series.legend) {
                            return false;
                            series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
                            series.key = series.originalKey + (series.yAxis == 1 ? '' : ' (right axis)');
                        }
                        return series;
                    }))
                    .call(legend);

                if ( margin.top != legend.height()) {
                    margin.top = legend.height();
                    availableHeight = nv.utils.availableHeight(height, container, margin);
                }

                g.select('.legendWrap')
                    .attr('transform', 'translate(' + legendXPosition + ',' + (-margin.top) +')');
            }

            var stackBarColors = color_array.filter(function(d,i) {
                return d.line
            });

            lines1
                .width(availableWidth)
                .height(availableHeight)
                .interpolate(interpolate)
                .color(color_array.filter(function(d,i) {
                    return d.line
                }));
            bars1
                .groupSpacing(0.5)
                .width(availableWidth)
                .height(availableHeight)
                .color(color_array.filter(function(d,i) {
                    return d.issueBar
                }));
            bars2
                .groupSpacing(0)
                .width(availableWidth)
                .height(availableHeight)
                .color(color_array.filter(function(d,i) {
                    return d.modeBar
                }));

            g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var lines1Wrap = g.select('.lines1Wrap')
                .datum(dataLines1.filter(function(d){return !d.disabled}))
                .style('stroke-width', function(d) {
                    return d.strokeWidth || strokeWidth;
                    // return d[0].strokeWidth;
                });
            var bars1Wrap = g.select('.bars1Wrap')
                .datum(dataBars1.filter(function(d){return !d.disabled}));
            var bars2Wrap = g.select('.bars2Wrap')
                .datum(dataBars2.filter(function(d){return !d.disabled}));

            var extraValue1 = [];
            var extraValue2 = [];

            // change yScale value to show addition of stacked bars
            var max = [];
            series1.forEach(function(d, i) {
                    d.forEach(function(d,i) {
                        if (max[i] == null) {
                            max.push(d.y)
                        } else (
                            max[i] = max[i] + d.y
                        )
                    })
            });

            max.sort(function compareNumbers(a, b) {
                return b - a;
            });

            // make scale to ceiling
            var maxYScale = 10-max[0]%10 + max[0];
            yScale1.domain([0,maxYScale])
                .range([0, availableHeight]);

            yScale2.domain(yDomain2 || d3.extent(d3.merge(series2).concat(extraValue2), function(d) { return d.y } ))
                .range([0, availableHeight]);

            lines1.yDomain(yScale2.domain());
            bars1.yDomain(yScale1.domain());
            bars2.yDomain(yScale2.domain());

            if(dataBars1.length){d3.transition(bars1Wrap).call(bars1);}
            if(dataBars2.length){d3.transition(bars2Wrap).call(bars2);}
            if(dataLines1.length){d3.transition(lines1Wrap).call(lines1);}

            g.select('.nv-x.nv-axis')
                .attr('transform', 'translate(0,' + availableHeight + ')');
            d3.transition(g.select('.nv-x.nv-axis'))
                .call(xAxis);

            yAxis1
                .ticks(4);

            d3.transition(g.select('.nv-y1.nv-axis'))
                .call(yAxis1);

            yAxis2
                .ticks(4)
                .tickSize( -availableWidth, 0)
                .tickFormat(function(d) {
                    if (d==1) {
                        return "●○○○○";
                    } else if (d==2) {
                        return "●●○○○";
                    } else if (d==3) {
                        return "●●●○○";
                    } else if (d==4) {
                        return "●●●●○";
                    } else if (d==5) {
                        return "●●●●●";
                    } else {
                        return "○○○○○";
                    }
                });

            d3.transition(g.select('.nv-y2.nv-axis'))
                .call(yAxis2);

            g.select('.nv-y1.nv-axis')
                .classed('nv-disabled', series1.length ? false : true)
                .attr('transform', 'translate(' + xScale.range()[0] + ',0)');

            g.select('.nv-y2.nv-axis')
                .classed('nv-disabled', series2.length ? false : true)
                .attr('transform', 'translate(' + xScale.range()[1] + ',0)');

            legend.dispatch.on('stateChange', function(newState) {
                chart.update();
            });
        });

        return chart;
    }

    //============================================================
    // Global getters and setters
    //------------------------------------------------------------
    chart.dispatch = dispatch;
    chart.lines1 = lines1;
    chart.bars1 = bars1;
    chart.bars2 = bars2;
    chart.xAxis = xAxis;
    chart.yAxis1 = yAxis1;
    chart.yAxis2 = yAxis2;
    chart.tooltip = tooltip;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        showLegend: {get: function(){return showLegend;}, set: function(_){showLegend=_;}},
        yDomain1:      {get: function(){return yDomain1;}, set: function(_){yDomain1=_;}},
        yDomain2:    {get: function(){return yDomain2;}, set: function(_){yDomain2=_;}},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},
        interpolate:    {get: function(){return interpolate;}, set: function(_){interpolate=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
    });

    nv.utils.initOptions(chart);

    return chart;
};
