import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from "fs"


export const uploadOnCloudinary=async (localFilePath) => {
    
    
    cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret 
})
    try{

        if(!localFilePath)return null;
        const response=await cloudinary.uploader.upload(localFilePath,
            {
                resource_type:"auto"
            })
            console.log("file is uploaded on cloudinary",response.url);
            fs.unlinkSync(localFilePath); 
            return response;
}catch(error){
    console.log("cannot upload file",error);
   if(fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
}
}

