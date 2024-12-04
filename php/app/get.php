<?php
  function GetData() {
    header("Content-Type: application/json");
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Origin: *');


    $appId = $_GET["appId"] ?? "129731987ksjdhjk";
    // $appId = $_GET["page"] ?? "129731987ksjdhjk";
    $path= "file/".$appId.".json";
    if(!file_exists("file")){
      mkdir("file");
    }

    $myfile = "";
    $data = array();
    if(file_exists($path)){
      $myfile = fopen($path, "r") or die("Unable to open file!");
      $rawData = fread($myfile, filesize($path));
      $data = json_decode($rawData, true);
    }else{
      $myfile = fopen($path, "w") or die("Unable to open file!");
      fwrite($myfile,  "[]");
    }
    $resp = array("data" => $data);
    echo json_encode($resp);
    fclose($myfile);
  }
?>
