import { Database } from "@/lib/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { log } from "console";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });
  if (!req.body) {
    return new Response(JSON.stringify({ error: "No body" }), {
      status: 400,
    });
  }
  const values = (await req.json()) as { password: string };
  if (!values.password) {
    return new Response(JSON.stringify({ error: "No password" }), {
      status: 400,
    });
  }
  if (values.password !== process.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: "Incorrect password" }), {
      status: 401,
    });
  }

  const { data, error } = await supabase.from("registrations").select(
    `
    id,
    firstName,
    lastName,
    email,
    birthdate,
    program (name),
    daysOfWeek
    `
  );
  const { data: emergencyContacts, error: emergencyContactsError } =
    await supabase.from("emergencyContacts").select(
      `
    id,
    firstName,
    lastName,
    email,
    phone,
    relationship,
    forCamper
    `
    );
  if (emergencyContactsError || error) {
    log(emergencyContactsError || error);
    return new Response(
      JSON.stringify({
        error: (error ?? emergencyContactsError ?? { message: "unknown" })
          .message,
      }),
      {
        status: 500,
      }
    );
  }

  log(data, emergencyContacts);
  data.forEach((row: any) => {
    row.emergencyContacts = emergencyContacts.filter(
      (contact: any) => contact.forCamper === row.id
    );
  });

  return new Response(JSON.stringify(data));
}
