
const { 
    userServicesUrl,
} = require("../services/axios")





async function AllUserData() {
    const response = await userServicesUrl.get("/api/user/data")
    return response.data
}

// single user data
async function SingleUserData(user_id) {
    const response = await userServicesUrl.get(`/api/user/single/data/${user_id}`)
    return response.data
}


// user verification using auth
async function authToken() {
    const response = await userServicesUrl.get(`/api/user/token`)
    return response.data
}

// sample auth
async function sampleToken() {
    const response = await userServicesUrl.get(`/api/user/sample`)
    return response.data
}

module.exports = { AllUserData,SingleUserData,authToken,sampleToken }



