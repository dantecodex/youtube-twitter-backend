import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" })); // To limit JSON Data
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // To handle long URL
app.use(express.static("public")); // To store asset data in server probably in "public temp folder"
app.use(cookieParser());

//routes import
import userRouter from "./routes/user_routes.js"

//routes declaration
app.use("/api/v1/users", userRouter)

export { app }