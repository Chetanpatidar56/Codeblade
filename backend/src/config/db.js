const mongoose=require('mongoose');


async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("conncect to database");
    
}
module.exports=main;