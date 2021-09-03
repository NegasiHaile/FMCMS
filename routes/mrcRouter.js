const router = require("express").Router();
const mrcCntrl = require("../controllers/mrcCntrl");
const auth = require("../middleware/auth");

// router.post("/register", upload.single("file"), userCntrl.register);
router.post("/register", mrcCntrl.registerMRCs);
router.get("/list", mrcCntrl.getMRCs);
router.delete("/delete/:id", mrcCntrl.deleteMRC);

// router.put("/request_for_approval/:businessId", mrcCntrl.requestForApproval);

module.exports = router;
