import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from "@/lib/supabase";

import { Contact } from "@/lib/emergencyContacts";
import { useEffect, useMemo, useState } from "react";
import CopyButton from "./ui/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
type RegistrationsTablePropsType = {
  registrations:
    | Database["public"]["Tables"]["registrations"]["Row"][]
    | undefined;
};

const RegistrationsTable = ({
  registrations: data,
}: RegistrationsTablePropsType) => {
  const [selectedTab, setSelectedTab] = useState<string>();

  const programRegistrationLookup = useMemo(() => {
    return (
      data?.reduce((acc, row) => {
        const oldRegs = acc[(row.program as any).name] ?? [];
        acc[(row.program as any).name] = [...oldRegs, row];
        return acc;
      }, {} as Record<string, any[]>) ?? {}
    );
  }, [data]);

  const programs = useMemo(() => {
    return Object.keys(programRegistrationLookup).map((key) => ({
      key,
      title: `${programRegistrationLookup[key].length} - ${key}`,
    }));
  }, [programRegistrationLookup]);

  const registrations = useMemo(() => {
    if (!selectedTab) return [];
    console.log(programRegistrationLookup);
    return programRegistrationLookup[selectedTab] ?? [];
  }, [programRegistrationLookup, selectedTab]);

  useEffect(() => {
    if (!selectedTab && programs.length > 0) {
      setSelectedTab(programs[0].key);
    }
  }, [programs, selectedTab]);

  const programRegistrationsEmails = useMemo(() => {
    const emails: string[] = [];
    registrations.forEach((row) => {
      row.emergencyContacts.forEach((contact: Contact) => {
        emails.push(contact.email);
      });
    });
    return emails.join("; ");
  }, [registrations]);

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100% - 5rem)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
        }}
      >
        Mulhurst Registrations
      </h1>

      <Select onValueChange={(v) => setSelectedTab(v)} value={selectedTab}>
        <SelectTrigger>
          <SelectValue>{selectedTab ?? "Select a program"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {programs.map((row) => (
            <SelectItem key={row.key} value={row.key}>
              {row.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Table
        style={{
          maxWidth: "1000px",
        }}
      >
        <TableHeader>
          <TableRow>
            <TableHead>Camper Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact Name(s)</TableHead>
            <TableHead>Contact Number(s)</TableHead>
            <TableHead>
              Contact Email(s){" "}
              <CopyButton
                text={programRegistrationsEmails}
                hoverText="Copy All Emails"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.firstName + " " + row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <div className="flex-col"></div>
                {(row.emergencyContacts as Contact[]).map((e) => (
                  <div className="flex-1">
                    {e.firstName} {e.lastName}
                  </div>
                ))}
              </TableCell>
              <TableCell className="flex-col">
                {(row.emergencyContacts as Contact[]).map((e) => (
                  <div className="flex-1">{e.phone}</div>
                ))}
              </TableCell>
              <TableCell className="flex-col">
                {(row.emergencyContacts as Contact[]).map((e) => (
                  <div className="flex-1">{e.email}</div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RegistrationsTable;
