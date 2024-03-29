import MullyForm from "@/components/MullyForm";
import { Card, CardHeader } from "@/components/ui/card";

export default async function Home() {
  return (
    <main className="md:flex min-h-screen flex-col items-center md:p-24 p-10 bg-gradient">
      <Card className="mb-10">
        <CardHeader>
          <h1 className="text-4xl font-bold color-white text-center">
            Mulhurst Camp Registration Form
          </h1>
        </CardHeader>
      </Card>
      <MullyForm />
    </main>
  );
}
