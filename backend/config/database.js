import mongoose from 'mongoose';

const connectDatabase =()=>{

    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
      
    }).then((data)=>{
        console.log(`mongodb connected:${data.connection.host}`);
    }).catch((err)=>{
        console.log(err);
    });
        
}
export default connectDatabase;
