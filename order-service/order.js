const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;
const  communicator  = require("../communicator/communicate/order.communicator")
const { conn } = require("./config/database.connection")
const cors = require("cors")

app.use(express.json())
app.use(cors())


const orderRouter = require("./router")

app.use("/api/order",orderRouter)

app.get('/api', (req, res) => {
    res.json({ message : "Order Services Running" });
  });

  




app.listen(PORT, () => {
  console.log(`Order Service is running on port ${PORT}`);
});