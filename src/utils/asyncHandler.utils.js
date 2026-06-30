export const asyncHandler=(fn)=>async(req,res)=>{
    try{
        await fn(req,res);
    }catch(error){  
        res.status(error.statusCode || 500).json({
            success:false,
            message:error.message
        })
    }
}

