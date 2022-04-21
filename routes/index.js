const express=require("express");
const router=express.Router();

const homeControllers=require("../controllers/home_controller");

router.get("/", homeControllers.home)

router.use("/machine",require("./machine"));
router.use("/steps",require("./steps"));
router.use("/auth",require("./auth"));
router.use("/user",require("./user"));

module.exports=router;