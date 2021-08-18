const router = require("express").Router();
const salesCntrl = require("../controllers/salesCntrl");
const auth = require("../middleware/auth");

// router.post("/register", upload.single("file"), userCntrl.register);

router.get("/list", salesCntrl.getSales);

module.exports = router;
