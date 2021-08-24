// 'use strict';
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["application/pdf", "application/docx"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    return res.status(400).json({
      msg: "Only pdf, docx and image file formats are allowed!",
    });
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
