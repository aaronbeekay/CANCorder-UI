$( document ).ready(function() {
	serverHost = '192.168.7.35';
	serverPort = '80';
  	// automatically update system status
  	updateAll();
  	
  	setInterval(function() {
  		updateAll();
  		updateVehicleStatus();
  	}, 1000);
} );

function updateMessage( messageName ){
	// send GET request to update all status vars
	$.getJSON('http://' + serverHost + ':' + serverPort + '/api/message.php?messageName=' + messageName, 
		function(data) { 
		
			varName = data.messageName;
			value = data.messageValue;
			status = data.status;
			
			$(".system-variable-value#"+varName).text( value );
			
			switch( status ){
				case "Warn":
					$(".system-variable-name#"+varName).css( 'color', 'yellow' );
					break;
					
				case "Fail":
					$(".system-variable-name#"+varName).css( 'color', 'red' );
					break;
					
				default:
					$(".system-variable-name#"+varName).css( 'color', '' );
					break;
			}
		
		} );
}

function updateVehicleStatus( ){
	// Update the vehicle status variables that trigger popovers (frame fault, HV state, E-stop)
	$.getJSON('http://' + serverHost + ':' + serverPort + '/api/vehicleStatus.php', 
		function(data) { 
			if( data.highVoltage == "True" ){
				$(".alert-hv").removeClass("hidden");
			} else {
				$(".alert-hv").addClass("hidden");
			}
			
			if( data.FrameFault == "True"){
				$(".alert-framefault").removeClass("hidden");
			} else {
				$(".alert-framefault").addClass("hidden");
			}
			
			if( data.EStop == "True"){
				$(".alert-estop").removeClass("hidden");
			} else {
				$(".alert-estop").addClass("hidden");
			}
	} );
}

function updateAll( ){
	// send GET request to update all status vars
	$.getJSON('http://' + serverHost + ':' + serverPort + '/api/system.php?systemName=powertrain', 
		function(data) { 
			for(var i = 0; i < data.length; i++){
				varName = data[i].messageName;
				value 	= data[i].messageValue;
				status 	= data[i].messageStatus;
	
				$(".system-variable-value#"+varName).text( value );
				
				var yellow = "rgb(240, 173, 78)";
			
				switch( status ){
					case "Warn":
						$(".system-variable-name#"+varName).css( 'color', yellow );
						break;
					
					case "Fail":
						$(".system-variable-name#"+varName).css( 'color', 'red' );
						break;
					
					default:
						$(".system-variable-name#"+varName).css( 'color', '' );
						break;
				}
			}
			
			// UGLY HACK FOR SYSTEM STATUS DETERMINATION
			// motor controller
			if( $(".system-variable-name#PhaseAtemp").css( 'color' ) 	== "rgb(255, 0, 0)" || /* red */
				$(".system-variable-name#BusVoltage").css( 'color' ) 	== "rgb(255, 0, 0)" ||
				$(".system-variable-name#MotorId").css( 'color' ) 		== "rgb(255, 0, 0)" ) {
				
				// set parent container to red
				$("div#mc_temperature").parents(".bs-callout").removeClass("bs-callout-success");
				$("div#mc_temperature").parents(".bs-callout").removeClass("bs-callout-warning");
				$("div#mc_temperature").parents(".bs-callout").addClass("bs-callout-danger");
				
			} else if( $(".system-variable-name#PhaseAtemp").css( 'color' ) 	== yellow || /* yellow */
				$(".system-variable-name#BusVoltage").css( 'color' ) 		== yellow ||
				$(".system-variable-name#MotorId").css( 'color' ) 			== yellow ) {
				
				// set parent container to yellow
				$("div#mc_temperature").parents(".bs-callout").removeClass("bs-callout-success");
				$("div#mc_temperature").parents(".bs-callout").removeClass("bs-callout-danger");
				$("div#mc_temperature").parents(".bs-callout").addClass("bs-callout-warning");
				
			} else {
				
				// set parent container to green
				$("div#mc_temperature").parents(".bs-callout").removeClass("bs-callout-warning");
				$("div#mc_temperature").parents(".bs-callout").removeClass("bs-callout-danger");
				$("div#mc_temperature").parents(".bs-callout").addClass("bs-callout-success");
			}
			
			// motor
			if( $(".system-variable-name#MotorTemp").css( 'color' ) 	== "rgb(255, 0, 0)" || /* red */
				$(".system-variable-name#MotorVelocity").css( 'color' ) == "rgb(255, 0, 0)" ) {
				
				// set parent container to red
				$("div#motor_MotorTemp").parents(".bs-callout").removeClass("bs-callout-success");
				$("div#motor_MotorTemp").parents(".bs-callout").removeClass("bs-callout-warning");
				$("div#motor_MotorTemp").parents(".bs-callout").addClass("bs-callout-danger");
				
			} else if( $(".system-variable-name#MotorTemp").css( 'color' ) 	== yellow || /* yellow */
				$(".system-variable-name#MotorVelocity").css( 'color' ) 		== yellow ) {
				
				// set parent container to yellow
				$("div#motor_MotorTemp").parents(".bs-callout").removeClass("bs-callout-success");
				$("div#motor_MotorTemp").parents(".bs-callout").removeClass("bs-callout-danger");
				$("div#motor_MotorTemp").parents(".bs-callout").addClass("bs-callout-warning");
				
			} else {
				
				// set parent container to green
				$("div#motor_MotorTemp").parents(".bs-callout").removeClass("bs-callout-warning");
				$("div#motor_MotorTemp").parents(".bs-callout").removeClass("bs-callout-danger");
				$("div#motor_MotorTemp").parents(".bs-callout").addClass("bs-callout-success");
			}
			
			// pack
			if( $(".system-variable-name#PackTemp").css( 'color' ) 		== "rgb(255, 0, 0)" || /* red */
				$(".system-variable-name#PackSOC").css( 'color' ) 		== "rgb(255, 0, 0)" ||
				$(".system-variable-name#PackBalance").css( 'color' ) 	== "rgb(255, 0, 0)" ) {
				
				// set parent container to red
				$("div#pack_temperature").parents(".bs-callout").removeClass("bs-callout-success");
				$("div#pack_temperature").parents(".bs-callout").removeClass("bs-callout-warning");
				$("div#pack_temperature").parents(".bs-callout").addClass("bs-callout-danger");
				
			} else if( $(".system-variable-name#PackTemp").css( 'color' ) 		== yellow || /* yellow */
				$(".system-variable-name#PackSOC").css( 'color' ) 				== yellow ||
				$(".system-variable-name#PackBalance").css( 'color' ) 			== yellow ) {
				
				// set parent container to yellow
				$("div#pack_temperature").parents(".bs-callout").removeClass("bs-callout-success");
				$("div#pack_temperature").parents(".bs-callout").removeClass("bs-callout-danger");
				$("div#pack_temperature").parents(".bs-callout").addClass("bs-callout-warning");
				
			} else {
				
				// set parent container to green
				$("div#pack_temperature").parents(".bs-callout").removeClass("bs-callout-warning");
				$("div#pack_temperature").parents(".bs-callout").removeClass("bs-callout-danger");
				$("div#pack_temperature").parents(".bs-callout").addClass("bs-callout-success");
			}
		} );
}

function setSystemStatus( system, status ){
	system = system.toLowerCase();
	switch( status ){
		case "OK":
			$(".system-status-indicator#" + system).css("background-color", "green");
			break;
		case "Warn":
			$(".system-status-indicator#" + system).css("background-color", "yellow");
			break;
		case "Fail":
			$(".system-status-indicator#" + system).css("background-color", "red");
			break;
		case "NoData":
			$(".system-status-indicator#" + system).css("background-color", "gray");
			// hmm what else should we do here
		default:
			console.log("updateSystemStatus() called without a valid status");
	}
}