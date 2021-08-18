const router = require("express").Router();
const notificationCntrl = require("../controllers/notificationCntrl");

router.get("/list", notificationCntrl.getNotification);
router.put("/edit/:userId", notificationCntrl.editNotification);

module.exports = router;
