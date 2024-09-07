const Pricings = require("../models/pricingModel");

const pricingCntrl = {
  registerPrcing: async (req, res) => {
    try {
      const payload = req.body;
      const newPeicing = new Pricings({ ...payload });

      const checkPricingName = await Pricings.findOne({
        pricingName: payload.pricingName,
      });

      if (checkPricingName)
        return res
          .status(400)
          .json({ msg: "There is pricing with this name!" });

      await newPeicing.save();
      res.json({ msg: "Pricing is added successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  fetchPricings: async (req, res) => {
    try {
      res.json(await Pricings.find().sort({ createdAt: -1 }));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  editPricing: async (req, res) => {
    try {
      const payload = req.body;
      await Pricings.findOneAndUpdate({ _id: req.params.id }, { ...payload });
      res.json({ msg: "Pricing is edited successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = pricingCntrl;
