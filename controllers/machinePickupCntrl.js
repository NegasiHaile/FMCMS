const MachinePickups = require("../models/machinePickupModel");

const machinePickupCntrl = {
  addPickup: async (req, res) => {
    try {
      const newPickup = new MachinePickups(
        ({
          branchId,
          salesId,
          businessId,
          machineId,
          memoryKey,
          drawer,
          paper,
          terminal,
          terminalAdapte,
          machine,
          SBookTerminal,
          SbookMachine,
          paperRoller,
          paperCover,
          machineAdapter,
          FDForm,
          sealNumber,
          MRCNumber,
          category,
          subCategory,
          clientReportedProblems,
          TechnicianReportedProblems,
          returnReason,
          returnCertificate,
          waitingDuration,
          waitingCostPerMonth,
          pickedupBy,
        } = req.body)
      );

      // const machine = await Machines.findOne({ serialNumber: serialNumber });

      // if (machine)
      //   return res.status(400).json({ msg: "Serial number is token!" });

      await newPickup.save();
      res.json({ msg: "Machine pickedup successfuly!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getList: async (req, res) => {
    try {
      res.json(await MachinePickups.find().sort({ createdAt: -1 }));
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deletePickup: async (req, res) => {
    try {
      const pickup = await MachinePickups.findById(req.params.id);
      if (!pickup)
        return res
          .status(400)
          .json({ msg: "Item not found, please refresh your page!" });

      if (pickup.status === "New" || pickup.status === "unapproved") {
        await MachinePickups.findOneAndDelete(req.params.id);
        res.json({ msg: "Pickup item deleted successfuly!" });
      }
      return res
        .status(400)
        .json({ msg: "You can't delete this item, it's already approved!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  eidtPickup: async (req, res) => {
    try {
      const pickupEditingDetail = new MachinePickups(
        ({
          branchId,
          salesId,
          businessId,
          machineId,
          memoryKey,
          drawer,
          paper,
          terminal,
          terminalAdapte,
          machine,
          SBookTerminal,
          SbookMachine,
          paperRoller,
          paperCover,
          machineAdapter,
          FDForm,
          sealNumber,
          MRCNumber,
          category,
          subCategory,
          clientReportedProblems,
          TechnicianReportedProblems,
          returnReason,
          returnCertificate,
          waitingDuration,
          waitingCostPerMonth,
          pickedupBy,
        } = req.body)
      );
      await MachinePickups.findOneAndUpdate(
        { _id: req.params.id },
        pickupEditingDetail
      );

      res.json({
        msg: "Pickup detail eidited successfuly!",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = machinePickupCntrl;
