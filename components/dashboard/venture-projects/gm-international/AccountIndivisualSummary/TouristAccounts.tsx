"use client";

import { TouristAccount } from "@/types";
import { formatCurrency, formatDate } from "@/utils";

import AccountTable from "./AccountTable";
import DueAmount from "./DueAmount";
import ServiceHeader from "./ServiceHeader";

export default function TouristAccounts({
  data,
}: {
  data: TouristAccount[];
}) {
  return (
    <section className="space-y-4">
      <ServiceHeader
        title="Tourist Accounts"
        count={data.length}
        description="Tourism account, destination, and payment information."
      />

      <AccountTable
        data={data}
        columns={[
          {
            key: "client",
            label: "Client",
            render: (item) => (
              <div>
                <p className="font-medium">{item.clientName}</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.clientPhone}
                </p>
              </div>
            ),
          },
          {
            key: "gender",
            label: "Gender",
            render: (item) => (
              <span className="capitalize">{item.gender}</span>
            ),
          },
          {
            key: "guests",
            label: "Guests",
            render: (item) => item.numberOfGuests,
          },
          {
            key: "passport",
            label: "Passport",
            render: (item) => item.passportNumber || "—",
          },
          {
            key: "destination",
            label: "Destination",
            render: (item) => item.destinationCountry,
          },
          {
            key: "duration",
            label: "Duration",
            render: (item) => item.duration,
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
          title: item.clientName,
          subtitle: item.clientPhone,

          details: [
            {
              label: "Client",
              value: item.clientName,
            },
            {
              label: "Gender",
              value: item.gender,
            },
            {
              label: "Number of guests",
              value: item.numberOfGuests,
            },
            {
              label: "Phone",
              value: item.clientPhone,
            },
            {
              label: "Passport",
              value: item.passportNumber || "—",
            },
            {
              label: "Destination",
              value: item.destinationCountry,
            },
            {
              label: "Duration",
              value: item.duration,
            },
            {
              label: "Flying date",
              value: formatDate(item.flyingDate),
            },
            {
              label: "Coverage areas",
              value:
                item.coverageAreas.length > 0
                  ? item.coverageAreas.join(", ")
                  : "—",
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
