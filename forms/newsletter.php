<?php
//importar las clases de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//incluir los archivos de PHPMailer
require '../PHPMailer-master/src/Exception.php';
require '../PHPMailer-master/src/PHPMailer.php';
require '../PHPMailer-master/src/SMTP.php';

//obtener el correo del formulario
$email = $_POST['email']; 

//crear instancia de PHPMailer
$mail = new PHPMailer(true);

try {
    //configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'technomonstersincoficial@gmail.com';
    $mail->Password   = 'fdkm ixaf dnou khfd';          
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom('technomonstersincoficial@gmail.com', 'TechonMonsters Inc');

    //destinatario
    $mail->addAddress($email);

    //adjuntamos PDF 
    $mail->addAttachment('assets/pdf/catalogo.pdf');

    //asunto y cuerpo mínimo
    $mail->isHTML(true);
    $mail->Subject = "Catalogo de productos";
    $mail->Body    = "Hola,<br>Adjuntamos el PDF del catálogo solicitado.";

    // enviar correo
    $mail->send();
    echo 'OK';
} catch (Exception $e) {
    echo "Error al enviar el mensaje. Mailer Error: {$mail->ErrorInfo}";
}
?>