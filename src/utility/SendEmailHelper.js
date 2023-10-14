const nodeMailer=require('nodemailer');

const SendEmailHelper=async(EmailTo,EmailText,EmailSubject)=>{
    // let transporter=nodeMailer.createTransport({
    //         pass;
    //     }
    // });
    //
    // let mailOptions={
    //     from:'Ashiqur Rahman Sami <info@teamrabbil.com>',
    //     to:EmailTo,
    //     subject:EmailSubject,
    //     text:EmailText
    // };
    // return  await transporter.sendMail(mailOptions)
}

module.exports = SendEmailHelper