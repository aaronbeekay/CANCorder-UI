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



}

foreach( $variables as $messageName) {
	$filename = "/home/cancorder/data/" . $messageName;
	$fileHandle = fopen($filename, "rb");
	$binaryResult = fread($fileHandle, filesize($filename));
	fclose($fileHandle);
	
	$result = unpack("d*", $binaryResult);
	$output[$messageName] = array(
			    "MessageTime"	=> $result[1],
			    "MessageValue" 	=> $result[2] );
	
}
echo json_encode($output);

?>
