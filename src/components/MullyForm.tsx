"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";

const relationshipOptions = [
  "Mother",
  "Father",
  "Guardian",
  "Grandparent",
  "Caregiver",
  "Other",
] as const;

const addressSchema = z.object({
  line1: z.string().min(1).max(100),
  line2: z.string().min(1).max(100),
  city: z.string().min(1).max(50),
  stateProv: z.string().min(2).max(2),
  postalZip: z.string().min(5).max(10),
  country: z.string().min(2).max(50),
});

const contactSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z.string().min(10).max(15),
  relationship: z.enum(relationshipOptions),
});

const parentSchema = z.object({
  contact: contactSchema,
  relationship: z.enum(relationshipOptions),
});

const camperFormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  birthdate: z.date().min(new Date("1900-01-01")).max(new Date()),
  address: addressSchema,
});

type FormTabKey = "camperInfo" | "parentInfo" | "emergencyContacts";

const MullyForm = () => {
  const [activeTab, setActiveTab] = useState<FormTabKey>("camperInfo");
  const camperForm = useForm<z.infer<typeof camperFormSchema>>({
    resolver: zodResolver(camperFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      birthdate: new Date("2000-01-01"),
      address: {
        line1: "",
        line2: "",
        city: "",
        stateProv: "AB",
        postalZip: "",
        country: "CA",
      },
    },
  });
  function onSubmitCamperInfo(values: z.infer<typeof camperFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setActiveTab("parentInfo");
  }
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} default={"camperInfo"}>
      <TabsList>
        <TabsTrigger value="camperInfo">Camper Info</TabsTrigger>
        <TabsTrigger value="medicalInfo">Medical Info</TabsTrigger>
        <TabsTrigger value="emergencyContacts">Emergency Contacts</TabsTrigger>
        <TabsTrigger value="paymentInfo">Payment Info</TabsTrigger>
      </TabsList>
      <TabsContent value="camperInfo">
        <Form {...camperForm}>
          <form
            onSubmit={camperForm.handleSubmit(onSubmitCamperInfo)}
            className="space-y-8"
          >
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input {...camperForm.register("email")} />
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input {...camperForm.register("firstName")} />
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input {...camperForm.register("lastName")} />
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="birthdate">Birthdate</FormLabel>
              <Input
                type="date"
                {...camperForm.register("birthdate", { valueAsDate: true })}
              />
            </FormItem>

            <Button type="submit">Next</Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="medicalInfo"></TabsContent>
      <TabsContent value="emergencyContacts"></TabsContent>
      <TabsContent value="paymentInfo"></TabsContent>
    </Tabs>
  );
};

export default MullyForm;
