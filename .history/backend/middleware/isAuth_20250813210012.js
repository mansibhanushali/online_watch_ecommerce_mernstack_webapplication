import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies;

        // Token missing
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify token
        let verifyToken;
        try {
            verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Attach userId to request
        req.userId = verifyToken.userId;
        next();

    } catch (error) {
        console.error("isAuth error", error);
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

export default isAuth;
