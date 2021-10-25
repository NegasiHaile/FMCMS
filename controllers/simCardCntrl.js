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
  deleteSIMCard: async (req, res) => {
    try {
      await simcards.findByIdAndDelete(req.params.id);
      res.json({ msg: "SIM card has been successfuly deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  editSIMCard: async (req, res) => {
    try {
      await simcards.findOneAndUpdate(
        { _id: req.params.id },
        ({ simNumber, branch, problemStatus } = req.body)
      );
      res.json({
        msg: "SIM card has been successfuly edited!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  simCardDistribution: async (req, res) => {
    try {
      const unditributedSIMCards = await simcards
        .find({
          branch: "none",
          problemStatus: "fine",
        })
        .limit(Number(req.body.quantity));
      if (req.body.quantity <= unditributedSIMCards.length) {
        await simcards.updateMany(
          { _id: { $in: unditributedSIMCards } },
          { branch: req.body.branchId }
        );
        res.json({
          msg: "SIM card has been successfuly distibuted!",
        });
      } else {
        return res.status(400).json({
          msg: "Insufficient stock, Add more SIM cards",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = simCardCntrl;
