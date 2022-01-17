const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generator = require("generate-password");
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
        photo,
        branch,
        city,
        subCity,
        kebele,
        woreda,
        phoneNumber,
        email,
        userRole,
      } = req.body;

      const newpassword = generatePassword();

      const user = await Users.findOne({ email });

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

      await newUser.save();

      const mailDetail = {
        emailToMail: email,
        passwordToMail: newpassword,
        subject: "Password to your JuPiTeR FMCMS Account",
        text: "Password for your jupiter FMCMS account: ",
      };
      sendMailToUser(mailDetail);

      // Then create jsonwebtoken to authentication
      // const accesstoken = createAccessToken({ id: newUser._id })
      // const refreshtoken = createRefreshToken({ id: newUser._id })

      // res.cookie('refreshtoken', refreshtoken, {
      //     httpOnly: true,
      //     path: '/user/refresh_token',
      // })

      res.json({
        msg: "User has been successfuly registered, and we have sent a password to the email!",
      });
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
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        ({
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
        } = req.body)
      );
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

      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

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
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
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
      res.clearCookie("refreshtoken", { path: "/users/refresh_token" });
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
      const user = await Users.findOne({ email });
      if (!user)
        return res.status(400).json({
          msg: "There is no account with this email, please insert your email correctly!",
        });

      const newPassword = generatePassword();

      await Users.findOneAndUpdate(
        { _id: user.id },
        {
          password: await bcrypt.hash(newPassword, 10),
        }
      );

      const mailDetail = {
        emailToMail: email,
        passwordToMail: newPassword,
        subject: "New passowrd to your JuPiTeR FMCMS Account",
        text: "New Password: ",
      };
      sendMailToUser(mailDetail);

      res.json({
        msg:
          "An email with new password is sent to " +
          email +
          ", Please check your email!",
      });
    } catch (error) {
      res.status(500).json({ meg: error.message });
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

const generatePassword = () => {
  const generatedpassword = generator.generate({
    length: 8,
    numbers: true,
    symbols: false,
    uppercase: false,
  });
  return generatedpassword;
};

const sendMailToUser = (mailDetail) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "negasihaile19@gmail.com",
      pass: "Negasi@DevelopmentEmail", // Thepassword of the mailer
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  console.log(mailDetail);
  var mailOptions = {
    from: "negasihaile19@gmail.com",
    to: mailDetail.emailToMail,
    subject: mailDetail.subject,
    text: mailDetail.text + mailDetail.passwordToMail,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent to: " + mailDetail.emailToMail + info.response);
      res.json({ msg: "User password is sent to his email!!" });
    }
  });
};

module.exports = userCntrl;
