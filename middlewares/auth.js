const jwt = require("jsonwebtoken");
const { sendError } = require("../utility/helpers");
const { NOT_AUTHORIZED, FORBIDDEN } = require("../utility/statusCodes");

module.exports.allAuth = (req, res, next) => {
	// const token = req.header("x-auth-token");
	const token = req.cookies["auth-token"];
	if (!token)
		return sendError(
			res,
			"Access denied. No Token provided",
			NOT_AUTHORIZED
		);
	const decodedPayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
	req.user = decodedPayload;
	return next();
};