<?php

  function PostData() {
    header("Content-Type: application/json");
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Origin: *');

    $appId = $_POST["appId"] ?? "129731987ksjdhjk";
    $username = $_POST["username"] ?? "unknown";
    $message = $_POST["message"] ?? "no message";
    $date = date("Y-m-d H:i:s");

    $path= "file/".$appId.".json";
    if(!file_exists("file/")){
      mkdir("file");
    }

    $myfile = "";
    $data = array();

    $submitedData = array(
      "username" => $username,
      "message" => $message,
      "date" =>   $date
    );

    if(file_exists($path)){
      $myfile = fopen($path, "r") or die("Unable to open file!");
      $rawData = fread($myfile, filesize($path));
      $data = json_decode($rawData , true);
    }
    $myfile = fopen($path, "w") or die("Unable to open file!");
    array_push($data, $submitedData);
    $string = json_encode($data, true);
    fwrite($myfile,  $string);
    $resp = array("data" => $submitedData);
    echo json_encode($resp);
    fclose($myfile);
  }

  
?>