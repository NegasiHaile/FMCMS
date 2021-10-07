const Pricings = require("../models/pricingModel");

const pricingCntrl = {
  registerPrcing: async (req, res) => {
    try {
      res.status(400).json({
        msg: "Pricing done!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = pricingCntrl;
