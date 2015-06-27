var freshnessThreshold 	= 10;	// number of seconds before a message is considered stale
var graphMin 			= 3.5;	// left-side value of bar graphs
var graphMax 			= 4.2;	// right-side value of bar graphs

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
	
	//Real:
	//uri = 'http://' + serverHost + ':' + serverPort + '/api/system.php?systemName=allBatteries';
	
	//Simulate:
	uri = 'http://' + serverHost + ':' + serverPort + '/api/system.php?systemName=fakeAllBatteries';
	
	var jqxhr = $.getJSON(uri, 
		function(data) { 
			
			function updateCellVoltage( cellNumber ){
				var messageName 		= "Cell" + cellNumber + "VoltageAndState";
				var domID 				= "#cell-" + cellNumber;
				
				var cellVoltageValid 	= ( 	data[messageName]["MessageTime"] != -1 
											&&	data[messageName]["Age"] <= freshnessThreshold 	);
				
				if( cellVoltageValid ){
					// TODO: indicate validity of data
					
					// Update voltage text
					var voltage 		= data[messageName]["MessageValue"]/1000;
					$(".battery-bar" + domID).text( voltage.toFixed(3) );
					
					// Update bar graph width
					if( voltage > graphMax ){
						// TODO: indicate overvoltage
						voltage = graphMax;
					} else if (voltage < graphMin ){
						// TODO: indicate undervoltage
						voltage = graphMin;
					}
					
					var maxWidth = 100;		// maximum width of bar graph in px - should be dynamic...
					var graphPct = (voltage - graphMin)/(graphMax - graphMin);
					$(".battery-progress-bar" + domID).css('width', (graphPct * maxWidth).toFixed(3) + 'px');
					
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