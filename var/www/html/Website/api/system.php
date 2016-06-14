<?php // Establish connection to MySQL database $con = 

// Take in the desired messageName
$requestedMessage = $_GET['systemName'];

// Required for security checks when running mobile interface cross-domain
header('Access-Control-Allow-Origin: *');	

$output = array();
$variables = array();

// Choose which messages to return
switch ($requestedMessage){
	case "batteries":
		for ($i = 1; $i <= 36; $i++) {
			$signalName = "CellTemp" . $i;
			$variables[] = $signalName;
		}
	
		$variables[] = "BIM1MinCellVoltage";
		$variables[] = "BIM1MaxCellVoltage";
		$variables[] = "BIM2MinCellVoltage";
		$variables[] = "BIM2MaxCellVoltage";
		$variables[] = "BIM3MinCellVoltage";
		$variables[] = "BIM3MaxCellVoltage";
		$variables[] = "BIM4MinCellVoltage";
		$variables[] = "BIM4MaxCellVoltage";
		$variables[] = "BIM5MinCellVoltage";
		$variables[] = "BIM5MaxCellVoltage";
	
		$variables[] = "BIM1AvgCellVoltage";
		$variables[] = "BIM2AvgCellVoltage";
		$variables[] = "BIM3AvgCellVoltage";
		$variables[] = "BIM4AvgCellVoltage";
		$variables[] = "BIM5AvgCellVoltage";

		break;
	case "allBatteries":
		// TODO: should execute this async
		//exec('./cellRTR.sh');
		
		for ($i = 1; $i < 134; $i++) {
			$signalName = "Cell" . $i . "Voltage";
			$variables[] = $signalName;
		}
		break;
		
	// This case is for testing the BMS page
	case "fakeAllBatteries":
		
		for ($i = 1; $i < 134; $i++) {
			$signalName = "Cell" . $i . "Voltage";
			$variables[] = $signalName;
		}
		foreach($variables as $messageName){
			$output[$messageName] 	= array(
						"MessageTime"	=> time(),
						"MessageValue" 	=> rand(3500, 4150),
						"Age"			=> 1 );
		}
		
		echo json_encode($output);
		die();
		
	case "motorController":	
		// To be added
		break;
		
	default:
		// FIXME: should generate a proper HTTP error here
		echo "Invalid system requested";
		die();
}

foreach( $variables as $messageName) {
	$filename = "/home/cancorder/data/" . $messageName;
	
	// Test if the file exists (if not, the message has not been received)
	if( filesize($filename) > 0 ){
		$fileHandle = fopen($filename, "rb");
		$binaryResult = fread($fileHandle, filesize($filename));
		fclose($fileHandle);
	
		$result = unpack("d*", $binaryResult);
		$output[$messageName] 	= array(
					"MessageTime"	=> $result[1],
					"MessageValue" 	=> $result[2],
					"Age"			=> time() - $result[1] );
	} else {
		// this fills up the logs really fast
		//error_log( $messageName . ' requested from API but no message in cache' );
		
		$output[$messageName] 	= array(
					"MessageTime" 	=> -1 	);
	}
	
}
echo json_encode($output);

?>
