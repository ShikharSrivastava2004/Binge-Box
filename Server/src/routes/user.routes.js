import Router from "express";
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();


// router.route("/register").post( upload.single("avatar"), registerUser )
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/profile").post(verifyJWT,getCurrentUser)






export default router