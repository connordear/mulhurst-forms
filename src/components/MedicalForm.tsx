"use client";
import { MedicalInfo } from "@/lib/medical";
import { UseFormReturn } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

type MedicalFormPropsType = {
  form: UseFormReturn<MedicalInfo>;
  onSubmit: (values: MedicalInfo) => void;
};
const MedicalForm = ({ form: medicalForm, onSubmit }: MedicalFormPropsType) => {
  function onSubmitMedicalInfo(values: MedicalInfo) {
    console.log(values);
    onSubmit(values);
  }
  return (
    <Card>
      <CardHeader>
        <CardDescription
          style={{
            maxWidth: "400px",
          }}
        >
          This information will be used by the camp healthcare provider to aid
          delivery of medications and treatment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...medicalForm}>
          <form
            onSubmit={medicalForm.handleSubmit(onSubmitMedicalInfo)}
            className="space-y-8"
          >
            <FormField
              control={medicalForm.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={medicalForm.control}
              name="medications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medications</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={medicalForm.control}
              name="medicalConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Conditions</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={medicalForm.control}
              name="dietaryRestrictions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dietary Restrictions</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={medicalForm.control}
              name="other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Medical Information</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Next</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MedicalForm;
