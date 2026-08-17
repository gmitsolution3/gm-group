"use client";

import { useMemo } from "react";

import { useFetch } from "@/hooks/api/useFetch";

import {
  AccountsIndividualSummary,
  BusinessAccount,
  MedicalAccount,
  StudentAccount,
  TouristAccount,
  VisaAccount,
} from "@/types";

import { API_ENDPOINTS } from "@/config/api/api";

import { AccountIndivisualSummaryError } from "./AccountIndivisualSummaryError";
import { AccountIndivisualSummaryLoader } from "./AccountIndivisualSummaryLoader";
import AccountSummaryCard from "./AccountSummaryCard";
import AccountTable from "./AccountTable";

import { formatCurrency, formatDate } from "@/utils";

function getServiceResult<T>(
  service:
    | {
        success: boolean;
        data?: {
          data?: {
            result?: T[];
          };
        };
      }
    | undefined,
): T[] {
  if (!service?.success) {
    return [];
  }

  return service.data?.data?.result ?? [];
}

function getTotal(items: Array<{ totalAmount: number }>) {
  return items.reduce(
    (total, item) => total + (item.totalAmount || 0),
    0,
  );
}

function getDue(items: Array<{ due: number }>) {
  return items.reduce((total, item) => total + (item.due || 0), 0);
}

export default function AccountIndivisualSummaryDashboard({
  email,
}: {
  email: string;
}) {
  const url = useMemo(() => {
    const params = new URLSearchParams({
      student: "true",
      tourist: "true",
      medical: "true",
      business: "true",
      visa: "true",
    });

    return `${API_ENDPOINTS.gmInternational.accountsIndividualSummary}/${encodeURIComponent(email)}?${params.toString()}`;
  }, [email]);

  const { data, isLoading, isError, refetch } = useFetch<{
    success: boolean;
    message: string;
    data: AccountsIndividualSummary;
  }>(url);

  if (isLoading) {
    return <AccountIndivisualSummaryLoader />;
  }

  if (isError || !data) {
    return <AccountIndivisualSummaryError onRetry={refetch} />;
  }

  const services = data.data;

  const student = getServiceResult<StudentAccount>(services.student);

  const medical = getServiceResult<MedicalAccount>(services.medical);

  const tourist = getServiceResult<TouristAccount>(services.tourist);

  const business = getServiceResult<BusinessAccount>(
    services.business,
  );

  const visa = getServiceResult<VisaAccount>(services.visa);

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          GM Group
        </p>

        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
          Accounts Overview
        </h1>

        <p className="mt-2 text-muted-foreground">
          Overview of individual accounts, payments, and outstanding
          balances across GM International services.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AccountSummaryCard
          title="Student"
          count={student.length}
          totalAmount={getTotal(student)}
          totalDue={getDue(student)}
          unavailable={!services.student?.success}
        />

        <AccountSummaryCard
          title="Medical"
          count={medical.length}
          totalAmount={getTotal(medical)}
          totalDue={getDue(medical)}
          unavailable={!services.medical?.success}
        />

        <AccountSummaryCard
          title="Tourist"
          count={tourist.length}
          totalAmount={getTotal(tourist)}
          totalDue={getDue(tourist)}
          unavailable={!services.tourist?.success}
        />

        <AccountSummaryCard
          title="Business"
          count={business.length}
          totalAmount={getTotal(business)}
          totalDue={getDue(business)}
          unavailable={!services.business?.success}
        />

        <AccountSummaryCard
          title="Visa"
          count={visa.length}
          totalAmount={getTotal(visa)}
          totalDue={getDue(visa)}
          unavailable={!services.visa?.success}
        />
      </div>

      {/* Student */}
      {services.student?.success && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">
              Student Accounts
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {student.length} student accounts
            </p>
          </div>

          <AccountTable
            data={student}
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
                render: (item) => (
                  <span className="font-semibold text-amber-600">
                    {formatCurrency(item.due)}
                  </span>
                ),
              },
            ]}
          />
        </section>
      )}

      {/* Medical */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Medical Accounts</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {services.medical?.success
              ? `${medical.length} medical accounts`
              : "Service data is currently unavailable."}
          </p>
        </div>

        {services.medical?.success ? (
          <AccountTable
            data={medical}
            columns={[
              {
                key: "name",
                label: "Patient",
                render: (item) => (
                  <div>
                    <p className="font-medium">{item.name}</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.patientPhone}
                    </p>
                  </div>
                ),
              },
              {
                key: "hospital",
                label: "Hospital",
                render: (item) => item.hospitalName,
              },
              {
                key: "country",
                label: "Country",
                render: (item) => item.countryName,
              },
              {
                key: "age",
                label: "Age",
                render: (item) => item.patientAge,
              },
              {
                key: "disease",
                label: "Disease",
                render: (item) => (
                  <span className="block max-w-[220px] truncate">
                    {item.patientDisease}
                  </span>
                ),
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
                key: "due",
                label: "Due",
                render: (item) => (
                  <span className="font-semibold text-amber-600">
                    {formatCurrency(item.due)}
                  </span>
                ),
              },
            ]}
          />
        ) : (
          <div className="rounded-2xl border p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Service data is currently unavailable.
            </p>
          </div>
        )}
      </section>

      {/* Tourist */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Tourist Accounts</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {services.tourist?.success
              ? `${tourist.length} tourist accounts`
              : "Service data is currently unavailable."}
          </p>
        </div>

        {services.tourist?.success ? (
          <AccountTable
            data={tourist}
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
                key: "due",
                label: "Due",
                render: (item) => (
                  <span className="font-semibold text-amber-600">
                    {formatCurrency(item.due)}
                  </span>
                ),
              },
            ]}
          />
        ) : (
          <div className="rounded-2xl border p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Service data is currently unavailable.
            </p>
          </div>
        )}
      </section>

      {/* Business */}
      {services.business?.success && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">
              Business Accounts
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {business.length} business accounts
            </p>
          </div>

          <AccountTable
            data={business}
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
                key: "country",
                label: "Country",
                render: (item) => item.country,
              },
              {
                key: "office",
                label: "Office",
                render: (item) => item.officeLocation,
              },
              {
                key: "passport",
                label: "Passport",
                render: (item) => item.passportNumber || "—",
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
                render: (item) => (
                  <span className="font-semibold text-amber-600">
                    {formatCurrency(item.due)}
                  </span>
                ),
              },
            ]}
          />
        </section>
      )}

      {/* Visa */}
      {services.visa?.success && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Visa Accounts</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {visa.length} visa accounts
            </p>
          </div>

          <AccountTable
            data={visa}
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
                key: "passport",
                label: "Passport",
                render: (item) => item.passportNumber || "—",
              },
              {
                key: "dateOfBirth",
                label: "Date of birth",
                render: (item) => formatDate(item.dateOfBirth),
              },
              {
                key: "country",
                label: "Country",
                render: (item) => item.country,
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
                render: (item) => (
                  <span className="font-semibold text-amber-600">
                    {formatCurrency(item.due)}
                  </span>
                ),
              },
            ]}
          />
        </section>
      )}
    </div>
  );
}
