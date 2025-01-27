import jwt from 'jsonwebtoken'

//admin authtication
const authAdmin = async (req, res, next) =>{
    try {
        const {atoken} = req.headers
        if(!atoken){
            return res.json({
                success:false,
                message:"not authorized login again try"
            })
        }
        const decode = jwt.verify(atoken, process.env.JWT_SECRET)

        if(decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASS ){
            return res.json({
                success:false,
                message:"not authorized login again try"
            })
        
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

export default authAdmin