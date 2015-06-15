<?php // Establish connection to MySQL database $con = 

// Take in the desired messageName
$requestedMessage = $_GET['systemName'];

// Required for security checks when running mobile interface cross-domain
header('Access-Control-Allow-Origin: *');	

$output = array();

if ( $requestedMessage = "batteries" ) {
	$variables = array();
	
	for ($i = 1; $i < 109; $i++) {
		$signalName = "Cell" . $i . "VoltageAndState";
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
					"MessageValue" 	=> $result[2] );
	} else {
		error_log( $messageName . ' requested from API but no message in cache' );
		
		$output[$messageName] 	= array(
					"MessageTime" 	=> -1 	);
	}
	
}
echo json_encode($output);

?>
