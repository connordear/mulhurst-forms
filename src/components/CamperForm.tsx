"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { CamperInfo } from "@/lib/camper";
import { useSelectedProgram } from "@/lib/programState";
import { Program } from "@/lib/types";
import { getDaysOfWeek } from "@/utils/dateUtils";
import { useEffect, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
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
            <FormField
              control={camperForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={camperForm.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormLabel>Province</FormLabel>
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
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={camperForm.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
