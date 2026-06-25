import mongoose from "mongoose";

export async function main() {
    try{
        await  mongoose.connect(process.env.MONGODB_URL)
    }catch(err){
        throw err;
    }
}

