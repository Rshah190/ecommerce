import express from 'express';
const app = express();
import errorhandler from './middleware/error.js'

app.use(express.json());
//Router imports

// apply errro handler middleware
app.use(errorhandler);

// import routes 
import product from './routes/product.js';
app.use('/api/v1/',product);


export default app;