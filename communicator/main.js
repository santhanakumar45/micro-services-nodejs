require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { notFound,errorHandler } = require("./middleware/errorHandler")
const { jwtToken } = require("./middleware/authenticate")
const cors = require("cors")

app.use(express.json())
app.use(cors())




app.get('/api', (req, res) => {
    res.json({ message : "Communicator Services Running" });
  });




app.use(notFound)
app.use(errorHandler)
  


app.listen(PORT, () => {
  console.log(`Communicator Service is running on port ${PORT}`);
});