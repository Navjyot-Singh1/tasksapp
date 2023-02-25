const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: false,
    default: false,
  },
  timestamp: {
    type: String,
    default: Date.now,
    required: false,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
