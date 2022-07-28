import express from 'express';
const app = express();
import errorMiddleware from './middleware/error.js'

app.use(express.json());
// import routes 
import product from './routes/product.js';
app.use('/api/v1/',product);
// apply errror handler middleware
app.use(errorMiddleware);

export default app;