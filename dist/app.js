import express, {} from 'express';
import { userRoute } from './modules/user/user.route';
import { profileRoute } from './modules/profile/profile.route';
import { authRoute } from './modules/auth/auth.route';
import logger from './middleware/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
const app = express();
// you must used all time MeddleWare 
app.use(express.json());
app.use(express.text()); //show text data 
app.use(express.urlencoded({ extended: true })); //{extended:true} all type data show as like nested-data. 
app.use(logger); // middle ware logger.tsx tracking file 
app.use(cookieParser());
// cors setup 
app.use(cors({
    origin: 'http://localhost:9000',
}));
// cors setup End
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
// Global Error Handling Middleware
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map