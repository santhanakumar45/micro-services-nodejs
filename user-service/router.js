const express = require("express")

const router = express.Router()
const { auth_user } = require("../communicator/middleware/authenticate")
const { refreshController } = require("../communicator/utils/refresh.token")

const { 
    AllUserData,
    SingleUserData,
    userPost,
    // CheckUserId
 } = require("./data.get.function")


router.get("/data",AllUserData)
router.get("/single/data/:user_id",SingleUserData)
router.post("/post",userPost)
// router.get("/checkUser/exists/:user_id",CheckUserId)


router.get("/sample", (req,res)=>{
    res.send("hii token valid")
})


router.post("/token",auth_user)

router.post("/refresh/token",refreshController)

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const { orderServicesCheck } = require("./data.get.function"); // Use destructuring for named export

// router.get("/sample", orderServicesCheck);

// module.exports = { router };
