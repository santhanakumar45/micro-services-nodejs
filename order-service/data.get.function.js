const { conn } = require("./config/database.connection")
const communicator  = require("../communicator/communicate/user.communicator")


exports.UserIdToGetUserOrders = async(req,res) => {
    try {
        console.log("Hitting")
        const { user_id } = req.params;
        const userdata = await communicator.AllUserData()
        // const Productdata = await communicator.AllProductList()
        const OrderDatas = await conn.query(`SELECT * FROM "order" WHERE user_id = $1`,[user_id])
        // console.log("UserData",OrderDatas.rows)
        // console.log("Productdata",Productdata)

        const detailedUserOrders = OrderDatas.rows.map(order => {
             
            const orderData = userdata.find( user => user.id === order.user_id )

            // const ProductData = Productdata.find( product => product.product_id === order.product_id )

            if(orderData ) return {...orderData,order}
        })

        res.status(200).json({ Data : detailedUserOrders })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}



exports.orderpost  = async (req, res) => {
    try {
      const { user_id,product_id } =req.body;
    
      const insData = await conn.query(`INSERT INTO "order" (user_id,product_id) VALUES ($1,$2)`,[user_id,product_id])
      const userdata = await communicator.SingleUserData(user_id)
      console.log("order_post_user-data",userdata)
      // const userData = await communicator.
      res.status(200).json({ message: "Order Inserted Successfully", Data:userdata })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Sever Error'})
    }
};

exports.TokenVerifyPost  = async (req, res) => {
    console.log(req.header)
    try {
      const userdata = await communicator.sampleToken()
    //   console.log("order_post_user-data",userdata)
      // const userData = await communicator.
      res.status(200).json({ message: "Token Verification Successfully", Data:userdata })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Sever Error'})
    }
};


