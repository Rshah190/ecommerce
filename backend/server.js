import app from './app.js';
import  connectDatabase from './config/database.js';

import  dontenv from 'dotenv';

//Handled uncaught error 
process.on("uncaughtException",(err)=>{
   console.log(`Error:${err.message}`);
   console.log(`Shutting down the server due to uncaught error exception`);
   process.exit(1);
})

// console.log(shah)
//call the config port
dontenv.config({path:'backend/config/config.env'});

// connect the database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
   console.log(`server is working on http://localhost:${process.env.PORT}`);
});


// unhandle promise error rejection
process.on("unhandledRejection",(err)=>{
   console.log(`Error:${err.message}`);
   console.log(`Shutting down the server due to unhandled Error Rejection`);
   server.close(()=>{
    process.exit(1);
   });
});
