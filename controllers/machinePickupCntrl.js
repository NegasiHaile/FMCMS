const MachinePickups = require("../models/machinePickupModel");
const Sales = require("../models/salesModel");
const machines = require("../models/machineModel");
const simcards = require("../models/simCardModel");
const clientBusinesses = require("../models/clientBusinessModel");
const branchs = require("../models/branchModel");
const path = require("path");
const fs = require("fs");

const machinePickupCntrl = {
  addPickup: async (req, res) => {
    try {
      const mchn = await machines.findById(req.body.machineId);
      if (mchn.availableIn === "client-hand") {
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
            infoChange,
            issueDate,
            pickedupBy,
          } = req.body)
        );

        await newPickup.save();
        res.json({ msg: "Machine receiving detail saved successfuly!" });
      } else {
        return res.status(400).json({
          msg: "This machine is already instore, you can receive machine in client hand!",
        });
      }
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
          salesId: pickup.salesId,
          machineId: pickup.machine[0]._id,
          serialNumber: pickup.machine[0].serialNumber,
          machineModel: pickup.machine[0].machineModel,
          machineBrand: pickup.machine[0].brand,
          machineMRC: pickup.machine[0].MRC,
          machineSIM: pickup.machine[0].SIM,
          machinePrice: pickup.machine[0].price,
          machineProblemStatus: pickup.machine[0].problemStatus,
          businessId: pickup.business[0]._id,
          tradeName: pickup.business[0].tradeName,
          companyName: pickup.business[0].companyName,
          TIN: pickup.business[0].TIN,
          VAT: pickup.business[0].VAT,
          telephone: pickup.business[0].telephone,
          status: pickup.status,
          createdAt: pickup.createdAt,
          updatedAt: pickup.updatedAt,

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
          technicianReportedProblems: pickup.technicianReportedProblems,
          infoChange: pickup.infoChange,
          returnReason: pickup.returnReason,
          returnCertificate: pickup.returnCertificate,
          issueDate: pickup.issueDate,
          annualNextMaintenanceDate: pickup.annualNextMaintenanceDate,
          waitingDuration: pickup.waitingDuration,
          waitingCostPerMonth: pickup.waitingCostPerMonth,
          pickedupBy: pickup.pickedupBy,
          technician: pickup.technician,
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
        await MachinePickups.findByIdAndDelete(req.params.id);
        res.json({ msg: "Receiving item deleted successfuly!" });
      } else {
        return res
          .status(400)
          .json({ msg: "You can't delete this item, it's already approved!" });
      }
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
          technicianReportedProblems,
          infoChange,
          issueDate,
          pickedupBy,
        } = req.body)
      );
      await MachinePickups.findOneAndUpdate(
        { _id: req.params.id },
        pickupEditingDetail
      );

      res.json({
        msg: "Receiving detail eidited successfuly!",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  addMachine_withdrawal: async (req, res) => {
    if (req.file) {
      const {
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
        returnReason,
        returnCertificate,
        pickedupBy,
      } = req.body;

      const newReturingReceiving = new MachinePickups({
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
        returnReason,
        returnCertificate: "/uploads/" + req.file.filename,
        pickedupBy,
      });

      await newReturingReceiving.save();
      res.json({ msg: "Withdrawal receiving added successfuly!" });
    } else {
      return res.status(400).json({
        msg: "Withdrawal certificate is required!",
      });
    }
  },

  deleteMachine_withdrawal: async (req, res) => {
    try {
      const withdrawalItem = await MachinePickups.findById(req.params.id);
      if (!withdrawalItem)
        return res
          .status(400)
          .json({ msg: "Item not found, please refresh your page!" });

      if (
        withdrawalItem.status === "New" ||
        withdrawalItem.status === "unapproved"
      ) {
        const pathToFile =
          "./client/public/" + withdrawalItem.returnCertificate;
        fs.unlink(pathToFile, async (err) => {
          // if (err) {
          //   return res.status(400).json({
          //     msg: "Erorr in deleting of the pdf file!",
          //   });
          //   // throw err;
          // } else {
          await MachinePickups.findByIdAndDelete(req.params.id);
          return res.json({ msg: "Withdrawal item deleted successfuly!" });
          // }
        });
      } else {
        return res
          .status(400)
          .json({ msg: "You can't delete this item, it's already approved!" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  eidtMachine_withdrawal: async (req, res) => {
    try {
      var withdrawalDetail = ({
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
        returnReason,
        returnCertificate,
        pickedupBy,
      } = req.body);

      const withdrawalItem = await MachinePickups.findById(req.params.id);
      if (!withdrawalItem)
        return res.status(400).json({ msg: "Withdrawal item not found!" });
      if (req.file) {
        const oldFilePath =
          "./client/public/" + withdrawalItem.returnCertificate;
        fs.unlink(oldFilePath, async (err) => {
          // if (err) {
          //   throw err;
          // } else {
          withdrawalDetail.returnCertificate = `/uploads/${req.file.filename}`;
          await MachinePickups.findOneAndUpdate(
            { _id: req.params.id },
            withdrawalDetail
          );
          return res.json({
            msg: "Withdrawal detail eidited successfuly, With the certificate!",
          });
          // }
        });
      } else {
        await MachinePickups.findOneAndUpdate(
          { _id: req.params.id },
          withdrawalDetail
        );
        return res.json({
          msg: "Withdrawal detail eidited successfuly, witout the certificate!",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  maintenanceProcessing: async (req, res) => {
    try {
      const pickupDetail = await MachinePickups.findById(req.body._id);
      const SIM_id = req.body.simCard;
      if (req.body.request === "stored" && req.body.category === "withdrawal") {
        await machines.findOneAndUpdate(
          { _id: req.body.machineId },
          { SIM: "0", salesStatus: "unsold", availableIn: "branch-store" }
        );
        if (SIM_id.length >= 20) {
          await simcards.findOneAndUpdate(
            { _id: SIM_id },
            { status: "discarded" }
          );
        }
        await Sales.findOneAndUpdate(
          { _id: req.body.salesId },
          { status: "canceled" }
        );
        await MachinePickups.findOneAndUpdate(
          { _id: req.body._id },
          { status: "completed" }
        );
      } else if (req.body.request === "maintaining") {
        if (pickupDetail.technician === "") {
          return res.status(400).json({
            msg: "This maintenance hasn't assigned a technician yet, Please contact the customer service to assign!",
          });
        } else {
          await machines.findOneAndUpdate(
            { _id: req.body.machineId },
            { problemStatus: "maintaining" }
          );
          await MachinePickups.findOneAndUpdate(
            { _id: req.body._id },
            { status: req.body.request }
          );
        }
      } else {
        await MachinePickups.findOneAndUpdate(
          { _id: req.body._id },
          { status: req.body.request }
        );
      }

      return res.json({
        msg:
          "Receiving machine has been requested for " + req.body.request + "!",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  assigneTechnician: async (req, res) => {
    try {
      await MachinePickups.findOneAndUpdate(
        { _id: req.params.id },
        { technician: req.body.technicianId }
      );
      return res.json({
        msg: "Technician assigned successfully!",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = machinePickupCntrl;
