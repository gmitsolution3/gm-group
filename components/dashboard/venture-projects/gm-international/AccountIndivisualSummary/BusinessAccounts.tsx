"use client";

import { BusinessAccount } from "@/types";
import { formatCurrency } from "@/utils";

import AccountTable from "./AccountTable";
import DueAmount from "./DueAmount";
import ServiceHeader from "./ServiceHeader";

export default function BusinessAccounts({
  data,
}: {
  data: BusinessAccount[];
}) {
  return (
    <section className="space-y-4">
      <ServiceHeader
        title="Business Accounts"
        count={data.length}
        description="Business account, office, and payment information."
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
            key: "country",
            label: "Country",
            render: (item) => item.country,
          },
          {
            key: "office",
            label: "Office",
            render: (item) => item.officeLocation,
          },
          {
            key: "gender",
            label: "Gender",
            render: (item) => (
              <span className="capitalize">{item.gender}</span>
            ),
          },
          {
            key: "passport",
            label: "Passport",
            render: (item) => item.passportNumber || "—",
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
