const { conn } = require("./config/database.connection")
const { jwtToken,refreshToken } = require("../communicator/middleware/authenticate")
const { encrypt } = require("../communicator/utils/crypto")


exports.AllUserData = async(req,res) => {
    try {
        const UserDatas = await conn.query(`SELECT * FROM "user"`)
        res.status(200).json(UserDatas.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}


// single user data
exports.SingleUserData = async(req,res) => {
    try {
        const { user_id } = req.params;
        const SingleData = await conn.query(`SELECT * FROM "user" WHERE id = $1 `,[user_id])
        console.log("singledata",SingleData.rows)

        if (!SingleData.rows[0]) { 
          return res.json({ message: "User Not Exists" }) 
        }
        res.status(200).json({ message: SingleData.rows })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

exports.userPost = async (req, res) => {
try {
  const { name,mobileno } =req.body;

  const insData = await conn.query('INSERT INTO "user" ( name,mobileno ) VALUES ($1,$2) RETURNING *',[name,mobileno])
  console.log("insData",insData.rows[0].id)

  const token = await jwtToken(insData.rows[0].id);
  const refresh = await refreshToken(insData.rows[0].id);
  const encryptedToken = encrypt(refresh);
  const options = { httpOnly: true };

  return res
    .status(200)
    .cookie("token", token, options)
    .json({
      message: "Data Inserted Successfully",
      Data: {
        name: insData.rows[0].name,
        id: insData.rows[0].id,
        mobileno: insData.rows[0].mobileno,
      },
      token,
      encryptedToken,
    });
} catch (error) {
  console.log(error)
  res.status(500).json({ message: 'Internal Sever Error'})
}
};


// // UserId check 
// exports.CheckUserId = async(req,res) => {
//   try {
//     const { user_id } = req.params;
//       const userExist = await conn.query(`SELECT * FROM "user" WHERE id = $1` ,[user_id])
//       if (!userExist.rows) res.json({ message: "User Not Exists" })
//       res.status(200).json(userExist.rows)
//   } catch (error) {
//       console.log(error)
//       res.status(500).json({ message: error })
//   }
// }