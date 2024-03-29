"use client";
import { LoadingPage } from "@/components/LoadingCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getPaymentStatus } from "@/lib/api";
import { contactInfoAtom } from "@/lib/emergencyContacts";
import { useSubmitForm } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";

const SubmitPage = () => {
  const formValues = useAtomValue(contactInfoAtom);
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const submit = useSubmitForm(session_id);

  const { data, isLoading } = useQuery({
    queryKey: ["paymentStatus", session_id],
    queryFn: () => getPaymentStatus(session_id!),
    enabled: session_id !== null,
  });

  useEffect(() => {
    if (data && data.status === "complete") {
      submit.mutateAsync();
    }
  }, [data]);

  const text = useMemo(() => {
    if (submit.isPending || isLoading) return "Submitting...";
    if (submit.isError) return "Error submitting form.";
    if (submit.isSuccess) return "Form submitted successfully!";
    return JSON.stringify(formValues);
  }, [submit, formValues, isLoading]);

  const navToHome = () => {
    window.location.href = "/";
  };

  return (
    <Suspense fallback={<LoadingPage />}>
      <main className="md:flex min-h-screen flex-col items-center md:p-24 p-10 bg-gradient">
        <Card className="mb-10">
          <CardHeader>
            <h1 className="text-4xl font-bold color-white text-center">
              Mulhurst Camp Registration Submission
            </h1>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col align-center">
              <h2 className="mt-10 text-center">{text}</h2>
              <Button className="mt-10" onClick={navToHome}>
                Register Another Camper
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </Suspense>
  );
};

export default SubmitPage;
