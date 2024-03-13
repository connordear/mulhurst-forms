"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useSubmitForm } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";

import { useEffect, useState } from "react";
import { FormState, useForm } from "react-hook-form";
import CamperForm from "./CamperForm";
import EmergencyContactForm from "./EmergencyContactForm";
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
  if (formState.isDirty && formState.isSubmitted && !formState.isValid) {
    return "text-red-500";
  }

  return "text-gray-500";
}

const MullyForm = () => {
  const submit = useSubmitForm();
  const [camperData, setCamperData] = useAtom(camperInfoAtom);
  const camperForm = useForm<CamperInfo>({
    values: camperData,
    resolver: zodResolver(camperFormSchema),
    reValidateMode: "onBlur",
  });

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

  const camperFormSubmitted = camperForm.formState.isSubmitted;
  const medicalFormSubmitted = medicalForm.formState.isSubmitted;
  const emergencyContactInfoSubmitted = contactForm.formState.isSubmitted;

  const allSubmitted =
    camperFormSubmitted &&
    medicalFormSubmitted &&
    emergencyContactInfoSubmitted;

  useEffect(() => {
    if (activeTab === PAYMENT_INFO) {
      camperForm.trigger();
      medicalForm.trigger();
      contactForm.trigger();
    }
  }, [activeTab]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
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
            className={getTabStyle(camperForm.formState)}
          >
            Medical Info
          </TabsTrigger>
          <TabsTrigger
            value="emergencyContacts"
            className={getTabStyle(camperForm.formState)}
          >
            Emergency Contacts
          </TabsTrigger>
          <TabsTrigger
            value="paymentInfo"
            className={getTabStyle(camperForm.formState)}
          >
            Payment Info
          </TabsTrigger>
        </ScrollArea>
      </TabsList>
      <TabsContent value="camperInfo">
        <CamperForm
          form={camperForm}
          onSubmit={(values) => {
            setCamperData(values);
            setActiveTab(MEDICAL_INFO);
          }}
        />
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
        <PaymentForm areAllFormsComplete={allSubmitted} onSubmit={submit} />
      </TabsContent>
      <Button
        disabled={!allSubmitted}
        type="button"
        onClick={submit}
        variant="secondary"
        style={{
          position: "fixed",
          bottom: "5rem",
          right: "2rem",
        }}
      >
        Submit Form
      </Button>
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
