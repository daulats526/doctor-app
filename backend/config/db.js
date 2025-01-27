import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
            });
            await mongoose.connect(`${process.env.MONGO_DB}`)
    
     } catch (err) {
            console.error(err);
            process.exit(1);
        }
};
 export default connectDB;