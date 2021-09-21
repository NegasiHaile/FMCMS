const router = require("express").Router();
const machineCntrl = require("../controllers/machineCntrl");
const auth = require("../middleware/auth");

router.post("/register", machineCntrl.register);

router.get("/list", machineCntrl.getMachines);

router.get("/detail/:id", machineCntrl.getMachineDetail);

router.put("/edit/:id", machineCntrl.editMachine); // if it's not distributed yet

router.delete("/delete/:id", machineCntrl.deleteMachine); // if it's not distributed yet

router.post("/distribution", machineCntrl.machineDistribution);

router.post("/distribute", machineCntrl.distributMachine);
router.put("/undistribute/:machineId", machineCntrl.undistributMachine);

router.put("/assigne_mrc/:id", machineCntrl.assineMRC);
router.put("/assigne_sim/:id", machineCntrl.assineSIM);

router.get("/inRequest_machines", machineCntrl.allMachinesInRequest);
router.get("/sold_machines", machineCntrl.allSoldMachines);
router.get("/unsold_machines", machineCntrl.allUnsoldMachines);

module.exports = router;
