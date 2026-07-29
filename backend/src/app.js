const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/auth.routes")
const interviewRoutes=require("./routes/interview.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/interview", interviewRoutes);

module.exports = app;