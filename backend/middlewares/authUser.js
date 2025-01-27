import jwt from 'jsonwebtoken'

//user authentication

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).send({
            message: `Please authenticate.${error}`,
            success: false
        });
    }
}

export default authUser