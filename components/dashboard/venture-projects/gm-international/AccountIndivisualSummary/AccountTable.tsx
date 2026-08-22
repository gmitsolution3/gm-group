"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  rowPaginationFeature,
  tableFeatures,
  useTable,
  type ColumnDef,
  type PaginationState,
  type RowData,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

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
};

export default function AccountTable<T extends RowData>({
  data,
  columns,
  pageSize = PAGE_SIZE,
  emptyMessage = "No account records found.",
}: AccountTableProps<T>) {
  const [pagination, setPagination] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize,
    });

  /*
   * TanStack's useTable in this project is configured around RowData.
   *
   * The actual account type is preserved by AccountTableColumn<T>.
   * We only bridge it when creating the TanStack columns.
   */
  const tableColumns = useMemo<
    ColumnDef<typeof features, T>[]
  >(
    () =>
      columns.map((column) => ({
        id: column.key,
        header: column.label,

        cell: ({ row }) => {
          return column.render(row.original);
        },
      })),
    [columns],
  );

  const table = useTable({
    key: "account-table",
    features,

    columns: tableColumns,
    data,

    state: {
      pagination,
    },

    onPaginationChange: setPagination,
  });

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / pagination.pageSize),
  );

  const currentPage =
    pagination.pageIndex + 1;

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
      {/* ============================================================ */}
      {/* DESKTOP TABLE                                                 */}
      {/* ============================================================ */}

      <div className="hidden overflow-hidden rounded-2xl border md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/40">
              {table
                .getHeaderGroups()
                .map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(
                      (header) => (
                        <th
                          key={header.id}
                          className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-muted-foreground"
                        >
                          {header.isPlaceholder
                            ? null
                            : (
                                <table.FlexRender
                                  header={header}
                                />
                              )}
                        </th>
                      ),
                    )}
                  </tr>
                ))}
            </thead>

            <tbody className="divide-y">
              {table
                .getRowModel()
                .rows.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-muted/20"
                  >
                    {row
                      .getAllCells()
                      .map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-4 align-middle"
                        >
                          <table.FlexRender
                            cell={cell}
                          />
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE                                                        */}
      {/* ============================================================ */}

      <div className="space-y-3 md:hidden">
        {table
          .getRowModel()
          .rows.map((row) => (
            <div
              key={row.id}
              className="rounded-2xl border bg-card p-4"
            >
              <div className="space-y-4">
                {row
                  .getAllCells()
                  .map((cell) => {
                    const header =
                      table
                        .getHeaderGroups()[0]
                        ?.headers.find(
                          (item) =>
                            item.column.id ===
                            cell.column.id,
                        );

                    return (
                      <div
                        key={cell.id}
                        className="grid grid-cols-[100px_minmax(0,1fr)] gap-4"
                      >
                        <p className="text-xs font-medium text-muted-foreground">
                          {header ? (
                            <table.FlexRender
                              header={header}
                            />
                          ) : null}
                        </p>

                        <div className="min-w-0 text-sm">
                          <table.FlexRender
                            cell={cell}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
      </div>

      {/* ============================================================ */}
      {/* PAGINATION                                                    */}
      {/* ============================================================ */}

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
              disabled={
                !table.getCanPreviousPage()
              }
              onClick={() =>
                table.previousPage()
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={
                !table.getCanNextPage()
              }
              onClick={() =>
                table.nextPage()
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}