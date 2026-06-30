import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avatar:{
        type:String, //cloudinary
        required:true 
    
    },
    coverImage:{
        type:String,
    },
    wathHistory:[

        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshtoken:{
        type:String
    }

    
},{timestamps:true})


userSchema.pre("save",async function(){
    if(!this.isModified("password"))return next();
    this.password= await bcrypt.hash(this.password,10)
    
} )

userSchema.methods.isPasswordCorrect=async function(password){
 return   await bcrypt.compare(password,this.password);
}
export const User=mongoose.model("User",userSchema)