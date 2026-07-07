import express, { type Application, type Request, type Response } from 'express'
import { Pool } from "pg"
import config from './config'
const app: Application = express()
const port = config.PORT
// you must used all time MeddleWare 
app.use(express.json())
app.use(express.text()) //show text data 
app.use(express.urlencoded({ extended: true })) //{extended:true} all type data show as like nested-data. 
//end

//pg connection 

const pool = new Pool({
  connectionString: config.connect_string,
})

// make a DataTable 
//check data database connection
//postgresql create tables search in w3 school

const initDB = async () => {
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

    console.log("DataBase connected successfully ")
  } catch (error) {
    console.log(error)
  }
};
initDB();
//end


app.get('/', (req: Request, res: Response) => {
  // res.send('Hello World')
  res.status(200).json({
    "message": "Express Level",
    "aut": "next level"
  })
});

///API response-কে সুন্দর ও organized রাখার জন্য। , এভাবে success, message, data আলাদা থাকে এবং frontend-এর জন্য parse করা সহজ হয়।
// you must be check INSERT query-তে parameter-এর order 
app.post('/api/user', async (req: Request, res: Response) => {
  // console.log(req.body) you do try clg

  const { name, email, age, password } = req.body

  try {
    const result = await pool.query(`
    INSERT INTO users (name, email,  password ,age  )  
    VALUES ($1,$2,$3,$4) RETURNING *
    
    `, [name, email, password, age])

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
});



app.get('/api/user', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
    SELECT * FROM users
`)

res.status(200).json({
  success:true,
  message:"user successfully red " ,
  data: result.rows,

})
  } catch (error:any) {
res.status(500).json({
    success:false,
  message:error.message,
  error:error,

})

  }
});


app.get('/api/user/:id', async(req:Request, res:Response)=>{
    const {id}= req.params
try {
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

    res.status(200).json({
      success: true,
      message: "User retrived successfully!",
      data: result.rows[0],
    });

} catch (error: any) {
  res.status(500).json({
    success: false,
      message: error.message,
      error: error,
  })

}
}); 


app.put("/api/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;

  // console.log("Id : ", id);
  // console.log({ name, password, age, is_active });

  try {
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

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
      });
    }

    // console.log(result);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.delete("/api/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
    DELETE FROM users WHERE id=$1  
      `,
      [id],
    );

    console.log(result);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});




app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
