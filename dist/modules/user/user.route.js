import { Router, } from "express";
import { userController } from "./user.controller";
const router = Router();
router.post('/', userController.createUser);
router.get('/', userController.getAllUser);
router.get('/:id', userController.getSingleUser);
router.put("/:id", userController.updateUserID);
router.delete("/:id", userController.userDelete);
export const userRoute = router;
//# sourceMappingURL=user.route.js.map