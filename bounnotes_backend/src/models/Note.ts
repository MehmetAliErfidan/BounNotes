import mongoose, { Document, Schema } from "mongoose";
import { NOTE_RULES } from "../config/note.rules";

export interface INote extends Document {
  title: string;
  course: string;
  term: "spring" | "summer" | "fall";
  year: number;
  teacher: string;
  description: string;
  price: number;
  username: string;
  likeCount: number;
  dislikeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [
        NOTE_RULES.MAX_TITLE_LENGTH,
        `Title cannot exceed ${NOTE_RULES.MAX_TITLE_LENGTH} characters`,
      ],
    },
    course: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
    },
    term: {
      type: String,
      required: [true, "Term is required"],
      enum: ["spring", "summer", "fall"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [
        NOTE_RULES.MIN_YEAR,
        `Year must be at least ${NOTE_RULES.MIN_YEAR}`,
      ],
      max: [
        new Date().getFullYear() + NOTE_RULES.MAX_YEAR_OFFSET,
        `Year cannot be more than next academic year`,
      ],
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
      maxLength: [
        NOTE_RULES.MAX_DESCRIPTION_LENGTH,
        `Description cannot exceed ${NOTE_RULES.MAX_DESCRIPTION_LENGTH} characters`,
      ],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [
        NOTE_RULES.MIN_PRICE,
        `Price must be at least ₺${NOTE_RULES.MIN_PRICE}`,
      ],
      max: [
        NOTE_RULES.MAX_PRICE,
        `Price cannot exceed ₺${NOTE_RULES.MAX_PRICE}`,
      ],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    likeCount: {
      type: Number,
      default: 0,
      min: [0, "Like count cannot be negative"],
    },
    dislikeCount: {
      type: Number,
      default: 0,
      min: [0, "Dislike count cannot be negative"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<INote>("Note", noteSchema);
