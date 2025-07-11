import { z } from "zod";

export const classificacaoSchema = z.enum([
  "Unknown",
  "PhrasalVerb",
  "Noun",
  "Verb",
  "Adjective",
  "Adverb",
]);

export const dificultySchema = z.enum(["EASY", "MEDIUM", "HARD"]);
