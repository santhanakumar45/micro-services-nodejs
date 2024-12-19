
const axios = require("axios");


exports.userServicesUrl = axios.create({ baseURL:"http://localhost:3001" })
exports.productServicesUrl = axios.create({baseURL:"http://localhost:3002"})
exports.orderServicesUrl = axios.create({baseURL:"http://localhost:3003"})



