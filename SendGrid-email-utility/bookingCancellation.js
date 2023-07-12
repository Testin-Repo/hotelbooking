const sgMail = require('@sendgrid/mail');


sgMail.setApiKey('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');


exports.sendBookingCancellationEmail = async (receiver, bookingNumber) => {
  try {

    const emailContent = {
      to: receiver,
      from: 'usman.shahbaz@kaagga.com',
      subject: 'Booking Cancellation',
      text: `Your booking has been cancelled. Booking number ${bookingNumber}.`,
      html: `<p>Your booking has been cancelled. Booking number ${bookingNumber}.</p>`
    };

    await sgMail.send(emailContent);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
