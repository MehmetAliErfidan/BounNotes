import type { FormNote } from "./note.types";
import { NOTE_RULES } from "./note.rules";

export function validateNote(
  note: FormNote,
  images: File[] = [],
  pdfFile: File | null = null,
) {
  const currentYear = new Date().getFullYear();

  // YEAR
  const yearNumber = Number(note.year);
  const isYearFilled = note.year !== "";
  const isYearInvalid =
    isYearFilled &&
    (yearNumber < NOTE_RULES.MIN_YEAR ||
      yearNumber > currentYear + NOTE_RULES.MAX_YEAR_OFFSET);

  // PRICE
  const priceNumber = Number(note.price);
  const isPriceFilled = note.price !== "";
  const isPriceInvalid = isPriceFilled && priceNumber < NOTE_RULES.MIN_PRICE;

  // REQUIRED FIELDS (note)
  const isNoteFieldsValid =
    Boolean(note.course) &&
    Boolean(note.term) &&
    Boolean(note.teacher) &&
    Boolean(note.title) &&
    Boolean(note.description) &&
    isYearFilled &&
    !isYearInvalid &&
    isPriceFilled &&
    !isPriceInvalid;

  // FILES
  const areFilesValid =
    images.length >= NOTE_RULES.MIN_IMAGES && pdfFile !== null;

  const canSubmit = isNoteFieldsValid && areFilesValid;

  return {
    canSubmit,
    currentYear,
    year: { isFilled: isYearFilled, isInvalid: isYearInvalid },
    price: { isFilled: isPriceFilled, isInvalid: isPriceInvalid },
    files: {
      imagesCount: images.length,
      hasPdf: pdfFile !== null,
      canSubmit: areFilesValid,
    },
  };
}
