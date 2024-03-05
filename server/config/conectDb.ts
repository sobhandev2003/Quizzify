import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING!);
        const connection = mongoose.connection
        console.log(`${connection.name} Database Connected.`);

    } catch (error) {
        console.error(error);

    }
}