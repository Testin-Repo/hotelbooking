const nodemailer = require("nodemailer");


function sendBookingCancellationEmail(receiver, bookingNumber) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ua5979800@gmail.com',
            pass: 'dlmigpfwjmcgknka'
        }
    });

    var mailOptions = {
        from: 'ua5979800@gmail.com',
        to: receiver,
        subject: 'Booking Cancellation',
        text: `Your booking has been cancelled. Booking number ${bookingNumber}`,
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
    sendBookingCancellationEmail
}