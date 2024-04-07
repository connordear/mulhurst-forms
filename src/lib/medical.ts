import { atomWithStorage } from "jotai/utils";
import { z } from "zod";

export const medicalFormSchema = z.object({
  allergies: z.string().min(0).max(500, "Must be less than 500 characters"),
  medications: z.string().min(0).max(500, "Must be less than 500 characters"),
  medicalConditions: z
    .string()
    .min(0)
    .max(500, "Must be less than 500 characters"),
  dietaryRestrictions: z
    .string()
    .min(0)
    .max(500, "Must be less than 500 characters"),
  other: z.string().min(0).max(500, "Must be less than 500 characters"),
  areOverTheCounterMedicationsAllowed: z.boolean(),
});

export type MedicalInfo = z.infer<typeof medicalFormSchema>;

export const defaultMedicalInfo: MedicalInfo = {
  allergies: "",
  medications: "",
  medicalConditions: "",
  dietaryRestrictions: "",
  other: "",
  areOverTheCounterMedicationsAllowed: true,
};

export const medicalInfoAtom = atomWithStorage<MedicalInfo>(
  "medicalInfo",
  defaultMedicalInfo
);
