import jwt from 'jsonwebtoken'

//user authentication

const authDoctor = async (req, res, next) => {
    try {
        const dtoken = req.headers.dtoken;
       if(dtoken){
        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
        // console.log("decode",decoded)
        req.body.docId = decoded._id;
       }
        
        next();
    } catch (error) {
        res.status(401).send({
            message: `Please authenticate.${error}`,
            success: false
        });
    }
}

export default authDoctor