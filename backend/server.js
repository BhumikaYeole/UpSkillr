import express from "express"
import cookieParser from "cookie-parser"
import connectToDatabase from "./db/mongodb.js"
import authRouter from "./routes/auth_routes.js"
import errorMiddleware from "./middlewares/error_middleware.js"
import authorize from "./middlewares/auth_middleware.js"
import courseRouter from "./routes/course_routes.js"
import enrollRouter from "./routes/enrollment_routes.js"
import progressRouter from "./routes/progress_routes.js"
import resourceRouter from "./routes/resource_routes.js"
import userRouter from "./routes/user_routes.js"    
import certificateRouter from "./routes/certificate_routes.js"
import router from "./routes/assessment_routes.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));

app.use(express.urlencoded({extended : false}))

app.use("/api/auth", authRouter)
app.use("/api/courses", courseRouter)
app.use("/api/enrollments", enrollRouter)
app.use("/api/progress", progressRouter)
app.use("/api/resources", resourceRouter)
app.use("/api/user", userRouter)
app.use("/api/certificates", certificateRouter)
app.use("/api/assessments", router)

app.use(errorMiddleware)
app.use(authorize)


app.get("/" , (req, res)=>{
    res.send("Upskillr backend")
})

app.listen(5000, async()=>{
    console.log("Server is running at http://localhost:5000/")
    await connectToDatabase();
})

