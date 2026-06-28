import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from "fs"
cloudinary.config({
    Cloud_Name: process.env.Cloud_Name,
    API_Key: process.env.API_Key,
    API_Secret: process.env.API_Secret 
})

export const uploadOnCloudinary=async (localFilePath) => {
    try{

        if(!localFilePath)return null;
        const response=await cloudinary.uploader.upload(localFilePath,
            {
                resource_type:"auto"
            })
            console.log("file is uploaded on cloudinary",response.url);
            return response;
}catch(error){
    console.log("cannot upload file",error);
    fs.unlinkSync(localFilePath);
    return null;
}
}

