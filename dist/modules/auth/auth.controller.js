import {} from "express";
import { authService } from "./auth.service";
const loginUser = async (req, res) => {
    try {
        const result = await authService.loginUserIntoDB(req.body);
        const { refreshToken } = result;
        res.cookie("refreshToken", refreshToken, {
            secure: false, /// in production =>true
            httpOnly: true,
            sameSite: "lax"
        });
        res.status(201).json({
            success: true,
            message: "Profile created successfully!",
            data: result,
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
const refreshToken = async (req, res) => {
    try {
        const result = await authService.generateRefreshToken(req.cookies.refreshToken);
        res.status(201).json({
            success: true,
            message: "access token generate",
            data: result,
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
export const authController = {
    loginUser,
    refreshToken
};
//# sourceMappingURL=auth.controller.js.map