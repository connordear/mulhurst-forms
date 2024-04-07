"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  CamperInfo,
  heardAboutUsOptions,
  swimmingLevelOptions,
  tShirtSizeOptions,
} from "@/lib/camper";
import { useSelectedProgram } from "@/lib/programState";
import { Program } from "@/lib/types";
import { getDaysOfWeek } from "@/utils/dateUtils";
import { Label } from "@radix-ui/react-label";
import { useEffect, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

interface CamperFormProps {
  programs: Program[];
  form: UseFormReturn<CamperInfo>;
  onSubmit: (values: CamperInfo) => void;
}

const CamperForm = ({
  form: camperForm,
  onSubmit,
  programs,
}: CamperFormProps) => {
  const selectedProgram = useSelectedProgram(programs, camperForm);
  function onSubmitCamperInfo(values: CamperInfo) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    onSubmit(values);
  }

  const selectedProgramId = camperForm.watch("program");
  const selectedDaysOfWeek = camperForm.watch("daysOfWeek");

  useEffect(() => {
    if (!selectedProgramId && programs.length) {
      camperForm.setValue("program", programs[0].id);
    }
  }, [programs, selectedProgramId, camperForm]);

  const availableDaysOfWeek = useMemo(() => {
    if (
      selectedProgram &&
      selectedProgram.dayPriceId &&
      selectedProgram.startDate &&
      selectedProgram.endDate
    ) {
      return getDaysOfWeek(selectedProgram.startDate, selectedProgram.endDate);
    }
    return [];
  }, [selectedProgram]);

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          This information will be used to register your camper
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...camperForm}>
          <form
            onSubmit={camperForm.handleSubmit(onSubmitCamperInfo)}
            className="space-y-8"
          >
            <FormField
              control={camperForm.control}
              name="program"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => {
                        const newProgram = programs.find(
                          (program) =>
                            program.id === parseInt(e.currentTarget.value, 10)
                        );
                        field.onChange(parseInt(e.currentTarget.value), 10);
                        newProgram &&
                          camperForm.setValue(
                            "daysOfWeek",
                            getDaysOfWeek(
                              newProgram?.startDate,
                              newProgram?.endDate
                            )
                          );
                      }}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      style={{ maxWidth: "100%" }}
                    >
                      {programs.map((program) => (
                        <option
                          key={program.id}
                          value={program.id}
                          style={{ maxWidth: "100%" }}
                          className="text-wrap"
                        >
                          {program.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedProgram?.dayPriceId && (
              <FormField
                name="daysOfWeek"
                control={camperForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Days Camper Will Attend ({field.value?.length || 0} days
                      selected)
                    </FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="multiple"
                        value={field.value}
                        onValueChange={(v) => {
                          field.onChange(v);
                        }}
                      >
                        {availableDaysOfWeek.map((dayOfWeek) => (
                          <ToggleGroupItem
                            key={dayOfWeek}
                            value={dayOfWeek}
                            aria-label={`Toggle ${dayOfWeek}`}
                          >
                            {dayOfWeek}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={camperForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <FormField
                control={camperForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={camperForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={camperForm.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birthdate</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={camperForm.control}
              name="address.line1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={camperForm.control}
              name="address.line2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row justify-between gap-5">
              <FormField
                control={camperForm.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={camperForm.control}
                name="address.stateProv"
                render={({ field }) => (
                  <FormItem className="flex-2">
                    <FormLabel>Province</FormLabel>
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
                control={camperForm.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel> Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={camperForm.control}
                name="address.postalZip"
                render={({ field }) => (
                  <FormItem className="flex-2">
                    <FormLabel>Postal Code</FormLabel>
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
                control={camperForm.control}
                name="hasBeenToCampBefore"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Has the camper been to camp before?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(v: "yes" | "no") => {
                          return field.onChange(v === "yes");
                        }}
                        value={field.value ? "yes" : "no"}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="camp-before-yes" />
                          <Label htmlFor="camp-before-yes">Yes</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="camp-before-no" />
                          <Label htmlFor="camp-before-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={camperForm.control}
                name="arePhotosAllowed"
                render={({ field }) => (
                  <FormItem className="flex-2">
                    <FormLabel>Are photos allowed?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(v: "yes" | "no") => {
                          return field.onChange(v === "yes");
                        }}
                        value={field.value ? "yes" : "no"}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="yes" />
                          <Label htmlFor="yes">Yes</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" />
                          <Label htmlFor="no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={camperForm.control}
              name="swimmingLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Swimming Level</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      style={{ maxWidth: "100%" }}
                    >
                      {swimmingLevelOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={camperForm.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sex</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      style={{ maxWidth: "100%" }}
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={camperForm.control}
              name="friendCabinRequest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Friend/Cabin mate Requests</FormLabel>
                  <FormDescription>
                    Please list any friends or siblings the camper would like to
                    share a cabin with.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={camperForm.control}
              name="tShirtSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>T-Shirt Size</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      style={{ maxWidth: "100%" }}
                    >
                      {tShirtSizeOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={camperForm.control}
              name="howDidYouHearAboutUs"
              render={({ field }) => (
                <FormItem style={{ maxWidth: "470px" }}>
                  <FormLabel>How did you hear about us?</FormLabel>
                  <FormDescription>
                    This information will help us get a better understanding of
                    how we can encourage growth within our camp community.
                  </FormDescription>
                  <FormControl>
                    <select
                      {...field}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      style={{ maxWidth: "100%" }}
                    >
                      {heardAboutUsOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
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

export default CamperForm;
