$( document ).ready(function() {
	serverHost = '192.168.4.1';
	serverPort = '80';
	
  	// automatically update system status
  	//updateAll();
  	
  	setInterval(function() {
  		updateBMS();
  	}, 1000);
} );

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
				
			$(".system-variable-value#pack_highcell").text( maxCellVoltage/1000 );
			$(".system-variable-value#pack_lowcell").text( minCellVoltage/1000 );
			$(".system-variable-value#pack_lowcell_packnum").text( minPack );
			$(".system-variable-value#pack_highcell_packnum").text( maxPack);
			
			// Update pack average voltage indicators
			$("#battery-shelf-1").text(data["BIM1AvgCellVoltage"]["MessageValue"]/1000 + " V")
			$("#battery-shelf-2").text(data["BIM2AvgCellVoltage"]["MessageValue"]/1000 + " V")
			$("#battery-shelf-3").text(data["BIM3AvgCellVoltage"]["MessageValue"]/1000 + " V")
			$("#battery-shelf-4").text(data["BIM4AvgCellVoltage"]["MessageValue"]/1000 + " V")
			$("#battery-shelf-5").text(data["BIM5AvgCellVoltage"]["MessageValue"]/1000 + " V")
			
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

/*

*/