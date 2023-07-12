const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

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


function sendMail(receiver, newPassword) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ua5979800@gmail.com',
            pass: 'kishwa1'
        }
    });

    var mailOptions = {
        from: 'ua5979800@gmail.com',
        to: receiver,
        
        subject: 'Hotel Booking App Passwords Reset',
        text: "This is your new password from hotel booking \n \n" + newPassword + "\n \n Best Regards Team" + "\n Thanks" ,
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            return true
        }
    });
}

module.exports = {
    generateRandomPassword,
    sendMail
}