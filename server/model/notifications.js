const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
    },
    date: {
      type: Object,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("notifications", NotificationSchema);
