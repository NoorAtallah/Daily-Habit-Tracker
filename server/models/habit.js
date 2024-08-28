const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  tags: [String],
  frequency: { type: String, required: true }, // e.g., daily, weekly
  progress: [{ date: Date, completed: Boolean }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Habit', HabitSchema);
