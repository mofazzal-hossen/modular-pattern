import type { Request, Response } from "express"
import { pool } from "../../db"
import { userService } from "./user.service"


const createUser = async (req: Request, res: Response) => {
  // console.log(req.body) you do try clg

//   const { name, email, age, password } = req.body

  try {
   const result = await userService.createUserIntoDB(req.body)

    res.status(201).json({
      message: "successfully make by data",
      data: result.rows[0],


    })
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,


    })

  }
}


export const userController ={
createUser,

}