"use client";

import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

import { useEffect, useMemo, useState } from "react";

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

/* ====================================================================== */
/* TYPES                                                                  */
/* ====================================================================== */

export type AccountTableColumn<T> = {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
};

type AccountDetails<T> = {
  title: string;
  subtitle?: string;
  details: AccountDetail[];
};

type AccountTableProps<T> = {
  data: T[];

  columns: AccountTableColumn<T>[];

  /**
   * When provided, a View button is added to every row.
   */
  getDetails?: (item: T) => AccountDetails<T>;

  pageSize?: number;

  emptyMessage?: string;
};

/* ====================================================================== */
/* COMPONENT                                                              */
/* ====================================================================== */

export default function AccountTable<T>({
  data,
  columns,
  getDetails,
  pageSize = DEFAULT_PAGE_SIZE,
  emptyMessage = "No account records found.",
}: AccountTableProps<T>) {
  const [selectedAccount, setSelectedAccount] = useState<T | null>(
    null,
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  /* ------------------------------------------------------------------ */
  /* Reset pagination when page size changes                            */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    setPagination((current) => ({
      ...current,
      pageIndex: 0,
      pageSize,
    }));
  }, [pageSize]);

  /* ------------------------------------------------------------------ */
  /* TanStack data                                                      */
  /* ------------------------------------------------------------------ */

  /**
   * The project's TanStack `useTable` setup currently resolves its
   * row type through RowData. Keep the generic account type at our
   * component boundary and cast only when handing data to TanStack.
   */
  const tableData = data as unknown as any[];

  /* ------------------------------------------------------------------ */
  /* Columns                                                             */
  /* ------------------------------------------------------------------ */

  const tableColumns = useMemo<
    ColumnDef<typeof features, any>[]
  >(() => {
    const accountColumns: ColumnDef<typeof features, any>[] =
      columns.map((column) => ({
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

    const actionColumn: ColumnDef<typeof features, any> = {
      id: "actions",
      header: "",
      cell: ({ row }: { row: any }) => {
        const item = row.original as T;

        return (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2 whitespace-nowrap"
              onClick={() => {
                setSelectedAccount(item);
              }}
            >
              <Eye className="h-3.5 w-3.5" />

              <span>View</span>
            </Button>
          </div>
        );
      },
    };

    return [...accountColumns, actionColumn];
  }, [columns, getDetails]);

  /* ------------------------------------------------------------------ */
  /* Table                                                               */
  /* ------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------ */
  /* Pagination                                                          */
  /* ------------------------------------------------------------------ */

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / pagination.pageSize),
  );

  const currentPage = pagination.pageIndex + 1;

  /* ------------------------------------------------------------------ */
  /* Empty state                                                         */
  /* ------------------------------------------------------------------ */

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border/70 bg-card p-10 text-center shadow-sm">
        <p className="text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */

  return (
    <>
      <div className="space-y-4">
        {/* ============================================================ */}
        {/* DESKTOP TABLE                                                */}
        {/* ============================================================ */}

        <div className="hidden overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm md:block">
          <div className="overflow-x-auto">
            <table className="w-full bg-card">
              <thead className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={[
                          "whitespace-nowrap px-4 py-3",
                          "text-left text-xs font-semibold",
                          "text-muted-foreground",
                          header.column.id === "actions"
                            ? "text-right"
                            : "",
                        ].join(" ")}
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
                        className={[
                          "px-4 py-4 align-middle",
                          cell.column.id === "actions"
                            ? "text-right"
                            : "",
                        ].join(" ")}
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

        {/* ============================================================ */}
        {/* MOBILE                                                        */}
        {/* ============================================================ */}

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

                  const isActions = cell.column.id === "actions";

                  if (isActions) {
                    return (
                      <div key={cell.id} className="border-t pt-3">
                        <table.FlexRender cell={cell} />
                      </div>
                    );
                  }

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
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* ACCOUNT DETAILS MODAL                                        */}
      {/* ============================================================ */}

      {selectedAccount && getDetails && (
        <AccountDetailsModal
          open={true}
          title={getDetails(selectedAccount).title}
          subtitle={getDetails(selectedAccount).subtitle}
          details={getDetails(selectedAccount).details}
          onClose={() => setSelectedAccount(null)}
        />
      )}
    </>
  );
}
