const sgMail = require('@sendgrid/mail');
const randomstring = require("randomstring");

sgMail.setApiKey('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');


function generateRandomPassword() {
    var password = "";
    for (let index = 0; index < 5; index++) {
        if (password.length <= 5) {
            password += ('a1b9c2d3e0f4g5h7ij8kl0mn8o9pr7sty2uv6yz7wx').split('')[(Math.floor(Math.random() * 26))];
        }
    }
    password += new Date().getMilliseconds();
    return password
}

async function sendPasswordResetEmail(receiver, newPassword) {
  try {
    const emailContent = {
      to: receiver,
      from: 'usman.shahbaz@kaagga.com',
      subject: 'Password Reset',
      text: "This is your new password from hotel booking \n \n" + newPassword + "\n \n Best Regards Team" + "\n Thanks" ,
    };

    await sgMail.send(emailContent);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = {
    generateRandomPassword,
    sendPasswordResetEmail 
}
