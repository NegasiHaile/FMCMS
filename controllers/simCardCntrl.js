const simcards = require("../models/simCardModel");

const simCardCntrl = {
  addSIMCard: async (req, res) => {
    try {
      const newSIMCard = new simcards(
        ({ simNumber, branch, problemStatus } = req.body)
      );

      const simCard = await simcards.findOne({ simNumber: simNumber });

      if (simCard)
        return res
          .status(400)
          .json({ msg: "This number is already registered!" });

      await newSIMCard.save();
      res.json({ msg: "SIM card has been successfuly registered" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getSIMCardsList: async (req, res) => {
    try {
      res.json(await simcards.find({}).sort({ createdAt: -1 }));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = simCardCntrl;
