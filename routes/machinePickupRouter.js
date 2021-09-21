const router = require("express").Router();
const machinePickupCntrl = require("../controllers/machinePickupCntrl");
const auth = require("../middleware/auth");

router.post("/machine", machinePickupCntrl.addPickup);
router.get("/list", machinePickupCntrl.getList);
router.delete("/delete/:id", machinePickupCntrl.deletePickup);
router.put("/edit/:id", machinePickupCntrl.eidtPickup);

module.exports = router;
