const express = require("express");
const router = express.Router();
const passport = require("passport");
const stepsController = require("../controllers/steps_controller");

router.post("/createSteps/:machineId", stepsController.createsteps);
router.post("/checkAns/:stepId", stepsController.checkAns);
// router.get("/getSteps/:machineId", stepsController.getSteps);
router.get("/getSteps/:machineId",
    passport.authenticate("jwt", { session: false }),
    stepsController.getSteps
);
router.put("/editSteps/:machineId", stepsController.editStep);

module.exports = router;
