import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  userId: String,

  title: {
    type: String,
    required: true,
  },

  note: {
    type: String,
    default: "",
  },

  startDate: {
    type: String,
  },

  completedDates: [String],

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },

  color: {
    type: String,
    default: "#3b82f6", // blue
  },

  icon: {
    type: String, // emoji or icon name
    default: "🎯",
  },
});

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;