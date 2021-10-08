const Pricings = require("../models/pricingModel");

const pricingCntrl = {
  registerPrcing: async (req, res) => {
    try {
      const newPeicing = new Pricings(
        ({ pricingName, price, type } = req.body)
      );

      const checkPricingName = await Pricings.findOne({
        pricingName: pricingName,
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
      await Pricings.findOneAndUpdate(
        { _id: req.params.id },
        ({ pricingName, price, type } = req.body)
      );
      res.json({ msg: "Pricing is edited successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = pricingCntrl;
