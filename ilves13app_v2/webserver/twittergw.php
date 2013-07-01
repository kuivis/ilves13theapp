<?php
ini_set('display_errors', 'On');
session_start();

require_once("twitteroauth/twitteroauth.php"); //Path to twitteroauth library

$twitteruser = "ilves13";
$notweets = 30;
$consumerkey = "qeN60cfnj5qwaRSxFabhng";
$consumersecret = "5VfS9R0ClToEvnZr4kFtJIwssNZu91M9jx4JTTfsU";
$accesstoken = "881760637-8SlNkXcSKxbhbfqNntwcTYnS64ctollsbdAYGnBu";
$accesstokensecret = "fR40ekeo3lGCRLNY6do7sCpoR8iBRhsd7xm0Sdi8NFQ";
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}

  
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" .$twitteruser ."&count=" .$notweets);
 
echo json_encode($tweets);
?>
