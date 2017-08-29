function getCellularChartData() {
    var normalCalls = [],
        unknownIssues = [],
        deviceIssues = [],
        signalStrength = [],
        noService = [],
        airplaneMode = [],
        dndModeScheduled = []
    ;

	// Cellular Issues Data
    normalCalls.push({x:10, y:10},{x:20, y:15},{x:30, y:12},{x:40, y:7},{x:50, y:8},{x:60, y:8},{x:70, y:10},{x:80, y:15},{x:90, y:12},{x:100, y:7},{x:110, y:8},{x:120, y:8});
    unknownIssues.push({x:10, y:1},{x:20, y:1},{x:30, y:1},{x:40, y:1},{x:50, y:1},{x:60, y:8},{x:70, y:10},{x:80, y:15},{x:90, y:12},{x:100, y:7},{x:110, y:8},{x:120, y:8});
    deviceIssues.push({x:10, y:1},{x:20, y:1},{x:30, y:1},{x:40, y:1},{x:50, y:1},{x:60, y:8},{x:70, y:10},{x:80, y:15},{x:90, y:12},{x:100, y:7},{x:110, y:8},{x:120, y:8});

	// Signal Strength Data
    signalStrength.push({x:10, y:1},{x:20, y:1},{x:30, y:3},{x:40, y:2},{x:50, y:5},{x:60, y:3},{x:70, y:1},{x:80, y:2},{x:90, y:3},{x:100, y:0},{x:110, y:1},{x:120, y:5});

	// Cellular Modes Data
    noService.push(         {x:10, y:5},{x:15, y:0},{x:20, y:0},{x:30, y:0},{x:40, y:0},{x:50, y:0},{x:60, y:0},{x:70, y:0},{x:80, y:5},{x:90, y:0},{x:100, y:5},{x:110, y:0},{x:120, y:5});
    airplaneMode.push(      {x:10, y:5},{x:20, y:5},{x:30, y:0},{x:40, y:0},{x:50, y:0},{x:60, y:5},{x:70, y:0},{x:80, y:0},{x:90, y:5},{x:100, y:0},{x:110, y:0},{x:120, y:0});
    dndModeScheduled.push(  {x:10, y:0},{x:20, y:0},{x:30, y:5},{x:40, y:5},{x:50, y:5},{x:60, y:0},{x:70, y:5},{x:80, y:0},{x:90, y:0},{x:100, y:0},{x:110, y:5},{x:120, y:0});

    return [
        {
            type:"issueBar",
            yAxis:1,
            color: ["#03ffb3"],
            values: normalCalls,
            key: "Normal Calls",
            legend:false
        },
        {
            type:"issueBar",
            yAxis:1,
            color: ["#e7c61b"],
            values: unknownIssues,
            key: "Unknown Issues",
            legend:false
        },
        {
            type:"issueBar",
            yAxis:1,
            color: ["#e71ba4"],
            values: deviceIssues,
            key: "Device Issues",
            legend:false
        },
        {
            type:"modeBar",
            yAxis:2,
            color: ["#b0b0b0"],
            values: noService,
            key: "No Service",
            legend:true
        },
        {
            type:"line",
            yAxis:2,
            color: ["#0075ff"],
            values: signalStrength,
            key: "Signal Strength",
            strokeWidth:4,
            legend:true
        }
    ];
};
