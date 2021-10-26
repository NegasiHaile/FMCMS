const Machines = require("../models/machineModel");
const clientBusinesses = require("../models/clientBusinessModel");
const Sales = require("../models/salesModel");
const MRCs = require("../models/mrcModel");
const simcards = require("../models/simCardModel");

const machineCntrl = {
  register: async (req, res) => {
    try {
      const newMachine = new Machines(
        ({
          serialNumber,
          machineModel,
          brand,
          price,
          branch,
          salesStatus,
          problemStatus,
        } = req.body)
      );

      const machine = await Machines.findOne({ serialNumber: serialNumber });

      if (machine)
        return res.status(400).json({ msg: "Serial number is token!" });

      await newMachine.save();
      res.json({ msg: "Machine has been successfuly registered" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getMachines: async (req, res) => {
    try {
      res.json(await Machines.find({}).sort({ createdAt: -1 }));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getMachineDetail: async (req, res) => {
    try {
      res.json({ msg: await Machines.findById({ _id: req.params.id }) });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  editMachine: async (req, res) => {
    try {
      var machineAvailableIn = "";
      if (req.body.branch !== "none") {
        machineAvailableIn = "branch-store";
      } else {
        machineAvailableIn = "main-store";
      }
      const {
        serialNumber,
        machineModel,
        brand,
        price,
        branch,
        problemStatus,
      } = req.body;
      await Machines.findOneAndUpdate(
        { _id: req.params.id },
        {
          serialNumber,
          machineModel,
          brand,
          price,
          branch,
          problemStatus,
          availableIn: machineAvailableIn,
        }
      );

      res.json({
        msg: "Machine has been edited successfully! ",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteMachine: async (req, res) => {
    try {
      // sold(distributed) machine haven't to delete
      await Machines.findByIdAndDelete(req.params.id);
      res.json({ msg: "Machine has been deleted successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  machineDistribution: async (req, res) => {
    try {
      const machinsOfSpesficBrand = await Machines.find({
        $and: [{ brand: req.body.brand }, { branch: "none" }],
      });

      if (machinsOfSpesficBrand.length >= Number(req.body.quantity)) {
        const ids = await Machines.find({
          brand: req.body.brand,
          branch: "none",
        }).limit(Number(req.body.quantity));
        await Machines.updateMany(
          { _id: { $in: ids } },
          { branch: req.body.branchId } //, availableIn: "branch-store" }
        );
        res.json({
          msg:
            req.body.quantity +
            " Machines of " +
            req.body.brand +
            " brand have been successfully distributed to the branch!",
        });
        // res.json({ msg: machinsOfSpesficBrand.length });
      } else {
        return res.status(400).json({
          msg:
            "You have only " +
            machinsOfSpesficBrand.length +
            " undistributed machines with " +
            req.body.brand +
            " brand but you are requesting " +
            req.body.quantity +
            "  please add more machines first!",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  distributMachine: async (req, res) => {
    try {
      // const { branch, businessId, machineId, status } = req.body;

      // const business = await clientBusinesses.findOne({ _id: businessId });

      // if (business.machine === "unassigned")
      //   return res.status(400).json({
      //     msg: "Please Assigne machine to the business!",
      //   });

      //   await Sales.findOneAndUpdate(
      //     { _id: machineId },
      //     {
      //       status: 1,
      //     }
      //   );

      //   await Machines.findOneAndUpdate(
      //     { _id: machineId },
      //     {
      //       salesStatus: "sold",
      //     }
      //   );

      //   await clientBusinesses.findOneAndUpdate(
      //     { _id: businessId },
      //     {
      //       machine: "assigned",
      //     }
      //   );
      //   res.json({ msg: "Machine has been distributed successfully!" });
      // }
      // else {

      const newSales = new Sales(
        ({ branch, businessId, machineId, status } = req.body)
      );

      await newSales.save();

      await Machines.findOneAndUpdate(
        { _id: machineId },
        {
          salesStatus: "requested",
        }
      );

      await clientBusinesses.findOneAndUpdate(
        { _id: businessId },
        {
          machine: "assigned",
        }
      );

      res.json({
        msg: "Machine has been assined to the business successfully!",
      });
      // }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  undistributMachine: async (req, res) => {
    try {
      const sale = await Sales.findOne({ machineId: req.params.machineId });

      await Machines.findOneAndUpdate(
        { _id: req.params.machineId },
        {
          salesStatus: "unsold",
        }
      );

      await clientBusinesses.findOneAndUpdate(
        { _id: sale.businessId },
        {
          machine: "unassigned",
        }
      );

      res.json({ msg: "Machine undistributed successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  allMachinesInRequest: async (req, res) => {
    try {
      res.json(await Machines.find({ salesStatus: "requested" }));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  allSoldMachines: async (req, res) => {
    try {
      res.json(await Machines.find({ salesStatus: "sold" }));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  allUnsoldMachines: async (req, res) => {
    try {
      res.json(await Machines.find({ salesStatus: "unsold" }));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  assineMRC: async (req, res) => {
    try {
      if (req.params.id) {
        const machineDetail = await Machines.findById({ _id: req.params.id });

        if (machineDetail.MRC !== "none") {
          await MRCs.findOneAndUpdate(
            { _id: machineDetail.MRC },
            { status: "free" }
          );
          await Machines.findOneAndUpdate(
            { _id: req.params.id },
            { MRC: req.body.MRC }
          );
          if (req.body.MRC !== "none") {
            await MRCs.findOneAndUpdate(
              { _id: req.body.MRC },
              { status: "taken" }
            );
          }
          res.json({ msg: "MRC of this machine is updated successfully!!" });
        } else {
          await Machines.findOneAndUpdate(
            { _id: req.params.id },
            { MRC: req.body.MRC }
          );
          if (req.body.MRC !== "none") {
            await MRCs.findOneAndUpdate(
              { _id: req.body.MRC },
              { status: "taken" }
            );
          }
          res.json({ msg: "MRC of this machine is updated successfully!!" });
        }
      } else {
        return res.status(400).json({ msg: "Opration failed!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  assineSIM: async (req, res) => {
    try {
      const machine = await Machines.findById({ _id: req.params.id });
      if (machine) {
        if (machine.SIM != "0") {
          await simcards.findOneAndUpdate(
            { _id: machine.SIM },
            { status: "free" }
          );
          await Machines.findOneAndUpdate(
            { _id: req.params.id },
            { SIM: req.body.SIM }
          );
          if (req.body.SIM != "0") {
            await simcards.findOneAndUpdate(
              { _id: req.body.SIM },
              { status: "taken" }
            );
          }

          res.json({
            msg: "SIM card of this machine is updated successfully!! 1",
          });
        } else {
          await Machines.findOneAndUpdate(
            { _id: req.params.id },
            { SIM: req.body.SIM }
          );
          if (req.body.SIM != "0") {
            await simcards.findOneAndUpdate(
              { _id: req.body.SIM },
              { status: "taken" }
            );
          }

          res.json({
            msg: "SIM card of this machine is updated successfully!! 0",
          });
        }
      } else {
        return res.status(400).json({ msg: "Machine not found!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  approveMachineFromBranchStore: async (req, res) => {
    try {
      if (req.params.id === "all") {
        await Machines.updateMany(
          {
            $and: [
              { branch: req.params.branchId },
              { availableIn: "main-store" },
            ],
          },
          { $set: { availableIn: "branch-store" } }
        );
        res.json({ msg: "All new arival machines approved successfuly!" });
      } else {
        await Machines.findOneAndUpdate(
          { _id: req.params.id },
          { availableIn: "branch-store" }
        );
        res.json({ msg: "Machine approved successfuly!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  machineProblemSolvedInMaintenance: async (req, res) => {
    try {
      await Machines.findOneAndUpdate(
        { _id: req.params.id },
        { problemStatus: "fine" }
      );
      res.json({ msg: "Done!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = machineCntrl;
