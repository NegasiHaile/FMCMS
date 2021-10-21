const router = require("express").Router();
const simCardCntrl = require("../controllers/simCardCntrl");

router.get("/list", simCardCntrl.addSIMCard);

module.exports = router;
