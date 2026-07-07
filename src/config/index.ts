import dotenv from 'dotenv'
import path from 'path'
import apth from 'path'

dotenv.config({

    path : path.join(process.cwd(), ".env"),
});

const config ={
    connect_string: process.env.CONNECTIONSTRING as string,
    PORT:process.env.PORT,
};

export default config