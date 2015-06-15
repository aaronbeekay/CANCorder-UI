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