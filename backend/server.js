require("dotenv").config();

const app = require("./src/app");
const connectDB=require("./config/db")

const PORT = process.env.PORT || 3000;


const startServer=async()=>{
 await connectDB();

app.listen(PORT, () => {
    console.log("CLIENT_URL =", process.env.CLIENT_URL);
    console.log(`Server is running on port ${PORT}`);
});
}

startServer();
