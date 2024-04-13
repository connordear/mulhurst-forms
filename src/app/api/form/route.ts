import { Database } from "@/lib/supabase";
import { AllFormValues } from "@/lib/utils";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.from("programs").select();
  if (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify(data));
}

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  console.log(await supabase.auth.getUser());
  const values = (await req.json()) as AllFormValues;
  const { data: regData, error: regError } = await supabase
    .from("registrations")
    .insert({
      // ...values,
      paymentId: values.sessionId,
      addressLine1: values.address.line1,
      addressLine2: values.address.line2,
      city: values.address.city,
      stateProv: values.address.stateProv,
      postalZip: values.address.postalZip,
      country: values.address.country,
      program: values.program,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      birthdate: values.birthdate,
      daysOfWeek: values.daysOfWeek,
      allergies: values.allergies,
      allowedOverTheCounterMedications: values.allowedOverTheCounterMedications,
      arePhotosAllowed: values.arePhotosAllowed,
      dietaryRestrictions: values.dietaryRestrictions,
      doctorPhone: values.doctorPhone,
      epiPen: values.epiPen,
      familyDoctor: values.familyDoctor,
      friendCabinRequest: values.friendCabinRequest,
      gender: values.gender,
      hasBeenToCampBefore: values.hasBeenToCampBefore,
      healthCareNumber: values.healthCareNumber,
      height: values.height,
      howDidYouHearAboutUs: values.howDidYouHearAboutUs,
      medicalConditions: values.medicalConditions,
      medicationsTreatments: values.medicationsTreatments,
      other: values.other,
      parentSignature: values.parentSignature,
      swimmingLevel: values.swimmingLevel,
      tShirtSize: values.tShirtSize,
      weight: values.weight,
      siblingNameForDiscount: values.siblingNameForDiscount,
      regularMedicationsNotTakingAtCamp:
        values.regularMedicationsNotTakingAtCamp,
    })
    .select("id");

  console.log({ regData, regError });

  const { error: contactError } = await supabase
    .from("emergencyContacts")
    .insert(
      (values.contacts || []).map(
        (contact) =>
          ({
            email: contact.email,
            firstName: contact.firstName,
            lastName: contact.lastName,
            forCamper: regData?.[0]?.id,
            relationship: contact.relationship,
            phone: contact.phone,
          } as Database["public"]["Tables"]["emergencyContacts"]["Insert"])
      )
    );
  if (!contactError && !regError) {
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "content-type": "application/json",
      },
    });
  }
  return new Response(JSON.stringify(contactError ?? regError), {
    status: 500,
    headers: {
      "content-type": "application/json",
    },
  });
}
