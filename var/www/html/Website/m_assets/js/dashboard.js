var freshnessThreshold = 10;	// number of seconds before a message is considered stale
var cellVoltageChart;						// global var for live chart

var cellVoltages = [];
var cellVoltageValidity = [];	// array of booleans indicating whether a given cell voltage `cellVoltageValidity[cell-1]` is valid
	cellVoltageValidity.fill(0, 0, 133);
var cellSOC = [];				// array of [1x2] values indicating min. and max. bounds on SOC estimate
	
var NUM_CELLS = 134;			// number of series cells in pack
var CELLVOLTAGE_MEAS_ERROR_BOUND = 5; 	// maximum error in cell voltage measurement in either direction, in mV. For example, a value of 5 here indicates that the cell voltage measurement is accurate to +-10 mV.
var display_soc = false;		// toggle between SOC display and voltage display	

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

// Initialize cell voltage plot
$(function () { 
	
	generateRandomCellData();
	newData = cellVoltages;
	
    cellVoltageChart = new Highcharts.Chart({
		chart: {
			renderTo: 'cellVoltageChart',
        	height: 900,
            width: 380,
            type: 'bar'
        },
        xAxis: {
            visible: 'false'
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
});

function updateAll( ){
	// send GET request to update all status vars
	uri = 'http://' + serverHost + ':' + serverPort + '/reload_bms.php';
	
	var minCellVoltage, maxCellVoltage = 0;
	
	var jqxhr = $.getJSON(uri, 
		function(data) { 
			var minVoltages = [ data["BIM1MinCellVoltage"],
								data["BIM2MinCellVoltage"],
								data["BIM3MaxCellVoltage"],
								data["BIM4MinCellVoltage"],
								data["BIM5MinCellVoltage"] 	];					
			var maxVoltages = [ data["BIM1MaxCellVoltage"],
								data["BIM2MaxCellVoltage"],
								data["BIM3MaxCellVoltage"],
								data["BIM4MaxCellVoltage"],
								data["BIM5MaxCellVoltage"] 	];
												
			var minCellVoltage 	= Math.min.apply(null, minVoltages );		
			var maxCellVoltage 	= Math.max.apply(null, maxVoltages );				
			var minPack 		= minVoltages.indexOf( Math.min.apply(Math, minVoltages) ) + 1;
			var maxPack 		= maxVoltages.indexOf( Math.max.apply(Math, maxVoltages) ) + 1;
				
			$(".system-variable-value#pack_highcell").text( maxCellVoltage/1000 );
			$(".system-variable-value#pack_lowcell").text( minCellVoltage/1000 );
			$(".system-variable-value#pack_lowcell_packnum").text( minPack );
			$(".system-variable-value#pack_highcell_packnum").text( maxPack);
			
		}
		)
		.error( 	
			function(jqxhr, textStatus, error) {
				var err = textStatus + ", " + error;
				console.log("failure: " + err);
			 }
		);
	}
	
function updateBMS( ){
	// send GET request to update BMS status vars
	uri = 'http://' + serverHost + ':' + serverPort + '/api/system.php?systemName=batteries';
	
	var minCellVoltage, maxCellVoltage = 0;
	
	var jqxhr = $.getJSON(uri, 
		function(data) { 
			var minVoltages = [ data["BIM1MinCellVoltage"]["MessageValue"],
								data["BIM2MinCellVoltage"]["MessageValue"],
								data["BIM3MaxCellVoltage"]["MessageValue"],
								data["BIM4MinCellVoltage"]["MessageValue"],
								data["BIM5MinCellVoltage"]["MessageValue"] 	];					
			var maxVoltages = [ data["BIM1MaxCellVoltage"]["MessageValue"],
								data["BIM2MaxCellVoltage"]["MessageValue"],
								data["BIM3MaxCellVoltage"]["MessageValue"],
								data["BIM4MaxCellVoltage"]["MessageValue"],
								data["BIM5MaxCellVoltage"]["MessageValue"] 	];
												
			var minCellVoltage 	= Math.min.apply(null, minVoltages );		
			var maxCellVoltage 	= Math.max.apply(null, maxVoltages );				
			var minPack 		= minVoltages.indexOf( Math.min.apply(Math, minVoltages) ) + 1;
			var maxPack 		= maxVoltages.indexOf( Math.max.apply(Math, maxVoltages) ) + 1;
			
			// TODO: check for message staleness
			// TODO: check for BIM communication errors
			
			// boolean: are the maximum cell voltages valid?
			var maxCellVoltageValid	= ( 	data["BIM1MaxCellVoltage"]["MessageTime"] != -1 			
										&&	data["BIM1MaxCellVoltage"]["Age"] <= freshnessThreshold		
										&&	data["BIM2MaxCellVoltage"]["MessageTime"] != -1 			
										&&	data["BIM2MaxCellVoltage"]["Age"] <= freshnessThreshold		
										&&	data["BIM3MaxCellVoltage"]["MessageTime"] != -1 			
										&&	data["BIM3MaxCellVoltage"]["Age"] <= freshnessThreshold		
										&&	data["BIM4MaxCellVoltage"]["MessageTime"] != -1 			
										&&	data["BIM4MaxCellVoltage"]["Age"] <= freshnessThreshold		
										&&	data["BIM5MaxCellVoltage"]["MessageTime"] != -1 			
										&&	data["BIM5MaxCellVoltage"]["Age"] <= freshnessThreshold			);
										
			if( maxCellVoltageValid ){
				$(".system-variable-value#pack_highcell").text( (maxCellVoltage/1000).toFixed(3) );
				$(".system-variable-value#pack_highcell_packnum").text(maxPack);
				$(".system-variable-value#pack_highcell").css('text-decoration', 'none');
				$(".system-variable-value#pack_highcell_packnum").css('text-decoration', 'none');
			} else {
				$(".system-variable-value#pack_highcell").css('text-decoration', 'line-through');
				$(".system-variable-value#pack_highcell_packnum").css('text-decoration', 'line-through');
			}
				
			$(".system-variable-value#pack_lowcell").text( (minCellVoltage/1000).toFixed(3) );
			$(".system-variable-value#pack_lowcell_packnum").text( minPack );
			
			
			// Update pack average voltage indicators
			function checkStalenessAndUpdate( message, container ){
				if( data[message]["MessageTime"] != -1 && data[message]["Age"] < freshnessThreshold ){
					$(container).css('background-color', 'green');
					$(container).text( (data[message]["MessageValue"]/1000).toFixed(3) + " V");
				} else {
					$(container).css('background-color', 'gray');
				}
			}
			
			checkStalenessAndUpdate( "BIM1AvgCellVoltage", "#battery-shelf-1" );
			checkStalenessAndUpdate( "BIM2AvgCellVoltage", "#battery-shelf-2" );
			checkStalenessAndUpdate( "BIM3AvgCellVoltage", "#battery-shelf-3" );
			checkStalenessAndUpdate( "BIM4AvgCellVoltage", "#battery-shelf-4" );
			checkStalenessAndUpdate( "BIM5AvgCellVoltage", "#battery-shelf-5" );
			
			// Find maximum temperature and display it
			var temperatures = [ 	data["CellTemp1"]["MessageValue"],
									data["CellTemp2"]["MessageValue"],
									data["CellTemp3"]["MessageValue"],
									data["CellTemp4"]["MessageValue"],
									data["CellTemp5"]["MessageValue"],
									data["CellTemp6"]["MessageValue"],
									data["CellTemp7"]["MessageValue"],
									data["CellTemp8"]["MessageValue"],
									data["CellTemp9"]["MessageValue"],
									data["CellTemp10"]["MessageValue"],
									data["CellTemp11"]["MessageValue"],
									data["CellTemp12"]["MessageValue"],
									data["CellTemp13"]["MessageValue"],
									data["CellTemp14"]["MessageValue"],
									data["CellTemp15"]["MessageValue"],
									data["CellTemp16"]["MessageValue"],
									data["CellTemp17"]["MessageValue"],
									data["CellTemp18"]["MessageValue"],
									data["CellTemp19"]["MessageValue"],
									data["CellTemp20"]["MessageValue"],
									data["CellTemp21"]["MessageValue"],
									data["CellTemp22"]["MessageValue"],
									data["CellTemp23"]["MessageValue"],
									data["CellTemp24"]["MessageValue"],
									data["CellTemp25"]["MessageValue"],
									data["CellTemp26"]["MessageValue"],
									data["CellTemp27"]["MessageValue"],
									data["CellTemp28"]["MessageValue"],
									data["CellTemp29"]["MessageValue"],
									data["CellTemp30"]["MessageValue"],
									data["CellTemp31"]["MessageValue"],
									data["CellTemp32"]["MessageValue"],
									data["CellTemp33"]["MessageValue"],
									data["CellTemp34"]["MessageValue"],
									data["CellTemp35"]["MessageValue"],
									data["CellTemp36"]["MessageValue"]		];
			var maxTemperature = Math.max.apply(null, temperatures);
			$(".system-variable-value#PackTemp").text( maxTemperature.toFixed(1) );
		} )
		.error( 	
			function(jqxhr, textStatus, error) {
				var err = textStatus + ", " + error;
				console.log("failure: " + err);
			 }
		);
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
			for (var i=0;i<134;i++){
				var signalName = "Cell" + i+1 + "Voltage";
				var thisCell = data[signalName];
				// TODO: message age checking
				
				if(typeof thisCell != 'undefined'){
					cellData[i] = thisCell["MessageValue"];
					cellSOC[i] = [ estimate_soc(cellData[i] - CELLVOLTAGE_MEAS_ERROR_BOUND),
						estimate_soc(cellData[i] + CELLVOLTAGE_MEAS_ERROR_BOUND) ];
					
					// Check for cell voltage validity
					if( Math.floor(Date.now() / 1000) - thisCell["MessageTime"] > freshnessThreshold ){
						cellVoltageValidity[i] = 1;
					} else	{
						cellVoltageValidity[i] = 0;
					}
					
				}else{
					cellData[i] = -1;
					cellVoltageValidity[i] = 0;
				}
 			}
 			
 			updateCellVoltageDisplay();
		})
		.error( 	
			function(jqxhr, textStatus, error) {
				var err = textStatus + ", " + error;
				console.log("failure: " + err);
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
	
		// Display cell SOC or voltage as appropriate
		if( display_soc ){
			newData[i] = {
				x: 		i+1,
				y:		cellSOC[i][1],		// minimum bound on soc estimate
				name:	'Cell ' + i+1,
				color:	 colorString
			};
		} else {
			newData[i] = {
				x: 		i+1,
				y:		cellVoltages[i],
				name:	'Cell ' + i+1,
				color:	 colorString
			};
		}
	}
	cellVoltageChart.series[0].setData(newData);
	
	// Set plot options appropriately for the thing being displayed
	if( display_soc ){
		cellVoltageChart.yAxis[0].setExtremes(0,1);
	} else {
		cellVoltageChart.yAxis[0].setExtremes(2500,3800);
	}
	
	// Highcharts does not update the bar color until you scroll over the bar. Toggle the series visibility and redraw to force color change.
	cellVoltageChart.series[0].update({colorByPoint: true});

}

function generateRandomCellData(){
	for (var i=0;i<134;i++){
		cellVoltages[i] = Math.random()*1200+2500;
		cellSOC[i] = [ estimate_soc(Math.round(cellVoltages[i]) - CELLVOLTAGE_MEAS_ERROR_BOUND),
						estimate_soc(Math.round(cellVoltages[i]) + CELLVOLTAGE_MEAS_ERROR_BOUND) ];
		cellVoltageValidity[i] = 0;
	}
}
