"use client";
import { LoadingPage } from "@/components/LoadingCard";
import { Suspense } from "react";
import SubmitCard from "./SubmitCard";

const SubmitPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SubmitCard />
    </Suspense>
  );
};

export default SubmitPage;
