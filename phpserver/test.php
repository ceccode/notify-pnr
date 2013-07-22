<?php
	$redis = new Redis();
	$connected = $redis->connect('127.0.0.1', 6379);
	$redis->publish("the_channel", date('l jS \of F Y h:i:s A') . '<br />' . 'Messaggio di test' );
?>