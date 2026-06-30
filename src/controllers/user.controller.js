import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Apiresponse.js";
export const registerUser=asyncHandler( async(req,res)=>{
    

    // 1.take information from the frontend
    // 2.verify weather the information is there or null 
    // 3.now check weather the account already exists(since username or email is unique check with any of the one)
    // 4.we need to check the files exist or not (check avatar)
    // 5.upload them to cloudinary
    // 6.create user object user entry in database
    // remove pass and refresh token from response
    // check is user is created successfully
    // return res

    // step1
    const {username,email,fullname,password}=req.body;
    // step2
    if(
        [fullname,email,username,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(
            400,
            "All fields are required",
        )

    }
    if(await User.findOne({
        $or:[{username},{email}]
    })){
        throw new ApiError(
            400,
            "Username  or email already exists "
        )
        
    }

    const avatarLocalPath=req.files?.avatar?.[0]?.path;
    const coverImageLocalPath=req.files?.coverImage?.[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }
   
    const avatar=await uploadOnCloudinary(avatarLocalPath);
    const coverImage=coverImageLocalPath?await uploadOnCloudinary(coverImageLocalPath):null;
    
    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }
    const user=await User.create(
        {
            fullname,
            avatar:avatar.url,
            coverImage:coverImage?.url || "",
            email,
            password,
            username:username.trim().toLowerCase()
        }
    )
    const createdUser=await User.findById(user._id).select(
        "-password -refreshtoken"
    );
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"user created successfully")
    )

})


