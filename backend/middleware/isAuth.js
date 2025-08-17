import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    try {
        // ✅ Token सिर्फ cookie से लो
        const token = req.cookies?.user_token;

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // ✅ Token verify करो
        let verifyToken;
        try {
            verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        // ✅ userId को request में डालो
        req.userId = verifyToken.userId;
        next();

    } catch (error) {
        console.error("isAuth error", error);
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

export default isAuth;
