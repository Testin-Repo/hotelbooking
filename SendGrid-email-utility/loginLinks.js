const jwt = require("jsonwebtoken");


const sgMail = require('@sendgrid/mail')


sgMail.setApiKey('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');


exports.mylogin = async (req, res) => {


    const { email } = req.params;

  
    const secretKey = process.env.JWT_SECRET;
    
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

  
    const loginLink = `http://localhost:8000/users/login?token=${token}`;
  
    const emailContent = {

      to: email,
      from: 'usman.shahbaz@kaagga.com',
      subject: 'Login to Your Account',
      text: 'Click the following link to log in: ' + loginLink,
      html: '<p>Click the following link to log in: <a href="' + loginLink + '">Log In</a></p>',
    };
  

    sgMail
      .send(emailContent)
      .then(() => {

        res.status(200).json({ message: 'Login email sent successfully!' });

      })

      .catch((error) => {

        console.error('Error sending login email:', error);
        res.status(500).json({ error: 'An error occurred while sending the login email.' });

      });
};


exports.userLogin = async (req, res) => {
    const { token } = req.query;
    const secretKey = process.env.JWT_SECRET;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Invalid token.' });
        } else {
            // Token is valid, log the user in.
            // In a real application, you would probably set a cookie or session here.
            res.status(200).json({ message: 'Logged in successfully!', email: decoded.email });
        }
    });
};