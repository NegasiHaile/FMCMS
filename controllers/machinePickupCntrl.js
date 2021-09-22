const MachinePickups = require("../models/machinePickupModel");
const Sales = require("../models/salesModel");
const machines = require("../models/machineModel");
const clientBusinesses = require("../models/clientBusinessModel");
const branchs = require("../models/branchModel");

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
          machineMaterial,
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

      await newPickup.save();
      res.json({ msg: "Machine pickedup successfuly!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getList: async (req, res) => {
    try {
      const allPickups = await MachinePickups.aggregate([
        {
          $lookup: {
            from: "machines",
            localField: "machineId",
            foreignField: "_id",
            as: "machine",
          },
        },
        {
          $lookup: {
            from: "clientbusinesses",
            localField: "businessId",
            foreignField: "_id",
            as: "business",
          },
        },
        {
          $lookup: {
            from: "branchs",
            localField: "branchId",
            foreignField: "_id",
            as: "branch",
          },
        },
        {
          $match: {
            "machine._id": {
              $exists: true,
            },
            "business._id": {
              $exists: true,
            },
          },
        },
      ]).sort({ updatedAt: -1 });

      var data = [];
      allPickups.forEach((pickup) => {
        data.push({
          _id: pickup._id,
          branchId: pickup.branchId,
          branchName: pickup.branch[0].branchName,
          salesId: pickup._id,
          machineId: pickup.machine[0]._id,
          serialNumber: pickup.machine[0].serialNumber,
          machineModel: pickup.machine[0].machineModel,
          machineBrand: pickup.machine[0].brand,
          machineMRC: pickup.machine[0].MRC,
          machineSIM: pickup.machine[0].SIM,
          machinePrice: pickup.machine[0].price,
          businessId: pickup.business[0]._id,
          tradeName: pickup.business[0].tradeName,
          companyName: pickup.business[0].companyName,
          TIN: pickup.business[0].TIN,
          VAT: pickup.business[0].VAT,
          telephone: pickup.business[0].telephone,
          status: pickup.status,
          createdAt: pickup.createdAt,

          memoryKey: pickup.memoryKey,
          drawer: pickup.drawer,
          paper: pickup.paper,
          terminal: pickup.terminal,
          terminalAdapte: pickup.terminalAdapte,
          machineMaterial: pickup.machineMaterial,
          SBookTerminal: pickup.SBookTerminal,
          SbookMachine: pickup.SbookMachine,
          paperRoller: pickup.paperRoller,
          paperCover: pickup.paperCover,
          machineAdapter: pickup.machineAdapter,
          FDForm: pickup.FDForm,
          sealNumber: pickup.sealNumber,
          MRCNumber: pickup.MRCNumber,
          category: pickup.category,
          subCategory: pickup.subCategory,
          clientReportedProblems: pickup.clientReportedProblems,
          TechnicianReportedProblems: pickup.TechnicianReportedProblems,
          returnReason: pickup.returnReason,
          returnCertificate: pickup.returnCertificate,
          waitingDuration: pickup.waitingDuration,
          waitingCostPerMonth: pickup.waitingCostPerMonth,
          pickedupBy: pickup.pickedupBy,
        });
      });
      // console.log("Outer " + JSON.stringify(data));
      res.json(data);
      // console.log(JSON.stringify(allPickups));
      // res.json(allPickups);
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
          machineMaterial,
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
