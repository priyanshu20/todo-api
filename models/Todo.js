const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
	{
		uid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		title: { type: String, required: true },
		description: { type: String }
	},
	{ timestamps: true }
);

module.exports = Todo = mongoose.model("Todo", TodoSchema);
