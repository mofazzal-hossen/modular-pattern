import { pool } from "../../db";


const loginUserIntoDB =async(payload: {email: string, password:string})=>{

const { email, password}= payload
// 1. Check if the user exists
const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );
  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials!");
  }

}








export const authService ={
    loginUserIntoDB
}


// 1. check if user exists
//2. compare the password
//3. generate token