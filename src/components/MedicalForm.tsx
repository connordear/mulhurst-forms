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
              name="areOverTheCounterMedicationsAllowed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Are over-the-counter medications allowed?
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value ? "yes" : "no"}
                      onChange={(e) =>
                        field.onChange(e.currentTarget.value === "yes")
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      style={{ maxWidth: "100%" }}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
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
