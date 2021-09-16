const router = require("express").Router();
const maintenanceCntrl = require("../controllers/maintenanceCntrl");
const auth = require("../middleware/auth");

// router.post("/register", upload.single("file"), userCntrl.register);

router.get("/list", maintenanceCntrl.getMaintenanceList);

module.exports = router;
