import MullyForm from "@/components/MullyForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-4">
        Mulhurst Camp Registration Form
      </h1>
      <MullyForm />
    </main>
  );
}
