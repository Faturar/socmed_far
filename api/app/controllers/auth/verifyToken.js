import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
    if(req.headers['authorization']) {
        const token = req.headers['authorization'].substring(7);

        try {        
            const verify = jwt.verify(token, process.env.JWT_SECRET);

            if(verify) {
                return next();
            } else {
                return res.status(403).json({
                    status: false,
                    message: "Token not valid!",
                })
            }
        } catch(err) {
            return res.status(403).json({status: false, err: err.message})
        }
    } else {
        return res.status(403).json({status: false, message: "Login to get token"})
    }
}