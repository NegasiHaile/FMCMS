const MRCs = require("../models/mrcModel");

const salesCntrl = {
  registerMRCs: async (req, res) => {
    try {
      const newMRC = new MRCs(({ MRC } = req.body));

      if (MRC.length == 10) {
        const mrc = await MRCs.findOne({ MRC: MRC });

        if (mrc)
          return res.status(400).json({
            msg: "You are trying to duplicate this MRC!",
          });

        await newMRC.save();
        res.json({ msg: "MRC has been added successfully!" });
      } else {
        res.status(400).json({
          msg: "The MRC length is not correct. please legthen it to 10 character!",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getMRCs: async (req, res) => {
    try {
      res.json(await MRCs.find().sort({ createdAt: -1 }));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteMRC: async (req, res) => {
    try {
      await MRCs.findByIdAndDelete(req.params.id);
      res.json({ msg: "MRC has been deleted successfully!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = salesCntrl;
