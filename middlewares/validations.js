const { sendError } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");

let emailRegex = /^\S+@\S+\.\S+/,
	passwordRegex = /^[\S]{8,}/;

module.exports.userValidation = (req, res, next) => {
	let { name, email, password } = req.body;

	if (!name) return sendError(res, "Name is not provided.", BAD_REQUEST);
	if (!email || !emailRegex.test(String(email).trim()))
		return sendError(res, "Email is not valid.", BAD_REQUEST);
	if (!password || !passwordRegex.test(String(password).trim()))
		return sendError(
			res,
			"Password should be atleast 8 characters long.",
			BAD_REQUEST
		);
	return next();
};

module.exports.loginValidation = (req, res, next) => {
	let { email, password } = req.body;
	if (!email || !password)
		return sendError(res, "Please provide all the fields", BAD_REQUEST);
	if (!emailRegex.test(String(email).trim()))
		return sendError(res, "Email is not valid.", BAD_REQUEST);
	if (!passwordRegex.test(String(password).trim()))
		return sendError(res, "Password not valid!", BAD_REQUEST);

	return next();
};

module.exports.addTodoValidation = (req, res, next) => {
	let { title } = req.body;
	if (!title)
		return sendError(res, "Please provide title for the todo", BAD_REQUEST);
	return next();
};
