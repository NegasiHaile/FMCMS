const router = require("express").Router();
const branchsCntrl = require("../controllers/branchCntrl");

router.post("/open_new", branchsCntrl.openNewBranch); // creating a branch of jupiter
router.get("/list", branchsCntrl.getBranchs); // get list of branchs
router.get("/detail/:branchId", branchsCntrl.getBranchDetail);

router.put("/edit/:branchId", branchsCntrl.editBranchDetail);

router.delete("/delete/:branchId", branchsCntrl.deleteBranch); // delete a branch only if it is empty

router.get(
  "/employees_per_branch/:branchId",
  branchsCntrl.getEmployeePerBranch
);
router.get("/machines_per_branch/:branchId", branchsCntrl.getMachinesPerBranch);
router.get(
  "/businesses_per_branch/:branchId",
  branchsCntrl.getbusinessesPerBranch
);
router.get("/sales_per_branch/:branchId", branchsCntrl.salesPerbranch);

module.exports = router;
