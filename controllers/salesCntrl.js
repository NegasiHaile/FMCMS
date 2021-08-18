const Sales = require("../models/salesModel");
const Machines = require("../models/machineModel");
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
        });
        // console.log("Inner " + JSON.stringify(data));
      });
      res.json(data);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = salesCntrl;
