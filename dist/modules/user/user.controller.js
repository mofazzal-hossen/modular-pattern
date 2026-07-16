import { userService } from "./user.service";
import sendResponse from "../../sendResponse";
const createUser = async (req, res) => {
    // console.log(req.body) you do try clg
    //   const { name, email, age, password } = req.body
    try {
        const result = await userService.createUserIntoDB(req.body);
        res.status(201).json({
            message: "successfully make by data",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            error: error,
        });
    }
};
const getAllUser = async (req, res) => {
    // console.log('controller', req.user)
    try {
        const result = await userService.getAllUserFromDB();
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "user successfully red ",
            data: result.rows,
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.getSingleUserFromDB(id);
        res.status(200).json({
            success: true,
            message: "User retrived successfully!",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const updateUserID = async (req, res) => {
    const { id } = req.params;
    // console.log("Id : ", id);
    // console.log({ name, password, age, is_active });
    try {
        const result = await userService.updateUserFromDB(req.body, id);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User Not found!",
            });
        }
        // console.log(result);
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
const userDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.userDeleteFromDB(id);
        console.log(result);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User Not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: {},
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};
export const userController = {
    createUser, getAllUser,
    getSingleUser, updateUserID,
    userDelete
};
//# sourceMappingURL=user.controller.js.map