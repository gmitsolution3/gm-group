"use client";

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Star,
  XCircle,
} from "lucide-react";

import { useMemo, useState } from "react";

import {
  rowPaginationFeature,
  tableFeatures,
  useTable,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";

import { useFetch } from "@/hooks/api/useFetch";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Venture } from "@/types";
import { formatDate } from "@/utils";

const PAGE_SIZE = 10;

const features = tableFeatures({
  rowPaginationFeature,
});

export default function VenturesDashboard() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const { data, isLoading, isError, refetch } = useFetch<Venture[]>(
    "/ventures/get-all",
  );

  const ventures = data ?? [];

  const columns = useMemo<ColumnDef<typeof features, Venture>[]>(
    () => [
      {
        id: "venture",
        header: "Venture",

        cell: ({ row }) => {
          const venture = row.original;

          return (
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border bg-muted">
                {venture.image ? (
                  <img
                    src={venture.image}
                    alt={venture.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-semibold">
                    {venture.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium">{venture.name}</p>

                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {venture.slug}
                </p>
              </div>
            </div>
          );
        },
      },

      {
        id: "industry",
        header: "Industry",

        cell: ({ row }) => (
          <span className="text-sm">{row.original.industry}</span>
        ),
      },

      {
        id: "established",
        header: "Established",

        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.established || "—"}
          </span>
        ),
      },

      {
        id: "featured",
        header: "Featured",

        cell: ({ row }) =>
          row.original.featured ? (
            <Badge
              variant="outline"
              className="border-amber-200 bg-amber-50 text-amber-700"
            >
              <Star className="mr-1.5 h-3 w-3 fill-current" />
              Featured
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-muted-foreground"
            >
              Not featured
            </Badge>
          ),
      },

      {
        id: "website",
        header: "Website",

        cell: ({ row }) => {
          const website = row.original.website;

          if (!website) {
            return (
              <span className="text-sm text-muted-foreground">—</span>
            );
          }

          return (
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo hover:underline"
            >
              Visit
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          );
        },
      },

      {
        id: "updatedAt",
        header: "Updated",

        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            {formatDate(row.original.updatedAt)}
          </span>
        ),
      },
    ],
    [],
  );

  const table = useTable({
    key: "ventures-dashboard",

    features,

    columns,

    data: ventures,

    state: {
      pagination,
    },

    onPaginationChange: setPagination,
  });

  const totalPages = Math.max(
    1,
    Math.ceil(ventures.length / pagination.pageSize),
  );

  const currentPage = pagination.pageIndex + 1;

  if (isLoading) {
    return (
      <div className="space-y-8 p-6 lg:p-8">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />

          <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-muted" />

          <div className="mt-8 h-96 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-8 p-6 lg:p-8">
        <div className="mx-auto w-full max-w-[1440px]">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <XCircle className="h-10 w-10 text-destructive" />

              <h2 className="mt-4 text-lg font-semibold">
                Failed to load ventures
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                We couldn't retrieve the venture data.
              </p>

              <Button
                type="button"
                variant="outline"
                className="mt-5"
                onClick={() => refetch()}
              >
                Try again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-8">
        {/* Header */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
            Administration
          </p>

          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Ventures
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Manage and review the ventures operating under GM Group.
          </p>
        </section>

        {/* Venture list */}
        <Card>
          <CardHeader>
            <CardTitle>Venture list</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              {ventures.length}{" "}
              {ventures.length === 1 ? "venture" : "ventures"}{" "}
              registered
            </p>
          </CardHeader>

          <CardContent>
            {ventures.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-10 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-muted-foreground" />

                <p className="mt-3 text-sm text-muted-foreground">
                  No ventures found.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop */}
                <div className="hidden overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm md:block">
                  <div className="overflow-x-auto">
                    <table className="w-full bg-card">
                      <thead className="bg-muted/50">
                        {table
                          .getHeaderGroups()
                          .map((headerGroup) => (
                            <tr key={headerGroup.id}>
                              {headerGroup.headers.map((header) => (
                                <th
                                  key={header.id}
                                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-muted-foreground"
                                >
                                  {header.isPlaceholder ? null : (
                                    <table.FlexRender
                                      header={header}
                                    />
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
                  {table.getRowModel().rows.map((row) => {
                    const venture = row.original;

                    return (
                      <div
                        key={row.id}
                        className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border bg-muted">
                            {venture.image ? (
                              <img
                                src={venture.image}
                                alt={venture.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center font-semibold">
                                {venture.name.charAt(0)}
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {venture.name}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {venture.industry}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              Established {venture.established || "—"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          {venture.featured ? (
                            <Badge
                              variant="outline"
                              className="border-amber-200 bg-amber-50 text-amber-700"
                            >
                              <Star className="mr-1.5 h-3 w-3 fill-current" />
                              Featured
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              Not featured
                            </span>
                          )}

                          {venture.website && (
                            <a
                              href={venture.website}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo"
                            >
                              Visit
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-5 flex items-center justify-between">
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
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
