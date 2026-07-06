import mongoose from "mongoose";

const flightBookingSchema = new mongoose.Schema(
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
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    flightDate: {
      type: Date,
      required: true,
    },
    passengers: {
      type: Number,
      required: true,
      min: [1, "Must book at least 1 passenger"],
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

export default mongoose.model("FlightBooking", flightBookingSchema);
