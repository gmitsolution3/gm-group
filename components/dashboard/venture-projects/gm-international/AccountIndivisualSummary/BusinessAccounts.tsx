"use client";

import { BusinessAccount } from "@/types";
import { formatCurrency, formatDate } from "@/utils";

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
        getDetails={(item) => ({
          title: item.clientName,
          subtitle: item.clientPhone,

          details: [
            {
              label: "Client",
              value: item.clientName,
            },
            {
              label: "Phone",
              value: item.clientPhone,
            },
            {
              label: "Gender",
              value: item.gender,
            },
            {
              label: "Passport",
              value: item.passportNumber || "—",
            },
            {
              label: "Office location",
              value: item.officeLocation,
            },
            {
              label: "Country",
              value: item.country,
            },
            {
              label: "Remarks",
              value: item.remarks || "—",
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
