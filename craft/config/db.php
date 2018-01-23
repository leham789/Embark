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
	'liam-dean.com' => array(
		'server' => 'localhost',
		'user' => 'liamd_portfolio',
		'password' => 'Hullcity789',
		'database' => 'liamdean_portfolio'
	),
	'dev.liam-dean.com' => array(
		'server' => '127.0.0.1',
		'user' => 'liamd_portfolio',
		'password' => 'Hullcity789',
		'database' => 'liamdean_devportfolio'
	),
);
