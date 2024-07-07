import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { convertToTitleCase } from "@/lib/stringUtils";
import { RegistrationInfo } from "@/lib/types";
import { ReactNode, useEffect, useMemo, useState } from "react";
import RegistrationSummary from "./RegistrationSummary";
import RegistrationTableRow from "./RegistrationTableRow";
import CopyButton from "./ui/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const OMIT_COLUMNS = [
  "id",
  "program",
  "lastName",
  "paymentId",
  "created_at",
  "addressLine1",
  "addressLine2",
  "city",
  "stateProv",
  "postalZip",
  "country",
  "emergencyContacts",
];

type RegistrationsTablePropsType = {
  registrations: RegistrationInfo[] | undefined;
};

export type TableColumn<T> = {
  key: keyof T;
  header: ReactNode;
  render?: (row: RegistrationInfo) => string | JSX.Element;
  headerStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
};

const RegistrationsTable = ({
  registrations: data,
}: RegistrationsTablePropsType) => {
  const [selectedTab, setSelectedTab] = useState<string>();

  const programRegistrationLookup = useMemo(() => {
    return (
      data?.reduce((acc, row) => {
        const oldRegs = acc[row.program.name] ?? [];
        acc[row.program.name] = [...oldRegs, row];
        return acc;
      }, {} as Record<string, RegistrationInfo[]>) ?? {}
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
    return programRegistrationLookup[selectedTab] ?? [];
  }, [programRegistrationLookup, selectedTab]);

  useEffect(() => {
    if (!selectedTab && programs.length > 0) {
      setSelectedTab(programs[0].key);
    }
  }, [programs, selectedTab]);

  const programRegistrationsEmails = useMemo(() => {
    const emails: string[] = [];
    registrations.forEach((r) => {
      !!r.email && emails.push(r.email);
    });
    return emails.join("; ");
  }, [registrations]);

  const emergencyContactsEmails = useMemo(() => {
    const emails: string[] = [];
    registrations.forEach((row) => {
      row.emergencyContacts.forEach((contact) => {
        emails.push(contact.email);
      });
    });
    return emails.join("; ");
  }, [registrations]);

  const registrationColumns: TableColumn<RegistrationInfo>[] = [
    {
      key: "firstName",
      header: "Name",
      render: (row: RegistrationInfo) => `${row.firstName} ${row.lastName}`,
    },
    {
      key: "email",
      header: (
        <>
          Email{" "}
          <CopyButton
            text={programRegistrationsEmails}
            hoverText="Copy All Emails"
          />
        </>
      ),
    },
    {
      key: "emergencyContacts",
      header: "Contact Name(s)",
      render: (row: RegistrationInfo) => (
        <div className="flex-col">
          {row.emergencyContacts.map((e, i) => (
            <div key={i} className="flex-1">
              {e.firstName} {e.lastName}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "emergencyContacts",
      header: "Contact Number(s)",
      render: (row: RegistrationInfo) => (
        <div className="flex-col">
          {row.emergencyContacts.map((e, i) => (
            <div key={i} className="flex-1">
              {e.phone}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "emergencyContacts",
      header: (
        <>
          Contact Email(s){" "}
          <CopyButton
            text={emergencyContactsEmails}
            hoverText="Copy All Emails"
          />
        </>
      ),
      render: (row: RegistrationInfo) => (
        <div className="flex-col">
          {row.emergencyContacts.map((e, i) => (
            <div key={i} className="flex-1">
              {e.email}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "addressLine1",
      header: "Address",
      headerStyle: { minWidth: "200px" },
      render: (row: RegistrationInfo) => (
        <div className="flex-col">
          <div>{row.addressLine1}</div>
          <div>{row.addressLine2}</div>
          <div>
            {row.city}, {row.stateProv}
          </div>
          <div>{row.postalZip}</div>
          <div>{row.country}</div>
        </div>
      ),
    },
  ];

  const defaultColumns: TableColumn<Partial<RegistrationInfo>>[] = Object.keys(
    data?.[0] ?? {}
  )
    .filter(
      (d) =>
        !registrationColumns.find((c) => c.key === d) &&
        !OMIT_COLUMNS.includes(d)
    )
    .map((key) => ({
      key: key as keyof RegistrationInfo,
      header: convertToTitleCase(key),
    }));

  const allColumns = [...registrationColumns, ...defaultColumns];

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
      <RegistrationSummary data={registrations} />
      <Table
        style={{
          maxWidth: "1000px",
        }}
      >
        <TableHeader>
          <TableRow>
            {allColumns.map((col, i) => (
              <TableHead
                key={`${col.key}-${i}`}
                style={{ textWrap: "nowrap", ...col.headerStyle }}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations?.map((row) => (
            <RegistrationTableRow
              key={row.id}
              data={row}
              columns={allColumns}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RegistrationsTable;
