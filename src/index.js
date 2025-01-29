import dotenv from 'dotenv';
import connectDB from './db/db.js';
import { app } from './app.js';

dotenv.config({
    path: './.env'
})



connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error", error);
        throw error; 
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is  Running on Port ${process.env.PORT}`);
        
    })
})
.catch((error)=>{
    console.log("MONGODB connection failed")
});