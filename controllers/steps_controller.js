const Steps = require("../models/steps");

// Create Steps
module.exports.createsteps = async function (req, res) {
  try {
    req.body.machine = req.params.machineId;
    let steps = await Steps.create(req.body);
    return res.status(200).json({
      message: "Steps created successfully",
      data: steps,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: error,
      success: false,
    });
  }
};

//@desc    Get individual machine steps
//@route   GET /machine/steps/:stepId
//@access  Public

exports.getSteps = async (req, res, next) => {
  const steps = await Steps.find({ machine: req.params.machineId }).populate({
    path: "Machine",
    select: "name description",
  });

  if (!steps) {
    return next(
      new ErrorResponse(`No steps with id of ${req.params.machineId}`),
      404
    );
  }
  res.status(200).json({
    success: true,
    total: steps.length,
    data: steps,
  });
};
