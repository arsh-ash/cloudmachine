const Steps = require("../models/steps");

// Create Steps
module.exports.createsteps = async function (req, res) {
  try {
    req.body.machine = req.params.machineId;
    /////////// create array option
    ///// options[{option1,option2,option3,option4}]
    // optionsAns = kdg,dytf,tryrt,rtyt
   
    let temp_options = req.body.options[0];
    // let temp_optionsAns = req.body.optionsAns.split(',');
    req.body.options = [temp_options.option1,temp_options.option2,temp_options.option3,temp_options.option4]
    // req.body.optionsAns = temp_optionsAns

    

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

///////////-------
//////// isMCQ = true,stepId, ans , req.body 

exports.checkAns = async (req, res, next) => {
  const steps = await Steps.find({ machine: req.body.stepId })

  if (!steps) {
    return next(
      new ErrorResponse(`No steps with id of ${req.params.machineId}`),
      404
    );
  }

  if(isMCQ){
     
    res.status(200).json({
      data: steps.optionsAns === req.body.ans,
    });


  }
  if(!isMCQ){
    res.status(200).json({
      data: steps.answer === req.body.ans,
    });


  }
};

 

