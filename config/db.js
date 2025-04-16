const mongoose = require('mongoose');

class connectDB {
    async Connect(){
        try {
            await mongoose.connect(process.env.MONGO_URI)
            console.log("MongoDB connected sucessfully");
        } catch(err){
            console.log("MongoDB connection failed", err.message);
            throw err;
        }
    }   
}
module.exports=new connectDB()