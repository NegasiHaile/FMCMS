const router = require("express").Router();
const upload = require("../middleware/imageUpload");
const clientBusinessCntrl = require("../controllers/clientBusinessCntrl");

router.post(
  "/register",
  upload.single("TL_Image"),
  clientBusinessCntrl.register
);
// router.post('/register', clientBusinessCntrl.register)

router.get("/list", clientBusinessCntrl.getAllBusinesses);

router.get("/list_perowner/:ownerId", clientBusinessCntrl.getBusinesesPerOwner);

router.put(
  "/edit/:businessId",
  upload.single("TL_Image"),
  clientBusinessCntrl.eidtBusinesDetail
);
router.delete("/delete/:businessId", clientBusinessCntrl.deleteBusiness);

router.put(
  "/assign_sw_technician/:businessId",
  clientBusinessCntrl.assignSoftwareTech
);
router.put(
  "/assign_hw_technician/:businessId",
  clientBusinessCntrl.assignHardwareTech
);

router.post("/requesting/:machineId", clientBusinessCntrl.requestMachine);

router.post(
  "/return_machine_request",
  upload.single("acceptanceFile"),
  clientBusinessCntrl.returnMachineRequest
);

router.put("/accepte/:businessId", clientBusinessCntrl.acceptCredentials);
router.put("/reject/:businessId", clientBusinessCntrl.rejectCredentials);

module.exports = router;
