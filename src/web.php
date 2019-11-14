<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json; charset=UTF-8');


  echo file_get_contents('https://reversequiz.herokuapp.com/quizresult');
?>
