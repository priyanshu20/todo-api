const express = require("express");
const router = express.Router();

// load controller
const { signup, login } = require("../../../controllers/user_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let {
	userValidation,
	loginValidation
} = require("../../../middlewares/validations");

// routes
router.post("/signup", userValidation, catchErrors(signup));
router.post("/login", loginValidation, catchErrors(login));

// export router
module.exports = router;
