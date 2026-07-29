const mongoose=require('mongoose');

const interviewSchema=new mongoose.Schema({
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
},
    jobRole:{
        type:String,
        required:true,
        trim: true
    },
    technology:{
        type:String,
        required:true,
        trim: true
    },
    experience:{
    type: Number,
    required: true,
    min: 0
},
    difficulty:{
        type:String,
        enum: ["Easy", "Medium", "Hard"],
        required:true
    },
    totalQuestions:{
    type: Number,
    required: true,
    enum: [5, 10]
},
    status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
}
},{
    timestamps:true
});

const interviewmodel=mongoose.model("interview",interviewSchema);
module.exports=interviewmodel;