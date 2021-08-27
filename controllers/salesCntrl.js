const Sales = require("../models/salesModel");
const machines = require("../models/machineModel");
const clientBusinesses = require("../models/clientBusinessModel");

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
      ]);
      var data = [];
      allSales.forEach((sale) => {
        data.push({
          saleId: sale._id,
          branchId: sale.branchId,
          machineId: sale.machine[0]._id,
          machineSerialNumber: sale.machine[0].serialNumber,
          machinePrice: sale.machine[0].price,
          businessId: sale.business[0]._id,
          tradeName: sale.business[0].tradeName,
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
            msg: "The transaction is successfuly sent for approval, wait for operational departiment to approve it!",
          });
        } else {
          updateSalesStatusToUnapproved(newPurchasesOfBusiness);
          res.json({
            msg: "The transaction is successfuly sent for approval, wait for operational departiment to approve it!",
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

      if (numberOfSalesOfThisBusiness.length == 1) {
        await clientBusinesses.findOneAndUpdate(
          { _id: salesDetail.businessId },
          {
            machine: "unassigned",
          }
        );
      }
      await machines.findOneAndUpdate(
        { _id: salesDetail.machineId },
        {
          salesStatus: "unsold",
        }
      );

      await Sales.findByIdAndDelete(req.params.salesId);

      res.json({
        msg: "Sales has been canceled successfully!",
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
