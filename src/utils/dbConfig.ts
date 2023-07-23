import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);


 
  if (isConnected) {
    console.log("MongoDB is already Connected");
    return;
  }

  try {
    
    await mongoose.connect(process.env.MONGO_URI!);
    isConnected = true;
    
    console.log('MongoDB connected successfully');
    
    // const connection = mongoose.connection;
    
    // connection.on('connected', () => {
    // })

    // connection.on('error', (err) => {
    //     console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    //     process.exit();
    // })






  } catch (error) {
    console.log(error);
  }
};
