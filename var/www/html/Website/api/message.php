<?php 

// Take in the desired messageName
$requestedMessage = $_GET['messageName'];
//echo $requestedMessage;

$filename = "/home/cancorder/data/" . $requestedMessage;

$fileHandle = fopen($filename, "rb");
$binaryResult = fread($fileHandle, filesize($filename));
		
$result = unpack("d*", $binaryResult);

$reply = array( 'messageName'  => $requestedMessage,
				'messageTime'  => $result[1],
				'messageValue' => $result[2] );
				
// Required for security checks when running mobile interface cross-domain
header('Access-Control-Allow-Origin: *');			
	
echo json_encode($reply);

?>
