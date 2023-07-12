const sgMail = require('@sendgrid/mail');


sgMail.setApiKey('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');


exports.sendBookingConfirmationEmail = async (receiver, bookingNumber, pinCode) => {
  try {

    const emailContent = {
      to: receiver,
      from: 'usman.shahbaz@kaagga.com',
      subject: 'Booking Confirmation',
      text: `Your booking has been confirmed. Booking number ${bookingNumber}, PIN code: ${pinCode}.`,
      html: `<p>Your booking has been confirmed. Booking number ${bookingNumber}, PIN code: ${pinCode}.</p>`
    };

    await sgMail.send(emailContent);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
