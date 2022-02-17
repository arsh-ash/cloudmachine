const Machine = require("../models/machine");

module.exports.createmachine = async function (req, res) {
  try {
    let machine = await Machine.create(req.body);
    return res.status(200).json({
      message: "mac created successfully",
      data: machine,
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

module.exports.getAllMachines = async function (req, res) {
  // console.log("hiiiii")
  try {
    let allMachines = await Machine.find({});

    return res.status(200).json({
      message: "all amchines fatched",
      success: true,
      data: allMachines,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
      success: false,
    });
    console.log("internal serever error", error);
  }
};
module.exports.deleteMachines = async function (req, res) {
  try {
    await Machine.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "message deleted sucessfully",
      success: true,
    });
  } catch (err) {
    return res.status(404).json({
      message: error,
      success: false,
    });
  }
};
