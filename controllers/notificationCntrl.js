const Notifications = require("../models/notificationModel");

const notificationCntrl = {
  getNotification: async (req, res) => {
    try {
      res.json(await Notifications.find());
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  editNotification: async (req, res) => {
    try {
      res.json({ msg: "This is the edit notification!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = notificationCntrl;
