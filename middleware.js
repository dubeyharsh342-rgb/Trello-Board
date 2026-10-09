
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({
            message: "Token is required"
        });
    }

    try {
        const decoded = jwt.verify(token, "harsh123321");
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Token is incorrect or expired"
        });
    }
}

module.exports = {
    authMiddleware: authMiddleware
};
