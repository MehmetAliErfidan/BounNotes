import { Router } from "express";
import {
  findAllNotesRows,
  findNoteRowById,
  createNote,
  updateNoteById,
  delistNoteById,
} from "./notes.repository";
import {
  mapNoteRowsToNoteListItems,
  mapNoteRowToNoteListItem,
} from "./notes.mapper";
import { NOTE_RULES } from "../../config/note.rules";

const notesRouter = Router();
const VALID_TERMS = new Set(["spring", "summer", "fall"]);

notesRouter.get("/", async (req, res) => {
  try {
    const rows = await findAllNotesRows();
    const notes = mapNoteRowsToNoteListItems(rows);
    res.json(notes);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

notesRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "invalid id" });
  }

  try {
    const noteRow = await findNoteRowById(id);

    if (!noteRow) {
      return res.status(404).json({ error: "note not found" });
    }
    const note = mapNoteRowToNoteListItem(noteRow);
    return res.json(note);
  } catch (error) {
    console.error("Failed to fetch note:", error);
    res.status(500).json({ error: "Failed to fetch note" });
  }
});

notesRouter.post("/", async (req, res) => {
  const { title, course, term, year, teacher, description, price } =
    req.body ?? {};

  const safeTitle = typeof title === "string" ? title.trim() : "";
  const safeCourse = typeof course === "string" ? course.trim() : "";
  const safeTerm = typeof term === "string" ? term.trim() : "";
  const safeTeacher = typeof teacher === "string" ? teacher.trim() : "";
  const safeDescription =
    typeof description === "string" ? description.trim() : "";
  const yearNumber = Number(year);
  const priceNumber = Number(price);

  if (
    !safeTitle ||
    !safeCourse ||
    !safeTerm ||
    !safeTeacher ||
    !safeDescription
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  if (!VALID_TERMS.has(safeTerm)) {
    return res.status(400).json({ error: "Invalid term" });
  }

  if (!Number.isInteger(yearNumber) || yearNumber < NOTE_RULES.MIN_YEAR) {
    return res.status(400).json({ error: "Invalid year" });
  }

  if (
    !Number.isFinite(priceNumber) ||
    priceNumber < NOTE_RULES.MIN_PRICE ||
    priceNumber > NOTE_RULES.MAX_PRICE
  ) {
    return res.status(400).json({ error: "Invalid price" });
  }

  if (safeTitle.length > NOTE_RULES.MAX_TITLE_LENGTH) {
    return res.status(400).json({ error: "Title is too long" });
  }

  if (safeDescription.length > NOTE_RULES.MAX_DESCRIPTION_LENGTH) {
    return res.status(400).json({ error: "Description is too long" });
  }

  try {
    const noteRow = await createNote({
      ownerId: 1, // Temporary until auth is implemented.
      title: safeTitle,
      course: safeCourse,
      term: safeTerm as "spring" | "summer" | "fall",
      year: yearNumber,
      teacher: safeTeacher,
      description: safeDescription,
      price: priceNumber,
    });

    const note = mapNoteRowToNoteListItem(noteRow);
    return res.status(201).json(note);
  } catch (error) {
    console.error("Failed to create note:", error);
    return res.status(500).json({ error: "Failed to create note" });
  }
});

notesRouter.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Id must be a number" });
    }
    const existingNoteRow = await findNoteRowById(id);

    if (!existingNoteRow) {
      return res.status(404).json({ error: "Note not found" });
    }

    const body = req.body ?? {};
    const hasTitle = body.title !== undefined;
    const hasCourse = body.course !== undefined;
    const hasTerm = body.term !== undefined;
    const hasTeacher = body.teacher !== undefined;
    const hasDescription = body.description !== undefined;
    const hasYear = body.year !== undefined;
    const hasPrice = body.price !== undefined;

    const hasAnyField =
      hasTitle ||
      hasCourse ||
      hasTerm ||
      hasTeacher ||
      hasDescription ||
      hasYear ||
      hasPrice;

    if (!hasAnyField) {
      return res.status(400).json({
        error:
          "No fields provided to update. Please include at least one of: title, course, term, teacher, description, year, price.",
      });
    }

    if (
      hasTitle &&
      (typeof body.title !== "string" || body.title.trim().length === 0)
    ) {
      return res.status(400).json({
        error: "title must be a non-empty string",
      });
    }

    if (
      hasCourse &&
      (typeof body.course !== "string" || body.course.trim().length === 0)
    ) {
      return res
        .status(400)
        .json({ error: "course must be a non-empty string" });
    }

    if (
      hasTerm &&
      (typeof body.term !== "string" || body.term.trim().length === 0)
    ) {
      return res.status(400).json({ error: "term must be a non-empty string" });
    }

    if (
      hasTeacher &&
      (typeof body.teacher !== "string" || body.teacher.trim().length === 0)
    ) {
      return res
        .status(400)
        .json({ error: "teacher must be a non-empty string" });
    }

    if (
      hasDescription &&
      (typeof body.description !== "string" ||
        body.description.trim().length === 0)
    ) {
      return res
        .status(400)
        .json({ error: "description must be a non-empty string" });
    }

    if (hasTitle) {
      if (body.title.length > NOTE_RULES.MAX_TITLE_LENGTH) {
        return res.status(400).json({
          error: `Title must not exceed ${NOTE_RULES.MAX_TITLE_LENGTH} characters`,
        });
      }
      body.title = body.title.trim();
    }

    if (hasCourse) {
      body.course = body.course.trim();
    }

    if (hasTerm) {
      body.term = body.term.trim().toLowerCase();
    }

    if (hasTerm && !VALID_TERMS.has(body.term)) {
      return res
        .status(400)
        .json({ error: "term must be one of: fall, spring, summer" });
    }

    if (hasTeacher) {
      body.teacher = body.teacher.trim();
    }

    if (hasDescription) {
      if (body.description.length > NOTE_RULES.MAX_DESCRIPTION_LENGTH) {
        return res.status(400).json({
          error: `Description must not exceed ${NOTE_RULES.MAX_DESCRIPTION_LENGTH} characters`,
        });
      }
      body.description = body.description.trim();
    }

    if (hasYear) {
      const parsedYear =
        typeof body.year === "string" ? Number(body.year.trim()) : body.year;

      if (!Number.isInteger(parsedYear)) {
        return res.status(400).json({ error: "year must be a valid integer" });
      }

      const maxAllowedYear =
        new Date().getFullYear() + NOTE_RULES.MAX_YEAR_OFFSET;

      if (parsedYear < NOTE_RULES.MIN_YEAR || parsedYear > maxAllowedYear) {
        return res.status(400).json({
          error: `Year must be between ${NOTE_RULES.MIN_YEAR} and ${maxAllowedYear}`,
        });
      }
      body.year = parsedYear;
    }

    if (hasPrice) {
      const parsedPrice =
        typeof body.price === "string" ? Number(body.price.trim()) : body.price;
      if (!Number.isFinite(parsedPrice)) {
        return res.status(400).json({ error: "price must be a valid number" });
      }

      if (
        parsedPrice < NOTE_RULES.MIN_PRICE ||
        parsedPrice > NOTE_RULES.MAX_PRICE
      ) {
        return res.status(400).json({
          error: `Price must be at least ${NOTE_RULES.MIN_PRICE} and at most ${NOTE_RULES.MAX_PRICE}`,
        });
      }

      body.price = parsedPrice;
    }

    const finalInput = {
      title: hasTitle ? body.title : existingNoteRow.title,
      course: hasCourse ? body.course : existingNoteRow.course,
      term: (hasTerm ? body.term : existingNoteRow.term) as
        | "spring"
        | "summer"
        | "fall",
      year: hasYear ? body.year : existingNoteRow.year,
      teacher: hasTeacher ? body.teacher : existingNoteRow.teacher,
      description: hasDescription
        ? body.description
        : existingNoteRow.description,
      price: hasPrice ? body.price : Number(existingNoteRow.price),
    };

    const updatedNote = await updateNoteById(id, finalInput);

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    const responseItem = mapNoteRowToNoteListItem(updatedNote);
    return res.status(200).json(responseItem);
  } catch (err) {
    console.error("PATCH /notes/:id error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

notesRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid id parameter" });
  }

  try {
    // TODO: Auth control to implement

    const delistNote = await delistNoteById(id);
    if (!delistNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    return res.status(200).json({ message: "Note removed from marketplace" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default notesRouter;
