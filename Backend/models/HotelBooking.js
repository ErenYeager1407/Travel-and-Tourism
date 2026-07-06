import mongoose from "mongoose";

const hotelBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return this.startDate <= value;
        },
        message: "End date (check-out) must be after start date (check-in)",
      },
    },
    guests: {
      type: Number,
      required: true,
      min: [1, "Must book for at least 1 guest"],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    status: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED", "COMPLETED"],
      default: "CONFIRMED",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("HotelBooking", hotelBookingSchema);
