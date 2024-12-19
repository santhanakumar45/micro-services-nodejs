// const { conn } = require("../")
const jwtPackage = require("jsonwebtoken");
const communicate = require("../communicate/user.communicator")
const { jwtToken,refreshToken } = require("../middleware/authenticate")
const { decrypt,encrypt } = require("../utils/crypto")




const jwt = jwtPackage;

exports.refreshController = async (req, res) => {
  try {
    console.log(req.body)
    const { user_id, refresh_Token } = req.body;
    console.log("refresh_from_app",refresh_Token,user_id)

    const CheckUserExist = await communicate.SingleUserData(user_id)
    console.log("CheckU",CheckUserExist.message)

    if (CheckUserExist.message === 'User Not Exists') return res.status(400).json({ message: "user not exist" });

    const decryptToken = decrypt(refresh_Token);
    // console.log("decrptToken",decryptToken)
    
    const decoded = jwt.verify(decryptToken, process.env.SECERET_TOKEN);
    // console.log("decoded",decoded)

    const user = await communicate.SingleUserData(decoded.id)
    // console.log("useruser",user)

    console.log(user.message[0].id);
    if (user.message[0].id == user_id) {
      const token = await jwtToken(user_id);
      const refresh = await refreshToken(user_id);
      const encryptedToken = encrypt(refresh);

      return res.status(200).json({
        message: "successfully",
        token,
        encryptedToken,
      });
    } else {
      return res.status(500).json({
        message: "Refresh Token is not valid",
      });
    }
  } catch (error) {
    console.log(error.message);
    console.log("Unable to create a register");
  }
};
