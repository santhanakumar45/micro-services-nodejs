const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const { conn } = require("./config/database.connection")
const cors = require("cors")



app.use(express.json())
app.use(cors())



const router = require("./router"); // Correctly import the router
app.use("/api/user", router);


app.get('/api', (req, res) => {
    res.json({ message : "User Services Running" });
  })




 
app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`);
});