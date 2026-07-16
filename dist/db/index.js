import { Pool } from "pg";
import config from "../config";
export const pool = new Pool({
    connectionString: config.connect_string,
});
// make a DataTable 
//check data database connection
//postgresql create tables search in w3 school
export const initDB = async () => {
    try {
        await pool.query(`
CREATE TABLE IF NOT EXISTS users (

id SERIAL PRIMARY KEY, 
name VARCHAR(20),
email VARCHAR(20) UNIQUE NOT NULL,
password TEXT NOT NULL ,
is_active BOOLEAN DEFAULT true,
age INT,
role VARCHAR(10) DEFAULT 'user',

created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()

);
 `);
        await pool.query(`
 CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    address TEXT,
    phone VARCHAR(15),
    gender VARCHAR(12),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
  `);
        console.log("DataBase connected successfully ");
    }
    catch (error) {
        console.log(error);
    }
};
initDB();
//end
//# sourceMappingURL=index.js.map