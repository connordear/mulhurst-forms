import { atomWithStorage } from "jotai/utils";
import { z } from "zod";

export const addressSchema = z.object({
  line1: z.string().min(1, { message: "Address is required" }).max(100),
  line2: z.string().min(0).max(100),
  city: z.string().min(1, { message: "City is required" }).max(50),
  stateProv: z
    .string()
    .min(2, { message: "State/Province is required" })
    .max(2, { message: "Please use your state/province 2-letter code" }),
  postalZip: z
    .string()
    .min(5, { message: "Postal/ZIP Code is required" })
    .max(10, { message: "Invalid Postal/ZIP Code" }),
  country: z.string().min(2, { message: "Country is required" }).max(50),
});

export const camperFormSchema = z.object({
  program: z.number().min(1, { message: "Program is required" }),
  daysOfWeek: z.optional(z.array(z.string())),
  email: z.string().email(),
  firstName: z.string().min(1, { message: "First Name is required" }).max(50),
  lastName: z.string().min(1, { message: "Last Name is required" }).max(50),
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}/, { message: "Invalid date" }),
  address: addressSchema,
  arePhotosAllowed: z.boolean(),
  swimmingLevel: z.string().min(1, { message: "Swimming Level is required" }),
  hasBeenToCampBefore: z.boolean(),
  howDidYouHearAboutUs: z.string().min(1, { message: "Required" }),
  friendCabinRequest: z.string().min(0).max(50),
  gender: z.string().min(1, { message: "Required" }),
  tShirtSize: z.string().min(1, { message: "T-Shirt Size is required" }),
});

export type CamperInfo = z.infer<typeof camperFormSchema>;

export const defaultCamperInfo: CamperInfo = {
  program: 0,
  daysOfWeek: undefined,
  email: "",
  firstName: "",
  lastName: "",
  birthdate: "2000-01-01",
  address: {
    line1: "",
    line2: "",
    city: "",
    stateProv: "AB",
    postalZip: "",
    country: "CA",
  },
  arePhotosAllowed: true,
  swimmingLevel: "",
  hasBeenToCampBefore: false,
  howDidYouHearAboutUs: "",
  friendCabinRequest: "",
  gender: "",
  tShirtSize: "",
};

export const camperInfoAtom = atomWithStorage<CamperInfo>(
  "camperInfo",
  defaultCamperInfo
);
