"use client";

import { StudentAccount } from "@/types";
import { formatCurrency } from "@/utils";

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
      />
    </section>
  );
}
