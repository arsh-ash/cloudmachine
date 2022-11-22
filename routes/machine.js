const express = require("express");
const router = express.Router();
const machineController = require("../controllers/machine_controller");

router.post("/create-machine", machineController.createmachine);
router.get("/getAllMachines", machineController.getAllMachines);
router.get(
  "/getSinglelMachine/:machineId",
  machineController.getSinglelMachine
);
router.put(
  "/editMachine/:machineId",
  machineController.editMachine
);
router.delete("/deleteMachine/:id", machineController.deleteMachines);
router.delete("/deleteMultiple", machineController.deleteMultiple);

module.exports = router;
