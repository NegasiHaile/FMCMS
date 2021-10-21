const SIMCards = require("../models/simCardModel");

const simCardCntrl = {
  addSIMCard: async (req, res) => {
    res.json({ msg: "SIM card is successfully added!" });
  },
};

module.exports = simCardCntrl;
