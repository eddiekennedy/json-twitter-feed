<?php

// Include OAuth library
require_once('twitteroauth/twitteroauth/twitteroauth.php');

// OAuth key
$key = "";
$key_secret = "";

// OAuth token
$token = "";
$token_secret = "";

// Authenticate
$connection = new TwitterOAuth($key, $key_secret, $token, $token_secret);

// User screen name
$screenname = '';
// Tweet count
$tweet_count = 5;

// Grab the feed
$feed = $connection->get('statuses/user_timeline',
	array(
		'screen_name' => $screenname, 
		'count' => $tweet_count
	));

// Output the feed as JSON
print_r(json_encode($feed));

?>