const router = require("express").Router();
const salesCntrl = require("../controllers/maintenanceCntrl");
const auth = require("../middleware/auth");

// router.post("/register", upload.single("file"), userCntrl.register);

router.get("/open_thicket", salesCntrl.openNewThicket);

module.exports = router;
