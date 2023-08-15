const mongoose = require("mongoose");

module.exports = async(app, port)=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("successfully connected to the database");
        app.listen(port, ()=>{
            console.log(`listening to the port ${port}`);
        });
    }catch(err){
        console.log("unable to connect to the database.");
    }
}