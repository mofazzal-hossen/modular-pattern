import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";


const createUserIntoDB = async(payload: IUser) =>{

const {name, email, password, age} = payload
//password hash
const hashPassword = await bcrypt.hash(password, 10)

 const result = await pool.query(`
    INSERT INTO users (name, email,  password ,age  )  
    VALUES ($1,$2,$3,$4) RETURNING *
    
    `, 
    [name, email, hashPassword, age],
  );
///obj in to delete password mahout
delete result.rows[0].password;
    return result;
};
///  VALUES ($1,$2,$3,$4) RETURNING * . {* = all data res }




const getAllUserFromDB = async()=>{
     const result = await pool.query(`
    SELECT * FROM users
`)

return result
};


const getSingleUserFromDB = async(id:string)=>{
    const result = await pool.query(`
     SELECT * FROM users WHERE id=$1  
    `,[id])
        if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
        data: {},
      });
    }
    return result
};


const updateUserFromDB = async (payload : IUser, id: string)=>{
    const {name, is_active, password, age} = payload
    
     const result = await pool.query(
      `
    UPDATE users 
    SET 
    name=COALESCE($1,name),
    password=COALESCE($2,password),
    age=COALESCE($3,age),
    is_active=COALESCE($4,is_active) 

    WHERE id=$5 RETURNING *
    `,
      [name, password, age, is_active, id],
    );
    return result
};

const userDeleteFromDB = async(id: string)=>{
    const result = await pool.query(
      `
    DELETE FROM users WHERE id=$1  
      `,
      [id],
    );
 return result
}
export const userService ={
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
  userDeleteFromDB
}