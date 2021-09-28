const Sales = require("../models/salesModel");
const machines = require("../models/machineModel");
const clientBusinesses = require("../models/clientBusinessModel");
const branchs = require("../models/branchModel");

const salesCntrl = {
  getSales: async (req, res) => {
    try {
      const allSales = await Sales.aggregate([
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
      allSales.forEach((sale) => {
        data.push({
          saleId: sale._id,
          branchId: sale.branchId,
          branchName: sale.branch[0].branchName,
          machineId: sale.machine[0]._id,
          machineSerialNumber: sale.machine[0].serialNumber,
          machineModel: sale.machine[0].machineModel,
          machineBrand: sale.machine[0].brand,
          machineMRC: sale.machine[0].MRC,
          machineSIM: sale.machine[0].SIM,
          machinePrice: sale.machine[0].price,
          fiscalizationTimes: sale.machine[0].fiscalizationTimes,
          businessId: sale.business[0]._id,
          tradeName: sale.business[0].tradeName,
          companyName: sale.business[0].companyName,
          TIN: sale.business[0].TIN,
          VAT: sale.business[0].VAT,
          telephone: sale.business[0].telephone,
          fiscalization: sale.fiscalization,
          status: sale.status,
          createdAt: sale.createdAt,
        });
        // console.log("Inner " + JSON.stringify(data));
      });
      // console.log("Outer " + JSON.stringify(data));
      res.json(data);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  requestForApproval: async (req, res) => {
    try {
      const businessId = req.params.businessId;

      const newPurchasesOfBusiness = await Sales.find({
        $and: [{ businessId: businessId }, { status: "New" }],
      });

      const business = await clientBusinesses.findById(businessId);

      if (newPurchasesOfBusiness.length > 0) {
        if (business.credentials === "New") {
          await clientBusinesses.findOneAndUpdate(
            { _id: businessId },
            {
              credentials: "pending",
            }
          );
          updateSalesStatusToUnapproved(newPurchasesOfBusiness);
          res.json({
            msg: "Wait for operational departiment approvement!!",
          });
        } else {
          updateSalesStatusToUnapproved(newPurchasesOfBusiness);
          res.json({
            msg: "Wait for operational departiment approvement!!",
          });
        }
      } else {
        return res.status(400).json({
          msg: "There is no new sale to request within this business!",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  cancelUnapproveSale: async (req, res) => {
    try {
      const salesDetail = await Sales.findById(req.params.salesId);

      const numberOfSalesOfThisBusiness = await Sales.find({
        businessId: salesDetail.businessId,
      });

      await machines.findOneAndUpdate(
        { _id: salesDetail.machineId },
        {
          salesStatus: "unsold",
        }
      );

      if (numberOfSalesOfThisBusiness.length == 1) {
        await clientBusinesses.findOneAndUpdate(
          { _id: salesDetail.businessId },
          {
            machine: "unassigned",
            credentials: "New",
          }
        );
      }

      await Sales.findByIdAndDelete(req.params.salesId);

      res.json({
        msg: "Sales has been canceled successfully!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  ApproveSalesRequest: async (req, res) => {
    try {
      await Sales.findOneAndUpdate(
        { _id: req.params.salesId },
        {
          status: "instore",
        }
      );
      await machines.findOneAndUpdate(
        { _id: req.params.machineId },
        {
          salesStatus: "sold",
        }
      );
      await clientBusinesses.findOneAndUpdate(
        { _id: req.params.businessId },
        {
          credentials: "Accepted",
        }
      );
      res.json({
        msg: "This sales request is successfully apprived, it is sent to the store issue!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  requestForFiscalization: async (req, res) => {
    try {
      const machine = await machines.findById({ _id: req.params.machineId });

      if (machine.MRC === "none")
        return res.status(400).json({
          msg: "The machine haven't MRC, Please assigne it first!",
        });

      if (machine.SIM === "0" || machine.SIM === "")
        return res.status(400).json({
          msg: "The machine haven't SIM card number, Please assigne it first!",
        });

      await Sales.findOneAndUpdate(
        { _id: req.params.salesId },
        {
          status: "fiscalization",
          fiscalization: "ready",
        }
      );

      res.json({
        msg: "This sales is successfully sent for fiscalization!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  fiscalizeAndSendForControlling: async (req, res) => {
    try {
      const machine = await machines.findById({ _id: req.params.machineId });

      await machines.findOneAndUpdate(
        { _id: req.params.machineId },
        {
          fiscalizationTimes: machine.fiscalizationTimes + 1,
        }
      );
      await Sales.findOneAndUpdate(
        { _id: req.params.salesId },
        {
          status: "controlling",
          fiscalization: "done",
        }
      );

      return res.json({
        msg: "The machine is requested for controlling.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  completingSalesDelivery: async (req, res) => {
    try {
      await Sales.findOneAndUpdate(
        { _id: req.params.salesId },
        {
          status: "completed",
        }
      );

      return res.json({
        msg: "Sales status changed to completed.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
const updateSalesStatusToUnapproved = async (newPurchasesOfBusiness) => {
  newPurchasesOfBusiness.forEach(async (purchase) => {
    await Sales.findOneAndUpdate(
      { _id: purchase._id },
      {
        status: "unapproved",
      }
    );
  });
};

module.exports = salesCntrl;
