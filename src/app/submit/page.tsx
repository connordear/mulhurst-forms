"use client";
import { LoadingPage } from "@/components/LoadingCard";
import Head from "next/head";
import { Suspense } from "react";
import SubmitCard from "./SubmitCard";

const SubmitPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Head>
        <title>Mulhurst Camp Registration Form</title>
      </Head>
      <SubmitCard />
    </Suspense>
  );
};

export default SubmitPage;
