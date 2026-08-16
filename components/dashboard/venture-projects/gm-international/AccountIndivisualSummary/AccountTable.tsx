"use client";

import { ReactNode } from "react";

interface AccountTableColumn<T> {
  key: string;
  label: string;
  render: (item: T) => ReactNode;
}

interface AccountTableProps<T extends { _id: string }> {
  columns: AccountTableColumn<T>[];
  data: T[];
}

export default function AccountTable<T extends { _id: string }>({
  columns,
  data,
}: AccountTableProps<T>) {
  if (!data.length) {
    return (
      <div className="rounded-2xl border p-8 text-center">
        <p className="text-sm font-medium">No accounts found</p>

        <p className="mt-1 text-xs text-muted-foreground">
          There are currently no accounts in this service.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border">
      <table className="w-full min-w-[900px] text-sm">
        <thead className="border-b bg-muted/30">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y">
          {data.map((item) => (
            <tr
              key={item._id}
              className="transition-colors hover:bg-muted/20"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-4">
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}