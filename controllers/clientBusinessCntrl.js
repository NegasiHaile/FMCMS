const clientBusinesses = require("../models/clientBusinessModel");
const Machines = require("../models/machineModel");
const Sales = require("../models/salesModel");
const ReturnMachines = require("../models/returnMachineModel");
const Notifications = require("../models/notificationModel");
const path = require("path");
const fs = require("fs");

const clientBusinessCntrl = {
  register: async (req, res) => {
    try {
      if (req.file) {
        const {
          ownerID,
          TIN,
          VAT,
          companyName,
          tradeName,
          TL_Image,
          city,
          subCity,
          kebele,
          woreda,
          buildingName,
          officeNumber,
          telephone,
          email,
          fax,
          branch,
          credentials,
          sw_Tech,
        } = req.body;

        const business = await clientBusinesses.findOne({ TIN });

        if (business)
          return res.status(400).json({
            msg: "There is a business with this TIN, please check the TIN!",
          });

        const newBusiness = new clientBusinesses({
          ownerID,
          TIN,
          VAT,
          companyName,
          tradeName,
          TL_Image: "/uploads/" + req.file.filename,
          city,
          subCity,
          kebele,
          woreda,
          buildingName,
          officeNumber,
          telephone,
          email,
          fax,
          branch,
          credentials,
          sw_Tech,
        });

        await newBusiness.save();
        res.json({ msg: "Business detail registered successfully!" });
      } else {
        return res.status(400).json({
          msg: "The business cetificate is required, please upload it!",
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllBusinesses: async (req, res) => {
    // this fetchs all the businesses in the collection
    try {
      res.json(await clientBusinesses.find());
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteBusiness: async (req, res) => {
    // delete a business only if it is not assigned a machine yet
    try {
      const bsnss = await clientBusinesses.findById(req.params.businessId);
      if (bsnss.machine !== "assigned") {
        const pathToFile = "./client/public/" + bsnss.TL_Image;
        fs.unlink(pathToFile, async (err) => {
          if (err) {
            throw err;
          } else {
            await clientBusinesses.findByIdAndDelete(req.params.businessId);
            return res.json({
              msg: "Business detail has been deleted succesfully!",
            });
          }
        });
      } else {
        return res.status(400).json({
          msg: "This business have assigned a machine, It holds a neccesary data, so you can't delete it!",
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  eidtBusinesDetail: async (req, res) => {
    // edit detail if if the owner have not submit valid credintals
    try {
      var bsnsEditDetail = ({
        ownerID,
        TIN,
        companyName,
        tradeName,
        TL_Image,
        city,
        subCity,
        kebele,
        woreda,
        buildingName,
        officeNumber,
        telephone,
        email,
        fax,
        branch,
        sw_Tech,
      } = req.body);
      const bsnss = await clientBusinesses.findById(req.params.businessId);
      if (bsnss.credentials === "Rejected") {
        bsnsEditDetail.credentials = "Pending";
      }
      if (req.file) {
        const oldFilePath = "./client/public/" + bsnss.TL_Image;
        fs.unlink(oldFilePath, async (err) => {
          if (err) {
            throw err;
          } else {
            bsnsEditDetail.TL_Image = `/uploads/${req.file.filename}`;
            await clientBusinesses.findOneAndUpdate(
              { _id: req.params.businessId },
              bsnsEditDetail
            );
            return res.json({
              msg: "Business datail has been edited successfuly!",
            });
          }
        });
      } else {
        await clientBusinesses.findOneAndUpdate(
          { _id: req.params.businessId },
          bsnsEditDetail
        );
        return res.json({
          msg: "Business datail has been edited successfuly!",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  acceptCredentials: async (req, res) => {
    try {
      await clientBusinesses.findOneAndUpdate(
        { _id: req.params.businessId },
        { credentials: "Accepted" }
      );
      res.json({
        msg: "Business credentials accepted successfuly, know you can assigne it a machine and a technicians!",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  rejectCredentials: async (req, res) => {
    try {
      const newNotifications = new Notifications(
        ({ senderId, receiverId, subject, theMessage } = req.body)
      );
      await clientBusinesses.findOneAndUpdate(
        { _id: req.params.businessId },
        { credentials: "Rejected" }
      );
      await newNotifications.save();
      res.json({
        msg: "Request has been rejected successfuly!",
      });
    } catch (error) {}
  },
  getBusinesesPerOwner: async (req, res) => {
    // this fetchs all the businesses of an owner
    try {
      res.json({
        msg: await clientBusinesses.find({ ownerID: req.params.ownerId }),
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  assignSoftwareTech: async (req, res) => {
    // fetch the detail of a single business
    try {
      await clientBusinesses.findOneAndUpdate(
        { _id: req.params.businessId },
        ({ sw_Tech } = req.body)
      );
      res.json({ msg: "Business has been assigned a software technician!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  assignHardwareTech: async (req, res) => {
    // fetch the detail of a single business
    try {
      await clientBusinesses.findOneAndUpdate(
        { _id: req.params.businessId },
        ({ hw_Tech } = req.body)
      );
      res.json({ msg: "Business has been assigned a hardware technician!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  requestMachine: async (req, res) => {
    try {
      const { machineId, businessId, status } = req.body;
      const newrequest = new Sales({
        machineId: req.params.machineId,
        businessId,
        status: 0,
      });

      const busibess = await clientBusinesses.findOne({ _id: businessId });

      if (busibess.credentials === "Pending")
        return res.json({
          msg: "The credentials of this document is not accepted yet!",
        });

      await newrequest.save();

      await Machines.findOneAndUpdate(
        { _id: req.params.machineId },
        {
          salesStatus: "requested",
        }
      );

      await clientBusinesses.findOneAndUpdate(
        { _id: businessId },
        {
          machine: "inRequest",
        }
      );
      res.json({ msg: "Machine has been requested successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  returnMachineRequest: async (req, res) => {
    try {
      const { salesId, returnReason, acceptanceFile } = req.body;
      const newReturnMachine = new ReturnMachines({
        salesId,
        returnReason,
        acceptanceFile: "/uploads/" + req.file.filename,
      });
      console.log(salesId + " " + returnReason + " " + acceptanceFile);
      await newReturnMachine.save();
      res.json({ msg: "Request has been sent successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = clientBusinessCntrl;
