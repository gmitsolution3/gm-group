"use client";

import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useMemo, useState } from "react";

import {
  rowPaginationFeature,
  tableFeatures,
  useTable,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import AccountDetailsModal, {
  type AccountDetail,
} from "./AccountDetailsModal";

const DEFAULT_PAGE_SIZE = 10;

const features = tableFeatures({
  rowPaginationFeature,
});

export type AccountTableColumn<T> = {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
};

type AccountTableProps<T> = {
  data: T[];
  columns: AccountTableColumn<T>[];
  pageSize?: number;
  emptyMessage?: string;

  getDetails?: (item: T) => {
    title: string;
    subtitle?: string;
    details: AccountDetail[];
  };
};

export default function AccountTable<T>({
  data,
  columns,
  pageSize = DEFAULT_PAGE_SIZE,
  emptyMessage = "No account records found.",
  getDetails,
}: AccountTableProps<T>) {
  const [selectedAccount, setSelectedAccount] = useState<T | null>(
    null,
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const tableData = data as unknown as any[];

  const tableColumns = useMemo<
    ColumnDef<typeof features, any>[]
  >(() => {
    const accountColumns = columns.map((column) => ({
      id: column.key,
      header: column.label,

      cell: ({ row }: { row: any }) => {
        const item = row.original as T;

        return column.render(item);
      },
    }));

    if (!getDetails) {
      return accountColumns;
    }

    return [
      ...accountColumns,

      {
        id: "actions",
        header: "",
        enableHiding: false,

        cell: ({ row }: { row: any }) => (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              setSelectedAccount(row.original as T);
            }}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View</span>
          </Button>
        ),
      },
    ];
  }, [columns, getDetails]);

  const table = useTable({
    key: "account-table",

    features,

    columns: tableColumns,
    data: tableData,

    state: {
      pagination,
    },

    onPaginationChange: setPagination,
  });

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / pagination.pageSize),
  );

  const currentPage = pagination.pageIndex + 1;

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-10 text-center">
        <p className="text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full bg-card">
            <thead className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-muted-foreground"
                    >
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-muted/20"
                >
                  {row.getAllCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-4 align-middle"
                    >
                      <table.FlexRender cell={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm"
          >
            <div className="space-y-4">
              {row.getAllCells().map((cell) => {
                const header = table
                  .getHeaderGroups()[0]
                  ?.headers.find(
                    (item) => item.column.id === cell.column.id,
                  );

                return (
                  <div
                    key={cell.id}
                    className="grid grid-cols-[100px_minmax(0,1fr)] gap-4"
                  >
                    <p className="text-xs font-medium text-muted-foreground">
                      {header ? (
                        <table.FlexRender header={header} />
                      ) : null}
                    </p>

                    <div className="min-w-0 text-sm">
                      <table.FlexRender cell={cell} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {selectedAccount && getDetails && (
        <AccountDetailsModal
          open={Boolean(selectedAccount)}
          title={getDetails(selectedAccount).title}
          subtitle={getDetails(selectedAccount).subtitle}
          details={getDetails(selectedAccount).details}
          onClose={() => setSelectedAccount(null)}
        />
      )}
    </div>
  );
}
