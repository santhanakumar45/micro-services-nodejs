const communicator = require("../communicator/communicate/order.communicator")
const { conn } = require("./config/database.connection")



exports.ProductData = async(req,res) => {
    try {
        const ProductDatas = await conn.query(`SELECT * FROM "product"`)
        res.status(200).json(ProductDatas.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}



exports.product_post = async (req, res) => {
    try {
      const { product_name } =req.body;
    
      const insData = await conn.query(`INSERT INTO "product" (product_name) VALUES ($1)`,[product_name])
      res.status(200).json({ message: "Product Inserted Successfully" })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Sever Error'})
    }
};
