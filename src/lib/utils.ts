import { createBrowserClient } from "@supabase/ssr";
import { clsx, type ClassValue } from "clsx";
import { useAtomValue } from "jotai";
import { twMerge } from "tailwind-merge";
import { camperInfoAtom } from "./camper";
import { contactInfoAtom } from "./emergencyContacts";
import { medicalInfoAtom } from "./medical";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useSubmitForm() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const camperData = useAtomValue(camperInfoAtom);
  const medicalData = useAtomValue(medicalInfoAtom);
  const contactData = useAtomValue(contactInfoAtom);

  const values = {
    ...camperData,
    ...medicalData,
    ...contactData,
  };

  async function submit() {
    const { error } = await supabase.from("registrations").insert([
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        birthdate: values.birthdate,
        addressLine1: values.address.line1,
        addressLine2: values.address.line2,
        city: values.address.city,
        stateProv: values.address.stateProv,
        postalZip: values.address.postalZip,
        country: values.address.country,
      },
    ]);
    console.log("res", error);
    return error;
  }
  return submit;
}
