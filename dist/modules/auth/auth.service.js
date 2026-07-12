import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from 'jsonwebtoken';
import config from "../../config";
import { Result } from "pg";
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
        is_active: user.is_active,
        email: user.email
    };
    const accessToken = jwt.sign(jwtPayload, config.secret, { expiresIn: "1d" });
    return { accessToken };
};
export const authService = {
    loginUserIntoDB
};
// 1. check if user exists
//2. compare the password
//3. generate token
//# sourceMappingURL=auth.service.js.map