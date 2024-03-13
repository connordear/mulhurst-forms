import { atomWithStorage } from "jotai/utils";
import { z } from "zod";

export const relationshipOptions = [
  "Mother",
  "Father",
  "Guardian",
  "Grandparent",
  "Caregiver",
  "Other",
] as const;

export const contactSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z.string().min(10).max(15),
  relationship: z.enum(relationshipOptions).optional(),
});

export type Contact = z.infer<typeof contactSchema>;

const defaultContactFields: Contact = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

export const emergencyContactsSchema = z.object({
  contacts: z.array(contactSchema),
});

export type EmergencyContact = z.infer<typeof emergencyContactsSchema>;

export const defaultEmergencyContactInfo: EmergencyContact = {
  contacts: [defaultContactFields, defaultContactFields, defaultContactFields],
};

export const contactInfoAtom = atomWithStorage<EmergencyContact>(
  "emergencyContacts",
  defaultEmergencyContactInfo
);
