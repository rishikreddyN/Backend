import e, { json } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
const app=e();

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
))

app.use(e.json({limit:"16kb"}))

app.use(e.urlencoded({extended:true}))

app.use(e.static("public"))

app.get("/", (req, res) => {
    res.send("Hello from Express");
});
import {userRouter} from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter);
export {app}