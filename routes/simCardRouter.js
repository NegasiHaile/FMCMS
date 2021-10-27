const router = require("express").Router();
const simCardCntrl = require("../controllers/simCardCntrl");

router.post("/register", simCardCntrl.addSIMCard);
router.get("/list", simCardCntrl.getSIMCardsList);
router.delete("/delete/:id", simCardCntrl.deleteSIMCard);
router.put("/edit/:id", simCardCntrl.editSIMCard);
router.put("/distribution", simCardCntrl.simCardDistribution);
router.put(
  "/approve_from_branch_store/:id/:branchId",
  simCardCntrl.approveSIMCardFromTheBranchStore
);
module.exports = router;
