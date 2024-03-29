"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPrograms } from "@/lib/api";
import {
  camperFormSchema,
  CamperInfo,
  camperInfoAtom,
  defaultCamperInfo,
} from "@/lib/camper";
import {
  contactInfoAtom,
  defaultEmergencyContactInfo,
  EmergencyContact,
  emergencyContactsSchema,
} from "@/lib/emergencyContacts";
import {
  defaultMedicalInfo,
  medicalFormSchema,
  MedicalInfo,
  medicalInfoAtom,
} from "@/lib/medical";
import { useSelectedProgram } from "@/lib/programState";
import { getDaysOfWeek } from "@/utils/dateUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { useEffect, useMemo, useState } from "react";
import { FormState, useForm, useFormState } from "react-hook-form";
import CamperForm from "./CamperForm";
import EmergencyContactForm from "./EmergencyContactForm";
import LoadingCard from "./LoadingCard";
import MedicalForm from "./MedicalForm";
import PaymentForm from "./PaymentForm";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const CAMPER_INFO = "camperInfo";
const MEDICAL_INFO = "medicalInfo";
const EMERGENCY_CONTACTS = "emergencyContacts";
const PAYMENT_INFO = "paymentInfo";

function getTabStyle(formState: FormState<any>) {
  if (formState.isDirty && formState.isValid && formState.isSubmitted) {
    return "text-green-500";
  }
  if (formState.isDirty && !formState.isValid) {
    return "text-red-500";
  }

  return "text-gray-500";
}

const MullyForm = () => {
  const { data: programs, isLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
  });

  const [camperData, setCamperData] = useAtom(camperInfoAtom);
  const camperForm = useForm<CamperInfo>({
    values: camperData,
    resolver: zodResolver(camperFormSchema),
    reValidateMode: "onBlur",
  });

  const selectedDaysOfWeek = camperForm.watch("daysOfWeek");
  const selectedProgram = useSelectedProgram(programs, camperForm);

  const purchaseInfo = useMemo(() => {
    let priceId = selectedProgram?.weekPriceId;
    let quantity = 1;
    if (selectedProgram && selectedProgram.dayPriceId && selectedDaysOfWeek) {
      const possibleDaysOfWeek = getDaysOfWeek(
        selectedProgram?.startDate,
        selectedProgram?.endDate
      );
      console.log("possibleDaysOfWeek", possibleDaysOfWeek, selectedDaysOfWeek);
      if (possibleDaysOfWeek.length !== selectedDaysOfWeek.length) {
        priceId = selectedProgram?.dayPriceId;
        quantity = selectedDaysOfWeek.length;
      }
    }
    return { priceId, quantity };
  }, [selectedProgram, selectedDaysOfWeek]);

  const [medicalData, setMedicalData] = useAtom(medicalInfoAtom);
  const medicalForm = useForm<MedicalInfo>({
    values: medicalData,
    resolver: zodResolver(medicalFormSchema),
    reValidateMode: "onBlur",
  });

  const [contactInfo, setContactInfo] = useAtom(contactInfoAtom);
  const contactForm = useForm<EmergencyContact>({
    values: contactInfo,
    resolver: zodResolver(emergencyContactsSchema),
    reValidateMode: "onBlur",
  });

  function clearForms() {
    setCamperData(defaultCamperInfo);
    setMedicalData(defaultMedicalInfo);
    setContactInfo(defaultEmergencyContactInfo);
    camperForm.reset();
    medicalForm.reset();
    contactForm.reset();
  }

  const [activeTab, setActiveTab] = useState(CAMPER_INFO);

  const { isSubmitSuccessful: camperFormSubmitted } = useFormState(camperForm);
  const { isSubmitSuccessful: medicalFormSubmitted } =
    useFormState(medicalForm);
  const { isSubmitSuccessful: emergencyContactInfoSubmitted } =
    useFormState(contactForm);

  const invalidForms = useMemo(() => {
    let forms = [];
    !camperFormSubmitted && forms.push("Camper Info");
    !medicalFormSubmitted && forms.push("Medical Info");
    !emergencyContactInfoSubmitted && forms.push("Emergency Contacts");
    return forms;
  }, [
    camperFormSubmitted,
    medicalFormSubmitted,
    emergencyContactInfoSubmitted,
  ]);

  useEffect(() => {
    if (activeTab === PAYMENT_INFO) {
      camperForm.trigger();
      medicalForm.trigger();
      contactForm.trigger();
    }
  }, [activeTab, camperForm, medicalForm, contactForm]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(newTab) => {
        setActiveTab((prev) => {
          if (prev === CAMPER_INFO) camperForm.handleSubmit(setCamperData)();
          if (prev === MEDICAL_INFO) medicalForm.handleSubmit(setMedicalData)();
          if (prev === EMERGENCY_CONTACTS)
            contactForm.handleSubmit(setContactInfo)();
          return newTab;
        });
      }}
      defaultValue={CAMPER_INFO}
    >
      <TabsList className="w-full">
        <ScrollArea className="whitespace-nowrap rounded-md">
          <TabsTrigger
            value="camperInfo"
            className={getTabStyle(camperForm.formState)}
          >
            Camper Info
          </TabsTrigger>
          <TabsTrigger
            value="medicalInfo"
            className={getTabStyle(medicalForm.formState)}
          >
            Medical Info
          </TabsTrigger>
          <TabsTrigger
            value="emergencyContacts"
            className={getTabStyle(contactForm.formState)}
          >
            Emergency Contacts
          </TabsTrigger>
          <TabsTrigger value="paymentInfo">Payment Info</TabsTrigger>
        </ScrollArea>
      </TabsList>
      <TabsContent value="camperInfo">
        {programs ? (
          <CamperForm
            programs={programs}
            form={camperForm}
            onSubmit={(values) => {
              setCamperData(values);
              setActiveTab(MEDICAL_INFO);
            }}
          />
        ) : (
          <LoadingCard />
        )}
      </TabsContent>
      <TabsContent value="medicalInfo">
        <MedicalForm
          form={medicalForm}
          onSubmit={(values) => {
            setMedicalData(values);
            setActiveTab(EMERGENCY_CONTACTS);
          }}
        />
      </TabsContent>
      <TabsContent value="emergencyContacts">
        <EmergencyContactForm
          form={contactForm}
          onSubmit={(values) => {
            setContactInfo(values);
            setActiveTab(PAYMENT_INFO);
          }}
        />
      </TabsContent>
      <TabsContent value="paymentInfo">
        {selectedProgram && purchaseInfo && (
          <PaymentForm
            priceId={purchaseInfo.priceId}
            quantity={purchaseInfo.quantity}
            invalidForms={invalidForms}
          />
        )}
      </TabsContent>

      <Button
        onClick={clearForms}
        variant="secondary"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
        }}
      >
        Clear Form
      </Button>
    </Tabs>
  );
};

export default MullyForm;
