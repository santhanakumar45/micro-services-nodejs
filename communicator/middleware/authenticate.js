require('dotenv').config();

const jwtPackage = require("jsonwebtoken");

const jwt = jwtPackage;


const jwtToken = async function (Userid) { 
  console.log(Userid);
  return jwt.sign({ id: Userid }, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });
};

const refreshToken = async function (Userid) {
  return jwt.sign({ id: Userid }, process.env.SECERET_TOKEN, {
    expiresIn: "10d",
  });
};


const auth_user = (req, res, next) => {
  try {
    console.log("req.token", req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token found in the Authorization header" });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Token verification error", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  auth_user,
  jwtToken,
  refreshToken
}

