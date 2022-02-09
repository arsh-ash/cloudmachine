const express=require("express");
const router=express.Router();
const passport = require("passport");


const authController=require("../controllers/auth_controller");
router.post("/register",authController.register);
router.post("/login",authController.login);
router.post("/deleteAccount" ,
passport.authenticate("jwt", { session: false }),
authController.deleteAccount
)
module.exports=router;