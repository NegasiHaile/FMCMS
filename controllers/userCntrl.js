const Users = require("../models/userModel");
const SenderEmails = require("../models/senderEmailModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const generator = require("generate-password");
const nodemailer = require("nodemailer");

const userCntrl = {
  register: async (req, res) => {
    try {
      // console.log(req.file);
      const {
        fName,
        mName,
        lName,
        gender,
        // photo,
        branch,
        city,
        subCity,
        kebele,
        woreda,
        phoneNumber,
        email,
        userRole,
      } = req.body;

      const newpassword = "123456"; // generatePassword();

      const user = await Users.findOne({ email });
      // const primaryEmail = await SenderEmails.findOne({
      //   primary: true,
      // });

      if (user)
        return res
          .status(400)
          .json({ msg: "There is a user with this email!" });

      //Password Encryption
      const passwordHash = await bcrypt.hash(newpassword, 10);

      const newUser = new Users({
        fName,
        mName,
        lName,
        gender,
        photo: req.file,
        branch,
        city,
        subCity,
        kebele,
        woreda,
        phoneNumber,
        email,
        password: passwordHash,
        userRole,
      });

      // if (primaryEmail) {
      await newUser.save();
      // const mailDetail = {
      //   emailToMail: email,
      //   primaryMailer: primaryEmail.email,
      //   primaryMailerPassword: primaryEmail.password,
      //   passwordToMail: newpassword,
      //   subject: "Password to your DEMER FMCMS Account",
      //   text: "Password for your DEMER FMCMS account: ",
      // };
      // sendMailToUser(mailDetail);
      res.json({
        msg: "User has been successfuly registered, and we have sent a password to the email!",
      });
      // } else {
      //   return res.status(400).json({
      //     msg: "Primary email not exist, Please go to system setting and set your primary sender email ",
      //   });
      // }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getuserDetail: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  editUser: async (req, res) => {
    try {
      const payload = req.body;
      await Users.findOneAndUpdate({ _id: req.params.id }, { ...payload });
      res.json({ msg: "User datail edited successfuly!" });
    } catch (error) {
      res.status(500).json({ meg: error.msg });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.json({ msg: "Users has been deleted successfuly!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      res.json(await Users.find().sort({ createdAt: -1 }).select("-password"));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({
        email: {
          $regex: new RegExp(email, "i"),
        },
      });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!user || !isMatch)
        return res
          .status(400)
          .json({ msg: "Oops! Incorect user credentials!" });

      if (user.status !== "ON")
        return res.status(400).json({
          msg: "Your account is disabled, please contact the admin!",
        });

      // If login success , create access token and refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: true,
        sameSite: "none",
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getLogedInUser: async (req, res) => {
    try {
      // const user = await Users.findById(req.user.id).select("-password");
      // if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(await Users.findById(req.user.id).select("-password"));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await Users.findById(req.params.id);

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch)
        return res.status(400).json({ msg: "Old password is not correct!" });

      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ msg: "New password must be at least 6 character!" });

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          password: await bcrypt.hash(newPassword, 10),
        }
      );

      res.json({ msg: "Your password has been changed successfuly!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({
        email: {
          $regex: new RegExp(email, "i"),
        },
      });
      const primaryEmail = await SenderEmails.findOne({
        primary: true,
      });

      if (!user)
        return res.status(400).json({
          msg: "There is no account with this email, please insert your email correctly!",
        });

      const resetToken = createAccessToken({ id: user._id });
      const expireToken = Date.now() + 3600000;

      if (primaryEmail) {
        await Users.findOneAndUpdate(
          { _id: user.id },
          {
            resetToken: resetToken,
            expireToken: expireToken,
          }
        );

        const mailDetail = {
          emailToMail: email,
          primaryMailer: primaryEmail.email,
          primaryMailerPassword: primaryEmail.password,
          subject: "DEMER-FMCMS password reset link",
          html: `<h4> Password reset request for your DEMER-FMCMS account. </h4>
        <p> Click 
        <a href="${process.env.RESET_PASSWORD_URL}/${resetToken}"
        target="_blank"
        rel="noopener noreferrer">HERE</a> 
        to reset your password or copy the following link and past it new tab.  <p/> 
        <br> 
        <a href="${process.env.RESET_PASSWORD_URL}/${resetToken}"
        target="_blank"
        rel="noopener noreferrer">${process.env.RESET_PASSWORD_URL}/${resetToken}</a>`,
        };
        sendMailToUser(mailDetail);

        res.json({
          msg:
            "An email with password reset link is sent to " +
            user.email +
            ", Please check your email!",
        });
      } else {
        return res.status(400).json({
          msg: "Primary email not exist, Please go to system setting and set your primary sender email ",
        });
      }
    } catch (error) {
      res.status(500).json({ meg: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const user = await Users.findOne({ resetToken: req.params.resetToken });
      if (!user) {
        return res.status(400).json({ msg: "Invalid session or expired!" });
      } else {
        if (req.body.newPassword.length >= 6) {
          if (user.expireToken < Date.now()) {
            return res.status(400).json({
              msg:
                "Session has been expired, please forgot password again!" +
                1642497534091 +
                "/" +
                Date.now(),
            });
          } else {
            await Users.findOneAndUpdate(
              { _id: user.id },
              {
                password: await bcrypt.hash(req.body.newPassword, 10),
                resetToken: undefined,
                expireToken: undefined,
              }
            );
            res.json({ msg: "Password has been reseted successfully!" });
          }
        } else {
          return res.status(400).json({
            msg: "Password must be lengthen 6 characters",
          });
        }
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  blockAccount: async (req, res) => {
    try {
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          status: "OFF",
        }
      );
      res.json({ msg: "User account has been disabled successfuly!" });
    } catch (error) {
      res.status(500).json({ meg: error.message });
    }
  },

  activateAccount: async (req, res) => {
    try {
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          status: "ON",
        }
      );
      res.json({ msg: "User account has been activated successfuly!" });
    } catch (error) {
      res.status(500).json({ meg: error.message });
    }
  },

  refreshToken: (req, res) => {
    try {
      // Cookie is not working now, fix this later
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please Login!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please reLogin!" });

        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

// const generatePassword = () => {
//   const generatedpassword = generator.generate({
//     length: 8,
//     numbers: true,
//     symbols: false,
//     uppercase: false,
//   });
//   return generatedpassword;
// };

const sendMailToUser = (mailDetail) => {
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
    text: mailDetail.text + mailDetail.passwordToMail,
    html: mailDetail.html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return { msg: "Email not sent : " + error };
    } else {
      return {
        msg: "Email sent to: " + mailDetail.emailToMail + info.response,
      };
    }
  });
};

module.exports = userCntrl;
