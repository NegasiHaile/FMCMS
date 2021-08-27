const router = require("express").Router();
const salesCntrl = require("../controllers/salesCntrl");
const auth = require("../middleware/auth");

// router.post("/register", upload.single("file"), userCntrl.register);

router.get("/list", salesCntrl.getSales);

router.put("/request_for_approval/:businessId", salesCntrl.requestForApproval);

router.put("/cancel_unapprove_sale/:salesId", salesCntrl.cancelUnapproveSale);

module.exports = router;
