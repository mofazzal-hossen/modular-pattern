import express, { type Application, type NextFunction, type Request, type Response } from 'express'

import fs from "fs";
import path from "path";
import { userRoute } from './modules/user/user.route'
import { profileRoute } from './modules/profile/profile.route'
import { authRoute } from './modules/auth/auth.route'
import { error } from 'console';

const app: Application = express()

// you must used all time MeddleWare 
app.use(express.json())
app.use(express.text()) //show text data 
app.use(express.urlencoded({ extended: true })) //{extended:true} all type data show as like nested-data. 

app.use((req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;

  fs.appendFile("logger.txt", log, (err) => {
    if (err) {
      console.error("Failed to write log:", err);
    } else {
      console.log("Log saved successfully");
    }
  });

  next();
});



app.get('/', (req: Request, res: Response) => {
  // res.send('Hello World')
  res.status(200).json({
    "message": "Express Level",
    "aut": "next level"
  })
});


app.use('/api/user',userRoute)
app.use('/api/profile',profileRoute)
app.use('/api/auth',authRoute)

export default app