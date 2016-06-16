var freshnessThreshold = 10;	// number of seconds before a message is considered stale
var cellVoltageChart;						// global var for live chart

var cellVoltages = [];
var cellVoltageValidity = [];	// array of booleans indicating whether a given cell voltage `cellVoltageValidity[cell-1]` is valid
	cellVoltageValidity.fill(0, 0, 133);
var cellSOC = [];				// array of [1x2] values indicating min. and max. bounds on SOC estimate
	
var NUM_CELLS = 134;			// number of series cells in pack
var CELLVOLTAGE_MEAS_ERROR_BOUND = 3; 	// maximum error in cell voltage measurement in either direction, in mV. For example, a value of 5 here indicates that the cell voltage measurement is accurate to +-10 mV.
var display_soc = false;		// toggle between SOC display and voltage display	
var last_contact 	= 0;		// timestamp of last successful contact with server
var busVoltage 		= 0;		// current bus voltage

$( document ).ready(function() {
	serverHost = '192.168.4.1';
	serverPort = '80';
	
  	// automatically update system status
  	//updateAll();
  	
  	
  	setInterval(function() {
  		// todo: add thing to do
  		updateCellVoltageChart();
  	}, 1000);
  	
} );

// Initialize plots
$(function () { 
	
	generateRandomCellData();
	newData = cellVoltages;
	
	initializeCellVoltageChart();
	initializeCellSOCChart();    
});

function initializeCellVoltageChart(){
	cellVoltageChart = new Highcharts.Chart({
			chart: {
				renderTo: 'cellVoltageChart',
				type: 'bar',
				height: 650
			},
			credits: {
            	enabled: false
      	  	},
			xAxis: {
				visible: 'false'
			},
			legend: {
				enabled: false
			},
			title: {
      	  		text: 'Cell voltages'
      	  	},
			yAxis: {
				min: 2500,
				max: 3800
			},
			tooltip: {
				formatter: function () {
					return '<b>' + this.series.name + '</b><br/>' +
						this.x + ': ' + this.y;
				}
			},
	   
		   plotOptions: {
				series: {
					pointPadding: 0,
					groupPadding: 0,
					borderWidth: 0,
					shadow: false,
					colorByPoint: true
				}
			},
	   
			series: [{
				data: newData
			}]
		});
}
function initializeCellSOCChart(){
	cellSOCChart = new Highcharts.Chart({
			chart: {
				renderTo: 'cellSOCChart',
				type: 'bar',
				height: 650
			},
			credits: {
            	enabled: false
      	  	},
      	  	title: {
      	  		text: 'Estimated SOC'
      	  	},
      	  	legend: {
				enabled: false
			},
			xAxis: {
				visible: 'false'
			},
			yAxis: {
				 min: 0,
				max: 100
			},
			tooltip: {
				formatter: function () {
					return '<b>' + this.series.name + '</b><br/>' +
						this.x + ': ' + this.y;
				}
			},
	   
		   plotOptions: {
				series: {
					pointPadding: 0,
					groupPadding: 0,
					borderWidth: 0,
					shadow: false,
					colorByPoint: true,
					stacking: 'normal'
				}
			},
	   
			series: [{data: newData},
					 {data: [0]}
					 ]
		});
}	
function updateCellVoltageChart(){ 
	updateCellVoltages();
}

// Get cell voltages from server and return array of their values
function updateCellVoltages(){
	
 	var cellData = [];
 	
 	//fake data
	// 		for (var i=0;i<134;i++){
	// 			cellData[i] = Math.random()*1200+2500;
	// 		}
	
	var uri = "http://192.168.4.1/api/system.php?systemName=allBatteries";
	var jqxhr = $.getJSON(uri, 
		function(data) { 
			// Update bus voltage
			var thisMessage = data["BusVoltage"];
			if(thisMessage["Age"] < freshnessThreshold){
				busVoltage = thisMessage["MessageValue"];
			} else {
				busVoltage = -1;
			}
			
			for (var i=0;i<134;i++){
				var signalName = "Cell" + (i+1) + "Voltage";
				var thisCell = data[signalName];
				// TODO: message age checking
				
				if(typeof thisCell != 'undefined'){
					cellData[i] = thisCell["MessageValue"];
					cellVoltages[i] = thisCell["MessageValue"];
					cellSOC[i] = [ estimate_soc(cellData[i] - CELLVOLTAGE_MEAS_ERROR_BOUND),
						estimate_soc(cellData[i] + CELLVOLTAGE_MEAS_ERROR_BOUND) ];
					
					// Check for cell voltage validity
					//if( Math.floor(Date.now() / 1000) - thisCell["MessageTime"] > freshnessThreshold ){			// Hard to use this due to clock drift between BeagleBone clock and system clock
					if( thisCell["Age"] < freshnessThreshold ){
						cellVoltageValidity[i] = 1;
					} else	{
						cellVoltageValidity[i] = 0;
					}
					
				}else{
					cellData[i] = -1;
					cellVoltages[i] = -1;
					cellVoltageValidity[i] = 0;
				}
 			}
 			
 			updateCellVoltageDisplay();
 			updateCellSOCDisplay();
 			updateBusVoltageDisplay();
 			updateMinMaxCellDisplay();
 			$("#errorOverlay").hide();			// Hide error overlay if it was present
		})
		.error( 	
			function(jqxhr, textStatus, error) {
				var err = textStatus + ", " + error;
				console.log("failure: " + err);
				
				if (Math.floor(Date.now() / 1000) - last_contact > freshnessThreshold ){
					// We are more than freshnessThreshold seconds out of contact, display error overlay
					$("#errorOverlay").fadeIn();
				}
			 }
		);
	return cellData;
}

function updateCellVoltageDisplay(){
	var colorString;
	var newData = [];

	// Build data array for Highcharts
	for (var i=0;i<NUM_CELLS;i++){
	
		// Color the bar if the data is not valid
		if( cellVoltageValidity[i] > 0 ){
			colorString 	= '#00FF00';		// green
		} else {
			colorString  	= '#AAAAAA';		// gray
		}
	

		newData[i] = {
			x: 		i+1,
			y:		cellVoltages[i],
			name:	'Cell ' + i+1,
			color:	 colorString		};
	}
	cellVoltageChart.series[0].setData(newData);
	cellVoltageChart.yAxis[0].setExtremes(2500,3800);
	
	// Highcharts does not update the bar color until you scroll over the bar. Toggle the series visibility and redraw to force color change.
	cellVoltageChart.series[0].update({colorByPoint: true});

}

function updateCellSOCDisplay(){
	var colorString;
	var newSOCData = [];
	var newUncertaintyData = [];

	// Build data array for Highcharts
	for (var i=0;i<NUM_CELLS;i++){
	
		// Color the bar if the data is not valid
		if( cellVoltageValidity[i] > 0 ){
			baseColorString 	= '#00FF00';		// green
			uncertaintyColorString = '#005500';		// light green
		} else {
			basecolorString  	= '#AAAAAA';		// gray
			uncertaintyColorString = '#AAAAAA';		// gray
		}

		newSOCData[i] = {
				x: 		i+1,
				y:		cellSOC[i][0],		// minimum bound on soc estimate
				name:	'Cell ' + i+1,
				color:	 baseColorString		};
		newUncertaintyData[i] = {
				x: 		i+1,
				y: 		cellSOC[i][1] - cellSOC[i][0],
				name: 	'Cell ' + (i+1) + ' uncertainty',
				color: 	uncertaintyColorString	};
	}
	cellSOCChart.series[1].setData(newSOCData);
	cellSOCChart.series[0].setData(newUncertaintyData);
	cellSOCChart.yAxis[0].setExtremes(0,1);
	
	// Highcharts does not update the bar color until you scroll over the bar. Toggle the series visibility and redraw to force color change.
	cellSOCChart.series[0].update({colorByPoint: true});
	cellSOCChart.series[1].update({colorByPoint: true});

}

function updateBusVoltageDisplay(){
	$('#bus-voltage').text( busVoltage.toFixed(2) + " V" );
}

function updateMinMaxCellDisplay(){
	var minCellVoltage, maxCellVoltage, minCellNumber, maxCellNumber;
	
	minCellVoltage = Math.min.apply(null, cellVoltages);
	maxCellVoltage = Math.max.apply(null, cellVoltages);
	
	// todo: indicate cell number
	
	$('#min-cell-voltage').text( (minCellVoltage/1000).toFixed(3) + " V" );
	$('#max-cell-voltage').text( (maxCellVoltage/1000).toFixed(3) + " V" );
}


function generateRandomCellData(){
	for (var i=0;i<134;i++){
		cellVoltages[i] = Math.random()*1200+2500;
		cellSOC[i] = [ estimate_soc(Math.round(cellVoltages[i]) - CELLVOLTAGE_MEAS_ERROR_BOUND),
						estimate_soc(Math.round(cellVoltages[i]) + CELLVOLTAGE_MEAS_ERROR_BOUND) ];
		cellVoltageValidity[i] = 0;
	}
}
