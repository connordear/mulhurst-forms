import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { CamperInfo } from "../../../lib/camper";
import { EmergencyContact } from "../../../lib/emergencyContacts";
import { MedicalInfo } from "../../../lib/medical";

type AllFormValues = CamperInfo &
  MedicalInfo &
  EmergencyContact & { sessionId: string };

export async function GET() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
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
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });
  console.log("req", req);
  const values = (await req.json()) as AllFormValues;

  const { error } = await supabase.from("registrations").insert([
    {
      paymentId: values.sessionId,
      program: values.program,
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
  if (!error) {
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "content-type": "application/json",
      },
    });
  }
  return new Response(JSON.stringify({ error }), {
    status: 500,
    headers: {
      "content-type": "application/json",
    },
  });
}
