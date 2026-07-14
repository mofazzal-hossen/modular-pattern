import { Router, } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";


const router = Router()


router.post('/', userController.createUser);
router.get('/',auth("admin","agent"), userController.getAllUser);
router.get('/:id', userController.getSingleUser); 
router.put("/:id", userController.updateUserID);
router.delete("/:id", userController.userDelete);


export const userRoute = router