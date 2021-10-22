const router = require("express").Router();
const simCardCntrl = require("../controllers/simCardCntrl");

router.post("/register", simCardCntrl.addSIMCard);
router.get("/list", simCardCntrl.getSIMCardsList);

module.exports = router;
