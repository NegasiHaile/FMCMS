const router = require("express").Router();
const salesCntrl = require("../controllers/salesCntrl");
const auth = require("../middleware/auth");

// router.post("/register", upload.single("file"), userCntrl.register);

router.get("/list", salesCntrl.getSales);

router.put("/request_for_approval/:businessId", salesCntrl.requestForApproval);

router.put("/cancel_unapprove_sale/:salesId", salesCntrl.cancelUnapproveSale);

router.put(
  "/Approve_sales_Request/:salesId/:machineId/:businessId",
  salesCntrl.ApproveSalesRequest
);
router.put(
  "/request_for_fiscalization/:salesId/:machineId",
  salesCntrl.requestForFiscalization
);

router.put(
  "/fiscalization/:salesId/:machineId",
  salesCntrl.fiscalizeAndSendForControlling
);

module.exports = router;
