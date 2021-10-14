const express = require("express");
const router = express.Router();

// load controller
// const { index } = require("../../../controllers/index_controller");
const {
	getTodo,
	getSingleTodo,
	addTodo,
	updateTodo,
	deleteTodo
} = require("../../../controllers/todo_controller");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
let { allAuth } = require("../../../middlewares/auth");
let { addTodoValidation } = require("../../../middlewares/validations");
const { sendSuccess } = require("../../../utility/helpers");

// routes
router.get("/", allAuth, getTodo);
router.get("/:tid", allAuth, getSingleTodo);
router.post("/", allAuth, addTodoValidation, addTodo);
router.put("/:tid", allAuth, updateTodo);
router.delete("/:tid", allAuth, deleteTodo);

// export router
module.exports = router;
