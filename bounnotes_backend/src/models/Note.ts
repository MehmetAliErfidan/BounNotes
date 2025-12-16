import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
  title: string;
  course: string;
  teacher: string;
  description: string;
  price: number;
  username: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [100, "Title cannot exceed 100 characters"],
    },
    course: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
    },
    teacher: {
      type: String,
      required: [true, "Instructor name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxLength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [20, "Price must be at least 20 TL"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INote>("Note", noteSchema);
