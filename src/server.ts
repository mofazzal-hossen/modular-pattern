import express, { type Application, type Request, type Response } from 'express'
import {Pool} from "pg"
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


app.get('/', (req :Request, res:Response) => {
  // res.send('Hello World')
  res.status(200).json({
    "message":"Express Level",
    "aut":"next level"
  })
});


app.post('/', async(req:Request, res:Response)=>{
  // console.log(req.body) you do try clg

  const {name , email, password}= req.body   ///API response-কে সুন্দর ও organized রাখার জন্য। , এভাবে success, message, data আলাদা থাকে এবং frontend-এর জন্য parse করা সহজ হয়।
  res.status(201).json({
    message:"successfully make by data",
    data:{
      name,
      email,
    }


    })
})



app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
