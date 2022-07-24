import app from './app.js';
import  connectDatabase from './config/database.js';

import  dontenv from 'dotenv';

//call the config port
dontenv.config({path:'backend/config/config.env'});

// connect the database
connectDatabase();

app.listen(process.env.PORT,()=>{
   console.log(`server is working on http://localhost:${process.env.PORT}`);
});
