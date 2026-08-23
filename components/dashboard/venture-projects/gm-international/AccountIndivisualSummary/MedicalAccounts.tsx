"use client";

import { MedicalAccount } from "@/types";
import { formatCurrency, formatDate } from "@/utils";

import AccountTable from "./AccountTable";
import DueAmount from "./DueAmount";
import ServiceHeader from "./ServiceHeader";

export default function MedicalAccounts({
  data,
}: {
  data: MedicalAccount[];
}) {
  return (
    <section className="space-y-4">
      <ServiceHeader
        title="Medical Accounts"
        count={data.length}
        description="Medical treatment account and payment information."
      />

      <AccountTable
        data={data}
        columns={[
          {
            key: "name",
            label: "Patient",
            render: (item) => (
              <div>
                <p className="font-medium">{item.name}</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.patientPhone}
                </p>
              </div>
            ),
          },
          {
            key: "hospital",
            label: "Hospital",
            render: (item) => item.hospitalName,
          },
          {
            key: "country",
            label: "Country",
            render: (item) => item.countryName,
          },
          {
            key: "age",
            label: "Age",
            render: (item) => item.patientAge,
          },
          {
            key: "disease",
            label: "Disease",
            render: (item) => (
              <span className="block max-w-[220px] truncate">
                {item.patientDisease}
              </span>
            ),
          },
          {
            key: "flyingDate",
            label: "Flying date",
            render: (item) => formatDate(item.flyingDate),
          },
          {
            key: "total",
            label: "Total",
            render: (item) => formatCurrency(item.totalAmount),
          },
          {
            key: "advance",
            label: "Advance",
            render: (item) => formatCurrency(item.advance),
          },
          {
            key: "due",
            label: "Due",
            render: (item) => <DueAmount value={item.due} />,
          },
        ]}
        getDetails={(item) => ({
          title: item.name,
          subtitle: item.patientPhone,

          details: [
            {
              label: "Patient",
              value: item.name,
            },
            {
              label: "Hospital",
              value: item.hospitalName,
            },
            {
              label: "Country",
              value: item.countryName,
            },
            {
              label: "Age",
              value: item.patientAge,
            },
            {
              label: "Phone",
              value: item.patientPhone,
            },
            {
              label: "Disease",
              value: item.patientDisease,
            },
            {
              label: "Flying date",
              value: formatDate(item.flyingDate),
            },
            {
              label: "Total amount",
              value: formatCurrency(item.totalAmount),
            },
            {
              label: "Advance",
              value: formatCurrency(item.advance),
            },
            {
              label: "Due",
              value: formatCurrency(item.due),
            },
            {
              label: "Created at",
              value: formatDate(item.createdAt),
            },
            {
              label: "Updated at",
              value: item.updatedAt
                ? formatDate(item.updatedAt)
                : "—",
            },
            {
              label: "Account holder",
              value: item.accountHolder?.email ?? "—",
            },
            {
              label: "Account holder phone",
              value: item.accountHolder?.phone ?? "—",
            },
            {
              label: "Account holder role",
              value: item.accountHolder?.userRole ?? "—",
            },
            {
              label: "Branch",
              value: item.accountHolder?.branchName ?? "—",
            },
          ],
        })}
      />
    </section>
  );
}
