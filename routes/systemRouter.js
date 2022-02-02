const router = require("express").Router();
const systemSettingCntrl = require("../controllers/systemSettingCntrl");

router.post("/add_sender_email", systemSettingCntrl.addEmailSender);
router.get("/fetch_sender_email", systemSettingCntrl.fetchEmailSenders);
router.delete("/delete_sender_email/:id", systemSettingCntrl.deleteEmailSender);
router.put(
  "/email_verification/:verificationToken",
  systemSettingCntrl.verifySenderEmail
);
router.put(
  "/make_primary_sender_email/:id",
  systemSettingCntrl.makePrimaryEmailSender
);
router.put(
  "/edit_sender_email_password",
  systemSettingCntrl.editSenderEmailPassword
);

module.exports = router;
