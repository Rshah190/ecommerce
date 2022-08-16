import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/error.js'
app.use(express.json());
app.use(cookieParser());

// import routes 
import product from './routes/product.js';
import user from './routes/User.js'
import order from './routes/Order.js';
app.use('/api/v1/',product);
app.use('/api/v1/user',user);
app.use('/api/v1/order',order);


// apply errror handler middleware
app.use(errorMiddleware);

export default app;