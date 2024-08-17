const userSignInController = require("./userSignUp");

async function userSignIn(req,res){
    try{

        const {email, password} = req.body

        if(!email){
            throw new Error("Please provide email")
        }
        if(!Password){
            throw new Error("Please provide password")
        }

        const user = await userModel.findOne({email})

        if(!user){
            throw new Error("user not found")
        }
    }catch(err){
        res.json({
            message: err.message || err  ,
            error: true,
            success: false,
          });
    }

}

module.exports = userSignINController