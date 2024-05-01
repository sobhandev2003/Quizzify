import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
//TODO - 
let storage;
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING!);
        const connection = mongoose.connection
        storage=new GridFsStorage({db:connection})
        console.log(`${connection.name} Database Connected.`);

    } catch (error) {
        console.error(error);

    }
}

export const upload=multer({storage})