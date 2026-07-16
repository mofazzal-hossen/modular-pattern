import { pool } from "../../db";
import bcrypt from "bcryptjs";
const createUserIntoDB = async (payload) => {
    const { name, email, password, age, role } = payload;
    //password hash
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`
    INSERT INTO users (name, email,  password ,age, role)  
    VALUES ($1,$2,$3,$4,COALESCE($5, 'user')) RETURNING *
    
    `, [name, email, hashPassword, age, role]);
    ///obj in to delete password mahout
    delete result.rows[0].password;
    return result;
};
///  VALUES ($1,$2,$3,$4) RETURNING * . {* = all data res }
const getAllUserFromDB = async () => {
    const result = await pool.query(`
    SELECT * FROM users
`);
    return result;
};
const getSingleUserFromDB = async (id) => {
    const result = await pool.query(`
     SELECT * FROM users WHERE id=$1  
    `, [id]);
    return result;
};
const updateUserFromDB = async (payload, id) => {
    const { name, is_active, password, age } = payload;
    const result = await pool.query(`
    UPDATE users 
    SET 
    name=COALESCE($1,name),
    password=COALESCE($2,password),
    age=COALESCE($3,age),
    is_active=COALESCE($4,is_active) 

    WHERE id=$5 RETURNING *
    `, [name, password, age, is_active, id]);
    return result;
};
const userDeleteFromDB = async (id) => {
    const result = await pool.query(`
    DELETE FROM users WHERE id=$1  
      `, [id]);
    return result;
};
export const userService = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    userDeleteFromDB
};
//# sourceMappingURL=user.service.js.map