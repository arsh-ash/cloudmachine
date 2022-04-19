const express = require("express");
const router = express.Router();
const stepsController = require("../controllers/steps_controller");

router.post("/createSteps/:machineId", stepsController.createsteps);
router.post("/checkAns/:stepId", stepsController.checkAns);
router.get("/getSteps/:machineId", stepsController.getSteps);

module.exports = router;
