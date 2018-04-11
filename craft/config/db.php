<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(
	'*' => array(
		'tablePrefix' => 'craft'
	),
	'localhost' => array(
		'server' => 'localhost',
		'user' => 'root',
		'password' => 'root',
		'database' => 'embark',
    'port' => '8888'
	),
	'dev.embarkapp.co.uk' => array(
		'server' => 'localhost',
		'user' => 'liamd_embarkapp',
		'password' => 'Hullcity789',
		'database' => 'liamdean_embarkapp'
	),
);
