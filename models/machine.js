const mongoose = require("mongoose");

let MachineSchema = new mongoose.Schema(
  {
    machineName: {
      type: String,
      required: [true, "Please add Name"],
    },
    url: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
    },
    steps: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Machine = mongoose.model("Machine", MachineSchema);
module.exports = Machine;

// const mongoose =require("mongoose");
 
// let MachineSchema=new mongoose.Schema({
//     machineName:{
//         type:String,
//         required: [true, "Please add Name"],
//     },
//     url:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String

//     },
    
// },{
//  timestamps:true,   
// })

// const Machine=mongoose.model("Machine",MachineSchema);
// module.exports=Machine
