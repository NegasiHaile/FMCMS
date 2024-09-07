const MRCs = require("../models/mrcModel");

const salesCntrl = {
  registerMRCs: async (req, res) => {
    try {
      const { MRC } = req.body;
      const newMRC = new MRCs({ MRC });

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
  editMRC: async (req, res) => {
    try {
      const { MRC, branch, status } = req.body;
      await MRCs.findOneAndUpdate(
        { _id: req.body._id },
        { MRC, branch, status }
      );
      res.json({
        msg: "MRC has been successfuly edited!",
      });
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
  MRCDistributionByrange: async (req, res) => {
    try {
      await MRCs.updateMany(
        {
          $and: [
            { MRC: { $gte: req.body.startingFrom } },
            { MRC: { $lte: req.body.endTo } },
          ],
        },
        { $set: { branch: req.body.branchId } }
      );
      res.json({
        msg:
          " The MRC of range from " +
          req.body.startingFrom +
          " - " +
          req.body.endTo +
          " is successfully distributed to the branch!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = salesCntrl;
