const express = require("express");
const router = express.Router();
const machineController = require("../controllers/machine_controller");

router.post("/create-machine", machineController.createmachine);
router.get("/getAllMachines", machineController.getAllMachines);
router.get(
  "/getSinglelMachine/:machineId",
  machineController.getSinglelMachine
);
router.delete("/deleteMachine/:id", machineController.deleteMachines);

module.exports = router;
