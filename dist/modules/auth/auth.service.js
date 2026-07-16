import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, {} from 'jsonwebtoken';
import config from "../../config";
const loginUserIntoDB = async (payload) => {
    const { email, password } = payload;
    // 1. Check if the user exists
    const userData = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [email]);
    if (userData.rows.length === 0) {
        throw new Error("Invalid Credentials!");
    }
    const user = userData.rows[0];
    // console.log(user)
    const matchPassword = await bcrypt.compare(password, user.password);
    // console.log(matchPassword)
    if (!matchPassword) {
        throw new Error('invalid credentials!,');
    }
    ;
    //make token
    const jwtPayload = {
        id: user.id,
        name: user.name,
        role: user.role,
        is_active: user.is_active,
        email: user.email
    };
    const accessToken = jwt.sign(jwtPayload, config.secret, { expiresIn: "1d" });
    const refreshToken = jwt.sign(jwtPayload, config.refresh_secret, { expiresIn: "1d" });
    return { accessToken, refreshToken };
};
const generateRefreshToken = async (token) => {
    if (!token) {
        throw new Error("unaUthorize");
    }
    ;
    const decoded = jwt.verify(token, config.refresh_secret);
    // console.log(decoded)
    const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [decoded.email]);
    //  console.log(userData)
    const user = userData.rows[0];
    // console.log(user)
    if (userData.rows.length === 0) {
        throw new Error("user not fount");
    }
    ;
    if (!user?.is_active) {
        throw new Error("user not forbidden");
    }
    ;
    const jwtPayload = {
        id: user.id,
        name: user.name,
        role: user.role,
        is_active: user.is_active,
        email: user.email
    };
    const accessToken = jwt.sign(jwtPayload, config.secret, { expiresIn: "1d" });
    return { accessToken };
};
export const authService = {
    loginUserIntoDB,
    generateRefreshToken
};
// 1. check if user exists
//2. compare the password
//3. generate token
//# sourceMappingURL=auth.service.js.map