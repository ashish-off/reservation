import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB..');
    } catch (error) {
        console.error('Error connecting to MongoDB : ', error);
        console.error(error.stack);
        process.exit(1);
    }
}

export default connectDB;