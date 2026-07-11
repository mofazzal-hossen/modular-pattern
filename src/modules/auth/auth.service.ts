import bcrypt from "bcryptjs";
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
const user = userData.rows[0];
// console.log(user)
const matchPassword = await bcrypt.compare(password,user.password)
console.log(matchPassword)
 if(!matchPassword){
  throw new Error('invalid credentials!,');
  
 }

}








export const authService ={
    loginUserIntoDB
}


// 1. check if user exists
//2. compare the password
//3. generate token