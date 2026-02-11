require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/database");

const PORT = process.env.PORT || 3000;

connectToDb()
  
app.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT}`)
})