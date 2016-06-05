<?php
	// Required for security checks when running mobile interface cross-domain
	header('Access-Control-Allow-Origin: *');	
	header('Content-Type: application/json');

	$path = '/home/cancorder/data/';
	$latest_ctime = 0;

	$files = scandir($path);
	chdir($path);
	$i = 2;
	$j = 1;
	while($i < sizeof($files))
	{
		$fp = fopen($files[$i], "rb");
		if(!feof($fp))
		{
			$binary_data = fread($fp, 16);
			if(strlen($binary_data) > 0)
			{
				$unpacked_data = unpack('d*', $binary_data);
				if($unpacked_data < 0)
				{
					$unpacked_data = 0;
				}
				
				$values[ $files[$i] ] = round($unpacked_data[2],2, PHP_ROUND_HALF_UP);
				
				if($j == 2)
				{
					//echo "</tr>";
					$j = 0;
				}
				$j = $j + 1;

			}
			else
			{
				//echo "No data read";
			}
		}
		else 
		{
			//echo "Didn't open file";
		}
		fclose($fp);
		$i = $i + 1;

	}
	echo json_encode( $values );
?>
