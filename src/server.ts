import express, { type Application, type Request, type Response } from 'express'
import {DatabaseError, Pool} from "pg"
const app : Application = express()
const port = 9000
// you must used all time MeddleWare 
app.use(express.json())
app.use(express.text()) //show text data 
app.use(express.urlencoded({extended:true})) //{extended:true} all type data show as like nested-data. 
//end

//pg connection 

const pool = new Pool({
  connectionString:"postgresql://neondb_owner:npg_hS6D7qkWBouK@ep-calm-leaf-atx7sci5-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

})

// make a DataTable 
//check data database connection
//postgresql create tables search in w3 school

const initDB = async()=>{
  try {
    await pool.query(`
CREATE TABLE IF NOT EXISTS users (

id SERIAL PRIMARY KEY, 
name VARCHAR(20),
email VARCHAR(20) UNIQUE NOT NULL,
password VARCHAR(20) NOT NULL ,
is_active BOOLEAN DEFAULT true,
age INT,

created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()

);

      `)

      console.log("DataBase connected successfully " )
  } catch (error) {
    console.log(error)
  }
};
initDB();
//end


app.get('/', (req :Request, res:Response) => {
  // res.send('Hello World')
  res.status(200).json({
    "message":"Express Level",
    "aut":"next level"
  })
});

///API response-কে সুন্দর ও organized রাখার জন্য। , এভাবে success, message, data আলাদা থাকে এবং frontend-এর জন্য parse করা সহজ হয়।
// you must be check INSERT query-তে parameter-এর order 
app.post('/', async(req:Request, res:Response)=>{
  // console.log(req.body) you do try clg

  const {name , email,age, password}= req.body   
  const result = await pool.query(`
    INSERT INTO users (name, email,  password ,age  )  
    VALUES ($1,$2,$3,$4) RETURNING *
    
    `,[name , email, password, age ])
  res.status(201).json({
    message:"successfully make by data",
    data: result.rows[0],


    })
})



app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
