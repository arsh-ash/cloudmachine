const { request } = require("express");
const Steps = require("../models/steps");

// Create Steps
module.exports.createsteps = async function (req, res) {
  try {
    req.body.Machine = req.params.machineId;
    /////////// create array option
    ///// options[{option1,option2,option3,option4}]
    // optionsAns = kdg,dytf,tryrt,rtyt

    if (req.body.options) {
      let temp_options = req.body.options;
      // let temp_optionsAns = req.body.optionsAns.split(',');
      req.body.options = [
        { a: temp_options.a },
        { b: temp_options.b },
        { c: temp_options.c },
        { d: temp_options.d },
      ];
    }

    // req.body.optionsAns = temp_optionsAns
    console.log("req body", req.body);
    console.log("Machine Id", req.body);

    let steps = await Steps.create(req.body);
    console.log("Step created", steps);
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
  console.log("params Id", req.params.machineId);
  const steps = await Steps.find({
    Machine: req.params.machineId,
  }).populate({
    path: "Machine",
    select: "name description",
  });
  // const steps = await Steps.findById(req.params.machineId).populate({
  //   path: "Machine",
  //   select: "name description",
  // });
  console.log("steps", steps);

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

///////////-------
//////// isMCQ = true,stepId, ans , req.body

exports.checkAns = async (req, res, next) => {
  const steps = await Steps.findById(req.params.stepId).select("+answer");

  const isMCQ = req.body.isMcq;
  //   if(isMCQ){
  // if (!steps.optionsAns){

  // }

  if (!steps) {
    return next(new ErrorResponse(`No steps with id}`), 404);
  }

  if (isMCQ) {
    console.log("unTrimmed", steps.optionsAns);

    console.log("Converted String");
    console.log("Request Answer", req.body.answer);
    if (!req.body.answer || req.body.answer === "") {
      res.status(400).json({
        message: "Please provide answers",
      });
    } else {
      steps.optionsAns = steps.optionsAns
        .toLowerCase()
        .split(",")
        .sort()
        .join(",");
      res.status(200).json({
        data: steps.optionsAns === req.body.answer,
        message: "Correct Answer",
      });
    }
  }
  if (!isMCQ) {
    console.log("Current Step", steps);
    console.log("Request Body", req.body);
    if (!req.body.answer || req.body.answer === "") {
      res.status(400).json({
        message: "Please provide some answer",
      });
    } else {
      steps.answer = steps.answer.toLowerCase().split(" ").join("");
      req.body.answer = req.body.answer.toLowerCase().split(" ").join("");
      res.status(200).json({
        data: steps.answer === req.body.answer,
      });
    }
  }
};
