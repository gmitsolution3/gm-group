"use client";

import { StudentAccount } from "@/types";
import { formatCurrency, formatDate } from "@/utils";

import AccountTable from "./AccountTable";
import DueAmount from "./DueAmount";
import ServiceHeader from "./ServiceHeader";

export default function StudentAccounts({
  data,
}: {
  data: StudentAccount[];
}) {
  return (
    <section className="space-y-4">
      <ServiceHeader
        title="Student Accounts"
        count={data.length}
        description="Student account and payment information."
      />

      <AccountTable
        data={data}
        columns={[
          {
            key: "name",
            label: "Name",
            render: (item) => (
              <div>
                <p className="font-medium">{item.name}</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.userEmail}
                </p>
              </div>
            ),
          },
          {
            key: "degree",
            label: "Degree",
            render: (item) => item.degree,
          },
          {
            key: "university",
            label: "University",
            render: (item) => (
              <span className="block max-w-[260px] truncate">
                {item.university}
              </span>
            ),
          },
          {
            key: "intake",
            label: "Intake",
            render: (item) => item.intake,
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
          subtitle: item.userEmail,

          details: [
            {
              label: "Account ID",
              value: item._id,
            },
            {
              label: "Name",
              value: item.name,
            },
            {
              label: "Email",
              value: item.userEmail,
            },
            {
              label: "Degree",
              value: item.degree,
            },
            {
              label: "University",
              value: item.university,
            },
            {
              label: "Intake",
              value: item.intake,
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
              label: "Missing documents",
              value:
                item.missingDocuments.length > 0
                  ? item.missingDocuments.join(", ")
                  : "None",
            },
            {
              label: "Account holder email",
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
