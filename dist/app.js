import express, {} from 'express';
import config from './config';
import { pool } from './db';
import { userRoute } from './modules/user/user.route';
import { profileRoute } from './modules/profile/profile.route';
import { authRoute } from './modules/auth/auth.route';
const app = express();
// you must used all time MeddleWare 
app.use(express.json());
app.use(express.text()); //show text data 
app.use(express.urlencoded({ extended: true })); //{extended:true} all type data show as like nested-data. 
//end
app.get('/', (req, res) => {
    // res.send('Hello World')
    res.status(200).json({
        "message": "Express Level",
        "aut": "next level"
    });
});
app.use('/api/user', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/auth', authRoute);
export default app;
//# sourceMappingURL=app.js.map