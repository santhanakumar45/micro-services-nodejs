const productServicesUrl = require("../services/axios")


// product detail
async function productServicefun() {
    const response = await productServicesUrl.get("/products")
    return response.data
}


// product detail get
async function AllProductList() {
    const response = await productServicesUrl.get("/api/product/data")
    return response.data
}


module.exports = { 
    productServicefun,
    AllProductList 
}