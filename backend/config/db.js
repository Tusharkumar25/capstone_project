const mongoose=require('mongoose');

async function connectDB(){
    try{
          await mongoose.connect(process.env.MONGO_URI);
          console.log("database connected seccessfully");
    }catch(err){
          console.error("database did not connect ",err);
          process.exit(1);
    }
}

module.exports=connectDB;