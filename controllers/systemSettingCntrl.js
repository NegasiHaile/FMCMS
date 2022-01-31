const SenderEmails = require("../models/senderEmailModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const systemSettingCntrl = {
  addEmailSender: async (req, res) => {
    try {
      const senderEmailExist = await SenderEmails.findOne({
        email: req.body.senderEmail,
      });
      const primaryEmail = await SenderEmails.findOne({
        primary: true,
      });

      if (!senderEmailExist) {
        if (primaryEmail) {
          const verificationToken = createAccessToken({
            email: req.body.senderEmail,
          });
          const expireToken = Date.now() + 3600000;

          const newSenderEMail = new SenderEmails({
            email: req.body.senderEmail,
            password: req.body.emailPassword,
            verificationToken: verificationToken,
            expireToken: expireToken,
          });

          await newSenderEMail.save();

          const mailDetail = {
            emailToMail: req.body.senderEmail,
            primaryMailer: primaryEmail.email,
            primaryMailerPassword: primaryEmail.password,
            subject: "JuPiTeR FMCMS Email verification!",
            text: "",
            html: `<h4> Email veification link for the JuPiTer Tadingeth FMCMS sender email. </h4>
        <p> Click 
        <a href="${process.env.SENDER_EMAIL_VERIFICATION_URL}/${verificationToken}"
        target="_blank"
        rel="noopener noreferrer">HERE</a> 
        to verify your email or copy the following link and past it new tab.  <p/> 
        <br> 
        <a href="${process.env.SENDER_EMAIL_VERIFICATION_URL}/${verificationToken}"
        target="_blank"
        rel="noopener noreferrer">${process.env.SENDER_EMAIL_VERIFICATION_URL}/${verificationToken}</a>`,
          };
          sendMailToUser(mailDetail);

          res.status(200).json({
            msg: "Sender email successfuly added and we have send an email verification. Please login to this email and verify it!",
          });
        } else {
          res.status(400).json({
            msg: "Primary sender email not exist, Please go to setting and set your primary sender email!",
          });
        }
      } else {
        res.status(400).json({ msg: "Email exist!" });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  fetchEmailSenders: async (req, res) => {
    try {
      res.json(await SenderEmails.find().select("-password"));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  deleteEmailSender: async (req, res) => {
    try {
      await SenderEmails.findByIdAndDelete(req.params.id);
      res.status(200).json({
        msg: "Sender email successfuly removed!",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  makePrimaryEmailSender: async (req, res) => {
    try {
      const mailer = await SenderEmails.findById(req.params.id);
      if (mailer.emailVerified) {
        await SenderEmails.updateMany({ primary: false });
        await SenderEmails.findByIdAndUpdate(req.params.id, { primary: true });
        res.status(200).json({
          msg: "Successfuly cahnged to primary!",
        });
      } else {
        res.status(500).json({
          msg: "Email not verified,Please login to this email and verify it first!",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  verifySenderEmail: async (req, res) => {
    // try {
    const verifiyingEmail = await SenderEmails.findOne({
      verificationToken: req.params.verificationToken,
      expireToken: { $gt: Date.now() },
    });
    if (verifiyingEmail) {
      await SenderEmails.findByIdAndUpdate(
        { _id: verifiyingEmail._id },
        {
          emailVerified: true,
          verificationToken: undefined,
          expireToken: undefined,
        }
      );
      res.status(200).json({
        msg:
          verifiyingEmail.email +
          " is successfully verified, Now you can make this primary email!",
      });
    } else {
      console.log("Verification token not found!");
      res.status(400).json({
        msg: "Invalid or expired session!",
      });
    }
    // } catch (error) {
    //   res.status(500).json({ msg: error.message });
    // }
  },
};
const createAccessToken = (email) => {
  return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
};
const sendMailToUser = async (mailDetail) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: mailDetail.primaryMailer,
      pass: mailDetail.primaryMailerPassword, // Thepassword of the mailer
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // console.log(mailDetail);
  var mailOptions = {
    from: mailDetail.primaryMailer,
    to: mailDetail.emailToMail,
    subject: mailDetail.subject,
    text: mailDetail.text,
    html: mailDetail.html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email not sent : " + error);
    } else {
      console.log("Email sent to: " + mailDetail.emailToMail + info.response);
    }
  });
};
module.exports = systemSettingCntrl;
