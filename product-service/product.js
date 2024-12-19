const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const communicator = require("../communicator/communicate/order.communicator")
const { conn } = require("./config/database.connection")
const cors = require("cors")

app.use(express.json())
app.use(cors())

const routerProduct = require("./router")

app.use("/api/product",routerProduct)


app.get('/api', (req, res) => {
    res.json({ message : "Product Services Running" });
  });



   



app.listen(PORT, () => {
  console.log(`Product Service is running on port ${PORT}`);
});