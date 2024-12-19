const express = require("express")

const router = express.Router()

const { 
    ProductData,
    product_post 
} = require("./data.get.function")

const { auth_user } = require("../communicator/middleware/authenticate")


router.get("/data",auth_user,ProductData)
router.post("/post",product_post)

module.exports = router;

