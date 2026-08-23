"use client";

import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCw,
  Star,
  Trash2,
} from "lucide-react";

import { useMemo, useState } from "react";

import {
  rowPaginationFeature,
  tableFeatures,
  useTable,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";

import { useDelete } from "@/hooks/api/useDelete";
import { useFetch } from "@/hooks/api/useFetch";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EmptyVentures from "./EmptyVentures";
import VenturesDashboardError from "./VenturesDashboardError";
import VenturesTableLoader from "./VenturesTableLoader";

import { Venture } from "@/types";
import { formatDate } from "@/utils";

import CreateVentureModal from "./CreateVentureModal";
import DeleteVentureModal from "./DeleteVentureModal";
import UpdateVentureModal from "./UpdateVentureModal";
import VentureDetailsModal from "./VentureDetailsModal";

const PAGE_SIZE = 10;

const features = tableFeatures({
  rowPaginationFeature,
});

export default function VenturesDashboard() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [selectedVenture, setSelectedVenture] =
    useState<Venture | null>(null);

  const [updateVenture, setUpdateVenture] = useState<Venture | null>(
    null,
  );

  const [deleteVenture, setDeleteVenture] = useState<Venture | null>(
    null,
  );

  const { data, isLoading, isError, refetch } = useFetch<Venture[]>(
    "/ventures/get-all",
  );

  const { mutate: deleteVentureRequest, isLoading: isDeleting } =
    useDelete("/ventures/del");

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

      {
        id: "actions",
        header: "",

        enableHiding: false,

        cell: ({ row }) => {
          const venture = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label={`Actions for ${venture.name}`}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-44 p-1">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedVenture(venture);
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View detail
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    setUpdateVenture(venture);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit venture
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => {
                    setDeleteVenture(venture);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete venture
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
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

  async function handleDeleteVenture() {
    if (!deleteVenture || isDeleting) {
      return;
    }

    try {
      await deleteVentureRequest(deleteVenture._id);

      setDeleteVenture(null);

      await refetch();
    } catch {
      // Error is handled below through the mutation state.
    }
  }

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-8">
        {/* Header */}
        <section>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
                Administration
              </p>

              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Ventures
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Manage and review the ventures operating under GM
                Group.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button
                type="button"
                className="p-3 py-5"
                variant="outline"
                onClick={() => refetch()}
                disabled={isLoading}
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    isLoading ? "animate-spin" : ""
                  }`}
                />
              </Button>

              <Button
                type="button"
                className="bg-indigo p-5"
                onClick={() => setCreateModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create new venture
              </Button>
            </div>
          </div>
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
            {isLoading ? (
              <VenturesTableLoader />
            ) : isError ? (
              <VenturesDashboardError
                onRetry={() => refetch()}
                isLoading={isLoading}
              />
            ) : ventures.length === 0 ? (
              <EmptyVentures
                onCreate={() => setCreateModalOpen(true)}
              />
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

      <CreateVentureModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      <VentureDetailsModal
        venture={selectedVenture}
        open={Boolean(selectedVenture)}
        onClose={() => setSelectedVenture(null)}
      />

      <UpdateVentureModal
        venture={updateVenture}
        open={Boolean(updateVenture)}
        onClose={() => setUpdateVenture(null)}
        onUpdated={() => {
          setUpdateVenture(null);
          refetch();
        }}
      />

      <DeleteVentureModal
        venture={deleteVenture}
        open={Boolean(deleteVenture)}
        onClose={() => setDeleteVenture(null)}
        onDeleted={() => {
          refetch();
        }}
      />
    </div>
  );
}
