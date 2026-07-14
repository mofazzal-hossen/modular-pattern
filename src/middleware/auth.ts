import type { NextFunction, Request, Response } from "express";
import  jwt, { type JwtPayload }  from 'jsonwebtoken';
import config from "../config";
import { pool } from "../db";





const auth = (...roles: any)=>{
    console.log(roles)
   return async (req : Request, res:Response, next: NextFunction)=>{
try {
        // console.log("this is protected route")
    // console.log(req.headers.authorization)

      // 1. Check if the token exists
      // 2. Verify the token
      // 3. Find the user into database
      // 4. If the user active or not?


    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({
            success:"false",
            message:"Unauthorized access!!!"
        })   
    };


    const decoded = jwt.verify(token as string, config.secret as string) as JwtPayload;
    // console.log(decoded)
 const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [decoded.email],)
//  console.log(userData)
const user = userData.rows[0];
// console.log(user)

if (userData.rows.length === 0) {
    res.status(404).json({
        success:"false",
        message:"user is not found"
    })
};

if (!user?.is_active) {
    res.status(404).json({
        success:"false",
        message:"forbidden!!"
    })
};

req.user = decoded 



  next();  
} catch (error) {
    next(error)
}
};
}

export default auth