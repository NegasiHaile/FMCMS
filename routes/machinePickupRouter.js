const router = require("express").Router();
const machinePickupCntrl = require("../controllers/machinePickupCntrl");
const fileUpload = require("../middleware/fileUpload");
const auth = require("../middleware/auth");

router.post("/machine", machinePickupCntrl.addPickup);
router.get("/list", machinePickupCntrl.getList);
router.delete("/delete/:id", machinePickupCntrl.deletePickup);
router.put("/edit/:id", machinePickupCntrl.eidtPickup);

router.post(
  "/machine_withrawal",
  fileUpload.single("returnCertificate"),
  machinePickupCntrl.addMachine_withdrawal
);
router.delete(
  "/delete_machine_Withdrawal/:id",
  machinePickupCntrl.deleteMachine_withdrawal
);

router.put(
  "/edit_machine_withdrawal/:id",
  fileUpload.single("returnCertificate"),
  machinePickupCntrl.eidtMachine_withdrawal
);
module.exports = router;
