var freshnessThreshold = 10;	// number of seconds before a message is considered stale

$( document ).ready(function() {
	serverHost = '192.168.4.1';
	serverPort = '80';
	
  	// automatically update system status
  	//updateAll();
  	
  	setInterval(function() {
  		updateAllCells();
  	}, 1000);
} );
	
function updateAllCells( ){
	// send GET request to update BMS status vars
	uri = 'http://' + serverHost + ':' + serverPort + '/api/system.php?systemName=allBatteries';
	
	var jqxhr = $.getJSON(uri, 
		function(data) { 
			
			function updateCellVoltage( cellNumber ){
				var messageName 		= "Cell" + cellNumber + "VoltageAndState";
				var domID 				= "#cell-" + cellNumber;
				
				var cellVoltageValid 	= ( 	data[messageName]["MessageTime"] != -1 
											&&	data[messageName]["Age"] <= freshnessThreshold 	);
				
				if( cellVoltageValid ){
					// TODO: indicate validity of data
					$(domID).text( (data[messageName]["MessageValue"]/1000).toFixed(3) );
				} else {
					// TODO: indicate invalid data
				}		
			}
			
			for (var cell=1; cell<=108; cell++){
				updateCellVoltage( cell );
			}
		} )
		.error( 	
			function(jqxhr, textStatus, error) {
				var err = textStatus + ", " + error;
				console.log("failure: " + err);
			 }
		);
}