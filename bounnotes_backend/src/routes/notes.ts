import express, { Request, Response } from "express";
import Note from "../models/Note";
import { error } from "console";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      course: req.body.course,
      teacher: req.body.teacher,
      description: req.body.description,
      price: req.body.price,
      username: "test-user",
      rating: 0,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
