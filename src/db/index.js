import mongoose from "mongoose";

export async function main() {
    try{
        console.log(process.env.MONGODB_URL)
        await  mongoose.connect(process.env.MONGODB_URL)
    }catch(err){
        throw err;
    }
}

