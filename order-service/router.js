const express = require("express")

const router = express.Router()

const { 
    UserIdToGetUserOrders,
    orderpost,
    TokenVerifyPost 
} = require("./data.get.function")


router.get("/order/detail/:user_id",UserIdToGetUserOrders)
router.post("/post",orderpost)
router.get("/check",TokenVerifyPost)

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const { orderServicesCheck } = require("./data.get.function"); // Use destructuring for named export

// router.get("/sample", orderServicesCheck);

// module.exports = { router };
