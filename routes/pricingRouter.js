const router = require("express").Router();
const pricingCntrl = require("../controllers/pricingCntrl");
const auth = require("../middleware/auth");

// router.post("/register", upload.single("file"), userCntrl.register);
router.post("/register", pricingCntrl.registerPrcing);

// router.put("/request_for_approval/:businessId", mrcCntrl.requestForApproval);

module.exports = router;
