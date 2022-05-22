<?php
// Подключаем библиотеку PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

// Создаем письмо
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8'; // указать кодировку обязательно
$mail->setLanguage('ru','phpmailer/language/'); // языковой пакет для выведения сообщений плагина на русском языке
$mail->IsHTML(true);

$mail->setFrom('yur0k444@gmail.com', 'Иван Иванов');     // от кого
$mail->addReplyTo('yur0k444@gmail.com', 'Иван Иванов');  // обратный адрес
$mail->addAddress('billy44farmers@gmail.com', 'Вася Петров');    // кому
$mail->Subject = 'Привет! Это твой сайт "Аудит рекламы"';                           // тема


//рука
/*$hand = "правая";
if($_POST['hand'] == "левая"){
  $hand = "левая";
}
*/

// тело письма
$body = '<h1>Встречайте суперписьмо !</h1>';
if (trim(!empty($_POST['name']))){// проверяем заполнено ли поле
  $body.= '<p><strong>Имя:</strong>'.$_POST['name'].'</p>';}

if (trim(!empty($_POST['email']))){
  $body.= '<p><strong>E-Mail:</strong>'.$_POST['email'].'</p>';}

if (trim(!empty($_POST['hand']))){
 $body.= '<p><strong>Рука:</strong>'.$hand.'</p>';}  

 if (trim(!empty($_POST['age']))){
  $body.= '<p><strong>Возраст:</strong>'.$_POST['age'].'</p>';}

if (trim(!empty($_POST['message']))){
  $body.= '<p><strong>Имя:</strong>'.$_POST['message'].'</p>';}  


  //Прикреплённый файл 
  if (!empty($_FILES['image']['tmp_name'])){ //если картика есть 
    if (copy($_FILES['image']['tmp_name'],$filePath)){ // копируем её в переменную пач и если всё ок 
      $body.= '<p><strong>Фото в приложении:</strong>';
      $mail->addAttachment('$filePath');// прикрепляем один файл пач в письмо
     }
    
  
  }
  $mail-> body = $body ;



/*
$mail->msgHTML(file_get_contents('contents.html'), __DIR__);  // получаем "тело" письма из файла
$mail->AltBody = 'Письмо обычным текстом';  // письмо обычным текстом, если клиент не поддерживает html
$mail->addAttachment('my_file.txt');        // прикрепляем один файл
$mail->addAttachment('phpmailer.jpg');      // прикрепляем второй файл
*/


// Отправляем
if ($mail->send()) {
  $message = 'Письмо отправлено!';
} else {
  $message = 'Ошибка: ' ;
}

$response = ['message'=> $message];

header('content-type: application/json'); // заголовком json выходим из пхп и возвращаемся в js
echo json_encode($response);
?>