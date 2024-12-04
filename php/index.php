<?php
  include "router.php";
  include "app/post.php";
  include "app/get.php";

  $router = new Router();
  
  $router->addRoute('GET', '/get', function () {
    GetData();
    exit;
  });
  
  $router->addRoute('POST', '/post', function () {
    PostData();
    exit;
  });
  
  $router->matchRoute();
?>
