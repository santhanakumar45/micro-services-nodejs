
const { 
    orderServicesUrl 
} = require("../services/axios")




// user data with order detail
async function UserDataWithOrderDetail() {
    const response = await orderServicesUrl.get("/api/user/order/detail")
    return response.data
}


// order detail get
async function orderServicefun() {
    const response = await orderServicesUrl.get("/orders")
    return response.data
}









module.exports = {
    UserDataWithOrderDetail,
    orderServicefun
}


