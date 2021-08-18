const Tickets = require("../models/ticketModel");
const Maintenances = require("../models/maintenanceModel");

const maintenanceCntrl = {
  openNewThicket: async (req, res) => {
    try {
      res.json({ msg: "Thicket opened successfully!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getThickets: async (req, res) => {
    try {
      res.json("done!");
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  editThicket: async (req, res) => {
    try {
      res.json({ msg: "Thicket edited successfully!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteThicket: async (req, res) => {
    try {
      res.json({ msg: "Thicket has been deleted successfully!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  startMaintenance: async (req, res) => {
    try {
      res.json({ msg: "Maintenance started successfuly!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateMaintenance: async (req, res) => {
    try {
      res.json({ msg: "updated successfuly!" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = maintenanceCntrl;
