
<?php

if (!empty($_REQUEST['gha-a-n-t-i-s-p-a-m-f-i-e-l-d']) && (bool) $_REQUEST['gha-a-n-t-i-s-p-a-m-f-i-e-l-d'] == TRUE) {
  // spam
} else {
//  $to      = 'georgii.voskresenskii@gmail.com';
   $to      = 'grishatov.hockey@gmail.com';
  $subject = 'GHockeyAgency - '.$_POST['firstName'];

  $message = "<html><head><title>GHockeyAgency</title></head><body>".$_POST['topic']."<br><br><b>Анкета игрока</b><br>ФИО игрока: ".$_POST['fullName']."<br>Дата рождения: ".$_POST['birthday']."<br>Рост: ".$_POST['height']."<br>Вес: ".$_POST['weight']."<br>Email для связи: ".$_POST['email']."</body></html>";
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= 'From: '.$_POST['firstName'].' <admin@ghockeyagency.ru>' . "\r\n".
      'Reply-To: grishatov.hockey@gmail.com' . "\r\n";

  mail($to, $subject, $message, $headers);
}

?>
