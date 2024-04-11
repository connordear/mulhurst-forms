"use client";
import {
  MedicalInfo,
  NO_ALLERGIES,
  NO_EPIPEN,
  NO_MEDICATIONS_TREATMENTS,
} from "@/lib/medical";
import { UseFormReturn } from "react-hook-form";
import ToggleField from "./ToggleField";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
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
              name="healthCareNumber"
              control={medicalForm.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Health Care Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <FormField
                name="familyDoctor"
                control={medicalForm.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Family Doctor</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="doctorPhone"
                control={medicalForm.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Doctor Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <FormField
                name="height"
                control={medicalForm.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="weight"
                control={medicalForm.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={medicalForm.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies</FormLabel>
                  <FormControl>
                    <ToggleField
                      id={"allergies"}
                      toggleLabel={
                        "Does your child have any allergies (including food allergies)?"
                      }
                      fieldLabel={
                        "Please list all allergies and reactions, along with recommended treatments."
                      }
                      noLabel={NO_ALLERGIES}
                      offValue={NO_ALLERGIES}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={medicalForm.control}
              name="epiPen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>EpiPen</FormLabel>
                  <FormControl>
                    <ToggleField
                      id={"epiPen"}
                      toggleLabel={
                        "Does your child require an EpiPen and have it on their person?"
                      }
                      fieldLabel={
                        "Please provide details about child's anaphylaxis. (Please note we require 2 non-expired EpiPens - one for child to carry with them and one to keep in medical bag)"
                      }
                      noLabel={NO_EPIPEN}
                      offValue={NO_EPIPEN}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={medicalForm.control}
              name="medicationsTreatments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medications</FormLabel>
                  <FormControl>
                    <ToggleField
                      id={"medicationsTreatments"}
                      toggleLabel={
                        "Will your child be taking any medications or require any treatments while at camp?"
                      }
                      fieldLabel={
                        "Please list all medications/treatments that will need to be administered at camp. (times it needs to be administered, reason for medication/treatment and notes on administration.)"
                      }
                      noLabel={NO_MEDICATIONS_TREATMENTS}
                      offValue={NO_MEDICATIONS_TREATMENTS}
                      {...field}
                    />
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
                  <FormDescription>
                    Please list any dietary restrictions or special dietary
                    needs.
                  </FormDescription>
                  <FormControl>
                    <Textarea {...field} placeholder="None" />
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
                  <FormDescription>
                    Anything specific you would like to discuss with the
                    Mulhurst team about?
                  </FormDescription>
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
