"use client";

import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  tableFeatures,
  useTable,
  type ColumnDef,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import AccountDetailsModal, {
  type AccountDetail,
} from "./AccountDetailsModal";

const DEFAULT_PAGE_SIZE = 10;

const features = tableFeatures({});

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
  /* ------------------------------------------------------------------ */
  /* SELECTED ACCOUNT                                                   */
  /* ------------------------------------------------------------------ */

  const [selectedAccount, setSelectedAccount] =
    useState<T | null>(null);

  /* ------------------------------------------------------------------ */
  /* PAGINATION                                                         */
  /* ------------------------------------------------------------------ */

  /*
   * IMPORTANT:
   *
   * Pagination is intentionally managed by this component instead
   * of TanStack.
   *
   * The API returns the complete account array, so this is
   * client-side pagination.
   */
  const [pageIndex, setPageIndex] = useState(0);

  /*
   * Reset to page 1 when:
   *
   * - switching service
   * - receiving a different dataset
   * - changing page size
   */
  useEffect(() => {
    setPageIndex(0);
  }, [data, pageSize]);

  /* ------------------------------------------------------------------ */
  /* PAGE CALCULATIONS                                                   */
  /* ------------------------------------------------------------------ */

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / pageSize),
  );

  /*
   * Protect against an invalid page if the number of records
   * becomes smaller.
   */
  const currentPageIndex = Math.min(
    pageIndex,
    totalPages - 1,
  );

  const currentPage = currentPageIndex + 1;

  /* ------------------------------------------------------------------ */
  /* CURRENT PAGE DATA                                                   */
  /* ------------------------------------------------------------------ */

  const paginatedData = useMemo(() => {
    const startIndex = currentPageIndex * pageSize;

    const endIndex = startIndex + pageSize;

    return data.slice(startIndex, endIndex);
  }, [
    data,
    currentPageIndex,
    pageSize,
  ]);

  /* ------------------------------------------------------------------ */
  /* TANSTACK DATA                                                       */
  /* ------------------------------------------------------------------ */

  /*
   * TanStack receives ONLY the records belonging to the current page.
   *
   * There is deliberately no TanStack pagination state here.
   */
  const tableData = paginatedData as unknown as any[];

  /* ------------------------------------------------------------------ */
  /* COLUMNS                                                             */
  /* ------------------------------------------------------------------ */

  const tableColumns = useMemo<
    ColumnDef<typeof features, any>[]
  >(() => {
    const accountColumns: ColumnDef<
      typeof features,
      any
    >[] = columns.map((column) => ({
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

    const actionColumn: ColumnDef<
      typeof features,
      any
    > = {
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

    return [
      ...accountColumns,
      actionColumn,
    ];
  }, [columns, getDetails]);

  /* ------------------------------------------------------------------ */
  /* TANSTACK TABLE                                                      */
  /* ------------------------------------------------------------------ */

  const table = useTable({
    key: "account-table",

    features,

    columns: tableColumns,

    data: tableData,
  });

  /* ------------------------------------------------------------------ */
  /* EMPTY STATE                                                         */
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
  /* PAGINATION HANDLERS                                                 */
  /* ------------------------------------------------------------------ */

  const handlePreviousPage = () => {
    setPageIndex((current) =>
      Math.max(0, current - 1),
    );
  };

  const handleNextPage = () => {
    setPageIndex((current) =>
      Math.min(totalPages - 1, current + 1),
    );
  };

  /* ------------------------------------------------------------------ */
  /* RENDER                                                              */
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
              <thead className="bg-muted/40">
                {table.getHeaderGroups().map(
                  (headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(
                        (header) => (
                          <th
                            key={header.id}
                            className={[
                              "whitespace-nowrap border-b border-border/70 px-4 py-3.5",
                              "text-left text-xs font-semibold uppercase tracking-wide",
                              "text-muted-foreground",
                            ].join(" ")}
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
                  ),
                )}
              </thead>

              <tbody className="divide-y divide-border/60">
                {table.getRowModel().rows.map(
                  (row) => (
                    <tr
                      key={row.id}
                      className="group bg-card transition-colors hover:bg-muted/20"
                    >
                      {row
                        .getAllCells()
                        .map((cell) => (
                          <td
                            key={cell.id}
                            className="px-4 py-4 align-middle text-sm"
                          >
                            <table.FlexRender
                              cell={cell}
                            />
                          </td>
                        ))}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE                                                        */}
        {/* ============================================================ */}

        <div className="space-y-3 md:hidden">
          {table.getRowModel().rows.map(
            (row) => (
              <div
                key={row.id}
                className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm"
              >
                <div className="space-y-4 p-4">
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
            ),
          )}
        </div>

        {/* ============================================================ */}
        {/* PAGINATION                                                    */}
        {/* ============================================================ */}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border/60 pt-4">
            <div>
              <p className="text-sm font-medium">
                Page {currentPage}{" "}
                <span className="font-normal text-muted-foreground">
                  of {totalPages}
                </span>
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {data.length}{" "}
                {data.length === 1
                  ? "account"
                  : "accounts"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Previous */}
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9"
                disabled={currentPageIndex === 0}
                onClick={handlePreviousPage}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Next */}
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9"
                disabled={
                  currentPageIndex >=
                  totalPages - 1
                }
                onClick={handleNextPage}
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
          title={
            getDetails(selectedAccount).title
          }
          subtitle={
            getDetails(selectedAccount).subtitle
          }
          details={
            getDetails(selectedAccount).details
          }
          onClose={() =>
            setSelectedAccount(null)
          }
        />
      )}
    </>
  );
}