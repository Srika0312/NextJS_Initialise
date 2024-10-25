import mongoose from "mongoose"

export const ConnectWithMongoDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("Connected with MongoDB");
    } catch (error) {
        console.log(error);
    }
}