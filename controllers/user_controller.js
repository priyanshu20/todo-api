// import http status codes
const {
	BAD_REQUEST,
	NOT_AUTHORIZED,
	FORBIDDEN,
	NOT_FOUND,
	NOT_ACCEPTABLE
} = require("../utility/statusCodes");
// import helper functions
const { sendError, sendSuccess } = require("../utility/helpers");

module.exports.signup = async (req, res) => {
	let { name, email, password } = req.body;
	let user = await User.findOne({ email });
	console.log(user);
	if (user)
		return sendError(
			res,
			"User already exists with that username",
			BAD_REQUEST
		);
	user = new User({ name, email, password });
	user = await user.save();
	sendSuccess(res, "User Created");
};

module.exports.login = async (req, res) => {
	let { email, password } = req.body;
	let user = await User.findOne({ email });
	if (!user) return sendError(res, "User not found", NOT_FOUND);
	if (!user.isValidPwd(password))
		return sendError(res, "Login creds invalid", BAD_REQUEST);
	token = user.generateAuthToken();
	res.cookie("auth-token", token);
	sendSuccess(res, "Logged In!");
};
