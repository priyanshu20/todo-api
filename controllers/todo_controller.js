const Todo = require("../models/Todo");
const mongoose = require("mongoose");
const { sendSuccess, sendError } = require("../utility/helpers");
const { FORBIDDEN, NOT_FOUND, BAD_REQUEST } = require("../utility/statusCodes");

module.exports.getTodo = async (req, res) => {
	let todo = await Todo.find({ uid: req.user.id }).sort({
		createdAt: "desc"
	});
	sendSuccess(res, todo);
};

module.exports.getSingleTodo = async (req, res) => {
	let { tid } = req.params;
	if (!mongoose.Types.ObjectId.isValid(tid))
		return sendError(res, "Invalid Id", BAD_REQUEST);
	// uid is used querying so that one user can access only their own todo
	let todo = await Todo.findOne({ _id: tid, uid: req.user.id });
	if (!todo) return sendError(res, "Todo Not found!!", NOT_FOUND);
	sendSuccess(res, todo);
};

module.exports.addTodo = async (req, res) => {
	let { title, description } = req.body;
	let todo = new Todo({
		title,
		description,
		uid: req.user.id
	});
	todo = await todo.save();
	sendSuccess(res, todo);
};

module.exports.updateTodo = async (req, res) => {
	let { tid } = req.params;
	if (req.body.uid)
		return sendError(res, "Cannot change the user id", BAD_REQUEST);
	if (!mongoose.Types.ObjectId.isValid(tid))
		return sendError(res, "Invalid Id", BAD_REQUEST);
	let todo = await Todo.findOneAndUpdate(
		{ _id: tid, uid: req.user.id },
		{ $set: req.body },
		{ new: true }
	);
	if (!todo) {
		return sendError(res, "Todo not found!!", NOT_FOUND);
	}
	sendSuccess(res, todo);
};

module.exports.deleteTodo = async (req, res) => {
	let { tid } = req.params;
	if (!mongoose.Types.ObjectId.isValid(tid))
		return sendError(res, "Invalid Id", BAD_REQUEST);
	let todo = await Todo.findOneAndDelete({
		_id: tid,
		uid: req.user.id
	}).lean();
	if (!todo) {
		return sendError(res, "Todo not found!!", NOT_FOUND);
	}
	sendSuccess(res, null);
};
