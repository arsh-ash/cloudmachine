const Machine=require("../models/machine");



module.exports.createmachine=  async function(req,res){

    try {
        let machine= await Machine.create(req.body);
        return res.status(200).json({
            message:"mac created successfully",
            data:machine,
        })

        
    } catch (error) {
        console.log(error);
    }


   

}

module.exports.getAllMachines= async function(req,res){
    // console.log("hiiiii")
    try {
        let allMachines= await Machine.find({})

        return res.status(200).json({
            message:"all amchines fatched",
            data:allMachines
        })
        
    } catch (error) {
        console.log("internal serever error");
    }
   

}
module.exports.deleteMachines= async function(req,res){
    await Machine.findByIdAndDelete(req.params.id);

    return res.status(200).json({
        message:"message deleted sucessfully",
    })

}