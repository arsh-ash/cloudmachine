const User=require("../models/user");
const jwt=require("jsonwebtoken");

module.exports.register= async function(req,res){

    try {
        let user=await User.create(req.body);
        return res.status(200).json({
            message:"user registered successfully",
            data:user
        })
        
    } catch (error) {
        return res.status(200).json({
            message:'internal server error'
        })
        
    }
    

}
module.exports.login=async function(req,res){
    try {
        let user = await User.findOne({ email: req.body.email });
        console.log("user found", user);
        const password = req.body.password;
        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          console.log('Didnt match')
          // return next(new ErrorResponse("Password is invalid ", 401));
          return res.status(400).json({
            message: "Invalid password",
          });
        } else if (!user) {
          console.log('No user')
          return res.status(400).json({
            message: "User not found",
          });
        }
    
        return res.status(200).json({
          message: "Sign in successful, here is your token",
          data: {
            token: jwt.sign(user.toJSON(), "Cloud", { expiresIn: "100000000" }),
          },
        });
      } catch (err) {
        console.log('server Error',err)
        return res.status(500).json({
          message: err,
        });
      }
    
  

}
module.exports.deleteAccount= async function(req,res){
    try {
         let user= await User.findOne({email:req.user.email});
        return res.status(200).json({
            message:"user found successfully",
            data:user,
        })

        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            message:"internal server error"
        })
    }
}