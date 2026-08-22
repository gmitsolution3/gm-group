"use client";

import { VisaAccount } from "@/types";
import { formatCurrency, formatDate } from "@/utils";

import AccountTable from "./AccountTable";
import DueAmount from "./DueAmount";
import ServiceHeader from "./ServiceHeader";

export default function VisaAccounts({
  data,
}: {
  data: VisaAccount[];
}) {
  return (
    <section className="space-y-4">
      <ServiceHeader
        title="Visa Accounts"
        count={data.length}
        description="Visa account, passport, and payment information."
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
            key: "passport",
            label: "Passport",
            render: (item) => item.passportNumber || "—",
          },
          {
            key: "dateOfBirth",
            label: "Date of birth",
            render: (item) => formatDate(item.dateOfBirth),
          },
          {
            key: "country",
            label: "Country",
            render: (item) => item.country,
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
      />
    </section>
  );
}
