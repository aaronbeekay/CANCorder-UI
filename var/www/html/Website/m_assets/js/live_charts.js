$( document ).ready(function() {
  	// initialize charts
  	
  	//bus voltage
  	var BusVoltageChart = new SmoothieChart({ 	
  		maxValue:500,
  		minValue:0,
  		millisPerPixel:77,
  		grid: {
  			fillStyle:'#ffffff',
  			sharpLines:true,
  			millisPerLine:3000,
  			verticalSections:4 },
  		labels: {fillStyle:'#000000'}});
	BusVoltageChart.streamTo(document.getElementById("BusVoltage"), 2000 /* delay */);
	
	//Phase current
	var MotorIdChart = new SmoothieChart({ 	
  		maxValue:500,
  		minValue:0,
  		millisPerPixel:77,
  		grid: {
  			fillStyle:'#ffffff',
  			sharpLines:true,
  			millisPerLine:3000,
  			verticalSections:4 },
  		labels: {fillStyle:'#000000'}});
	MotorIdChart.streamTo(document.getElementById("MotorId"), 2000 /* delay */);
	
	//motor velocity
	var MotorVelocityChart = new SmoothieChart({ 	
  		maxValue:3000,
  		minValue:0,
  		millisPerPixel:77,
  		grid: {
  			fillStyle:'#ffffff',
  			sharpLines:true,
  			millisPerLine:3000,
  			verticalSections:4 },
  		labels: {fillStyle:'#000000'}});
	MotorVelocityChart.streamTo(document.getElementById("MotorVelocity"), 2000 /* delay */);
	
	var BusVoltage = new TimeSeries();
	var MotorId = new TimeSeries();
	var MotorVelocity = new TimeSeries();
	
	var everyOther = 0;
	var flag = 0;
	
	setInterval(function() {
	
		$.getJSON('http://' + serverHost + ':' + serverPort + '/api/message.php?messageName=' + 'BusVoltage', 
			function(data) { 
				BusVoltage.append(new Date().getTime(), data.messageValue);
				
				$(".postrun-value#BusVoltage_Avg").text( Math.round( 100*BusVoltage.average() )/100 );
			} );
			
		$.getJSON('http://' + serverHost + ':' + serverPort + '/api/message.php?messageName=' + 'MotorId', 
			function(data2) { 
				MotorId.append(new Date().getTime(), data2.messageValue);
				
				$(".postrun-value#MotorId_Avg").text( Math.round( 100*MotorId.average() )/100 );
			} );
			
		$.getJSON('http://' + serverHost + ':' + serverPort + '/api/message.php?messageName=' + 'MotorVelocity', 
			function(data3) { 
				MotorVelocity.append(new Date().getTime(), data3.messageValue);
				$(".postrun-value#MotorVelocity_Avg").text( Math.round( 100*MotorVelocity.average() )/100 );
			} );
	},500);
	
	BusVoltageChart.addTimeSeries( BusVoltage, {lineWidth:2,strokeStyle:'#00ff00'} );
	MotorIdChart.addTimeSeries( MotorId, {lineWidth:2,strokeStyle:'#00ff00'} );
	MotorVelocityChart.addTimeSeries( MotorVelocity, {lineWidth:2,strokeStyle:'green'} );
});

function getMessageVal( messageName ){
	// send GET request to update all status vars
	var rval;
	
	$.getJSON('http://' + serverHost + ':' + serverPort + '/api/message.php?messageName=' + messageName, 
		function(data) { 
			rval = data.messageValue;
		});
		
	return rval;
}