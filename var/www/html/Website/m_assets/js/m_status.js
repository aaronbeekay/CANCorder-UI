$( document ).ready(function() {
	serverHost = '192.168.4.1';
	serverPort = '80';
	
  	// automatically update system status
  	updateAll();
  	
  	setInterval(function() {
  		updateAll();
  	}, 1000);
} );

function updateAll( ){
	// send GET request to update all status vars
	uri = 'http://' + serverHost + ':' + serverPort + '/reload_bms.php';
	
	var minCellVoltage, maxCellVoltage = 0;
	
	var jqxhr = $.getJSON(uri, 
		function(data) { 
			if( $("#ignore-bim-3").is(':checked') ){
				var minVoltages = [ data["BIM1MinCellVoltage"],
									data["BIM2MinCellVoltage"],
									5000,
									data["BIM4MinCellVoltage"],
									data["BIM5MinCellVoltage"] 	];
									
				var maxVoltages = [ data["BIM1MaxCellVoltage"],
									data["BIM2MaxCellVoltage"],
									0,
									data["BIM4MaxCellVoltage"],
									data["BIM5MaxCellVoltage"] 	];
									
			} else {
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
			}
									
				var minCellVoltage 	= Math.min( minVoltages );		
				var maxCellVoltage 	= Math.max( maxVoltages );				
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

/*

*/