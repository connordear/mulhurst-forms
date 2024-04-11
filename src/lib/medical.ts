import { atomWithStorage } from "jotai/utils";
import { z } from "zod";

export const NO_ALLERGIES = "No, my child does not have any allergies.";
export const NO_EPIPEN = "No, my child does not require an EpiPen.";
export const NO_MEDICATIONS_TREATMENTS =
  "No, my child does not require any medications or treatments.";

export const medicalFormSchema = z.object({
  healthCareNumber: z
    .string()
    .min(1, "Health care number is required")
    .max(50, "Must be less than 50 characters"),
  familyDoctor: z.string().min(0).max(50, "Must be less than 50 characters"),
  doctorPhone: z.string().min(0).max(50, "Must be less than 50 characters"),
  height: z.string().min(0).max(50, "Must be less than 50 characters"),
  weight: z.string().min(0).max(50, "Must be less than 50 characters"),
  allergies: z.string().min(0).max(500, "Must be less than 500 characters"),
  epiPen: z.string().min(0).max(500, "Must be less than 500 characters"),
  medicationsTreatments: z
    .string()
    .min(0)
    .max(500, "Must be less than 500 characters"),
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
  healthCareNumber: "",
  familyDoctor: "",
  doctorPhone: "",
  height: "",
  weight: "",
  allergies: NO_ALLERGIES,
  epiPen: NO_EPIPEN,
  medicationsTreatments: NO_MEDICATIONS_TREATMENTS,
  medicalConditions: "",
  dietaryRestrictions: "",
  other: "",
  areOverTheCounterMedicationsAllowed: true,
};

export const medicalInfoAtom = atomWithStorage<MedicalInfo>(
  "medicalInfo",
  defaultMedicalInfo
);
