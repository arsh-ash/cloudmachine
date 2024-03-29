const Machine = require("../models/machine");
const Steps = require("../models/steps")

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
    let allMachines = await Machine.find({}).populate({ path: "Steps" });

    return res.status(200).json({
      message: "all machines fatched",
      success: true,
      data: allMachines,
    });
  } catch (error) {
    console.log("internal serever error", error);
    return res.status(404).json({
      message: error,
      success: false,
    });
  }
};
module.exports.editMachine = async function (req, res) {
  // console.log("hiiiii")
  console.log('machine body', req.body)
  try {
    let machine = await Machine.findByIdAndUpdate(req.params.machineId, { ...req.body });
    // Machine.save();
    console.log(machine)
    return res.status(200).json({
      message: "Machine Updated successfully",
      success: true,
      data: req.body,
    });
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      message: 'Machine cannot be updated',
      success: false,
    });
  }
};
module.exports.getSinglelMachine = async function (req, res) {
  // console.log("hiiiii")
  try {
    let machine = await Machine.findById(req.params.machineId).populate(
      "Steps"
    );

    return res.status(200).json({
      message: "Machine fatched",
      success: true,
      data: machine,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
      success: false,
    });
  }
};
module.exports.deleteMachines = async function (req, res) {
  console.log("tryimg to delete something", req.params.id)

  try {
    await Machine.findByIdAndDelete(req.params.id);
    await Steps.deleteMany({ Machine: req.params.id });

    return res.status(200).json({
      message: "Machine deleted sucessfully",
      success: true,
    });
  } catch (err) {
    return res.status(404).json({
      message: err,
      success: false,
    });
  }
};

module.exports.deleteMultiple = async function (req, res) {
  console.log("Multi delete api callesd", req.body)
  const machinesToBeDeleted = req.body;
  console.log('Req body', machinesToBeDeleted)
  try {
    machinesToBeDeleted.map(async (machine) => await Machine.findByIdAndDelete(machine));
    return res.status(200).json({
      message: 'Machines Deleted Successfully',
      success: true,
    });

  } catch (err) {
    console.log(err)
    return res.status(404).json({
      message: err,
      success: false,
    });
  }
};
