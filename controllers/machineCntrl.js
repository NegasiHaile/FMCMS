const Machines = require("../models/machineModel");
const clientBusinesses = require("../models/clientBusinessModel");
const Sales = require("../models/salesModel");
const returnmachines = require("../models/returnMachineModel");

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
      res.json(await Machines.find());
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
      await Machines.findOneAndUpdate(
        { _id: req.params.id },
        ({ serialNumber, machineModel, brand, price, branch, problemStatus } =
          req.body)
      );
      res.json({ msg: "Machine has been edited successfully!" });
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

  distributMachine: async (req, res) => {
    try {
      const { machineId, businessId, branch, status } = req.body;

      const business = await clientBusinesses.findOne({ _id: businessId });

      if (business.credentials === "Pending")
        return res.status(400).json({
          msg: "The credentials of this document is not accepted yet!",
        });

      const request = await Sales.findOne({ machineId: machineId });

      if (request && request.status == 0) {
        await Sales.findOneAndUpdate(
          { _id: machineId },
          {
            status: 1,
          }
        );

        await Machines.findOneAndUpdate(
          { _id: machineId },
          {
            salesStatus: "sold",
          }
        );

        await clientBusinesses.findOneAndUpdate(
          { _id: businessId },
          {
            machine: "assigned",
          }
        );
        res.json({ msg: "Machine has been distributed successfully!" });
      } else {
        const newSales = new Sales({
          branchId: branch,
          machineId: machineId,
          businessId,
          status: "confirmed",
        });

        await newSales.save();

        await Machines.findOneAndUpdate(
          { _id: machineId },
          {
            salesStatus: "sold",
          }
        );

        await clientBusinesses.findOneAndUpdate(
          { _id: businessId },
          {
            machine: "assigned",
          }
        );

        res.json({ msg: "Machine has been distributed successfully!" });
      }
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

  returnMachinesList: async (req, res) => {
    try {
      const allReturns = await returnmachines.aggregate([
        {
          $lookup: {
            from: "sales",
            localField: "salesId",
            foreignField: "_id",
            as: "sales",
          },
        },
      ]);
      var data = [];
      allReturns.forEach((returning) => {
        data.push({
          id: returning._id,
          returnReason: returning.returnReason,
          acceptanceFile: returning.acceptanceFile,
          status: returning.status,
          salesId: returning.sales[0]._id,
          branchId: returning.sales[0].branchId,
          machineId: returning.sales[0].machineId,
          businessId: returning.sales[0].businessId,
        });
        // console.log("Inner " + JSON.stringify(data));
      });
      res.json(data);
      console.log(JSON.stringify(data));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = machineCntrl;
