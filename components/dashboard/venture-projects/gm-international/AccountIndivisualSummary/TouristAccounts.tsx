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
      />
    </section>
  );
}
