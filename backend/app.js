import express from 'express';
const app = express();

app.use(express.json());
//Router imports

// import routes 
import product from './routes/product.js';
app.use('/api/v1/',product);


export default app;