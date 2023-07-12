const nodemailer = require("nodemailer");

async function sendBookingConfirmationEmail(receiver, bookingNumber, pinCode) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ua5979800@gmail.com',
        pass: 'dlmigpfwjmcgknka'
      }
    });

    const mailOptions = {
      from: 'ua5979800@gmail.com',
      to: receiver,
      subject: 'Booking Confirmation',
      text: `Your booking has been confirmed. Booking number ${bookingNumber}, PIN code: ${pinCode}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

module.exports = {
  sendBookingConfirmationEmail
};
