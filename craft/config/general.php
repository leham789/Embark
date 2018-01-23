<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
  '*' => array(
    'omitScriptNameInUrls' => true//,
    //'defaultImageQuality' => 100//,
    //'cacheDuration' => 'P1W'
  ),

  'localhost' => array(
    'environmentVariables' => array(
      'sitePath' => '/Users/liamdean/Developer/embark/',
      'baseUrl'  => 'http://localhost:8888/embark/',
      'devMode' => true,
      'testToEmailAddress'  => 'leham789@hotmail.co.uk'
    )
  ),

  'liam-dean.com' => array(
    'environmentVariables' => array(
      'basePath' => '/httpdocs/',
      'baseUrl'  => 'https://embarkapp.com/',
      'cacheDuration' => 'P1W'
    )
  ),

  'dev.liam-dean.com' => array(
    'environmentVariables' => array(
      'basePath' => '/dev/',
      'baseUrl'  => 'http://dev.embarkapp.com/',
      'devMode' => true
    )
  )
);
