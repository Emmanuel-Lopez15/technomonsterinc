<?php
// importar las clases de PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// incluir los archivos de PHPMailer
require '../PHPMailer-master/src/Exception.php';
require '../PHPMailer-master/src/PHPMailer.php';
require '../PHPMailer-master/src/SMTP.php';

// obtener datos del formulario
$name    = $_POST['name'];
$email   = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// crear instancia de PHPMailer
$mail = new PHPMailer(true);

try {
    // configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; 
    $mail->SMTPAuth   = true;
    $mail->Username   = 'technomonstersincoficial@gmail.com'; 
    $mail->Password   = 'fdkm ixaf dnou khfd';         
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;


    // remitente
    $mail->setFrom('technomonstersincoficial@gmail.com', 'Technomonstersinc');

    // destinatario (la persona que llenó el formulario)
    $mail->addAddress($email, $name);

    // asunto y cuerpo
    $mail->isHTML(true);
    $mail->Subject = "Registro exitoso: " . $subject;
    $mail->Body    = "
        <h3>Hola $name,</h3>
        <p>Gracias por contactarte. Hemos recibido tu mensaje:</p>
        <blockquote>$message</blockquote>
        <p>Te responderemos pronto.<br>Saludos,<br><strong>Tu Empresa</strong></p>
    ";

    // enviar correo
    $mail->send();
    echo 'OK';
} catch (Exception $e) {
    echo "Error al enviar el mensaje. Mailer Error: {$mail->ErrorInfo}";
}
?>