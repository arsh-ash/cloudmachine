const express=require("express");
const router=express.Router();
const passport = require("passport");


const userController=require("../controllers/user_controller");

router.put("/updateUser" ,
passport.authenticate("jwt", { session: false }),
userController.editUser
)
router.post("/getCurrentUser/:id",userController.getCurentUser)

module.exports=router;