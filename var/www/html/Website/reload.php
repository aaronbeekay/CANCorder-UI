<?php

	$path = '/home/cancorder/data/';
	$latest_ctime = 0;


	$files = scandir($path);
	chdir($path);
	$i = 2;
	$j = 1;
	echo "<div class=\"tables\"><h2>Data</h2><table>";
	while($i < sizeof($files))
	{
		$fp = fopen($files[$i], "rb");
		if(!feof($fp))
		{
			$binary_data = fread($fp, 16);
			if(strlen($binary_data) > 0)
			{
				if($j == 1)
				{
					echo "<tr>";
				}
				$unpacked_data = unpack('d*', $binary_data);
				if($unpacked_data < 0)
				{
					$unpacked_data = 0;
				}
				echo "<td><b>" . $files[$i] . "</b></td><td>" . round($unpacked_data[2],2, PHP_ROUND_HALF_UP) . "</td>";
				if($j == 2)
				{
					echo "</tr>";
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
	echo "</table></div>";
?>
