"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
import AccountTable from "./AccountTable";

import { formatCurrency, formatDate } from "@/utils";
import AccountServiceTabs from "./AccountServiceTabs";
import ServiceHeader from "./ServiceHeader";
import ServiceUnavailable from "./ServiceUnavailable";

export type ServiceType =
  | "student"
  | "medical"
  | "tourist"
  | "business"
  | "visa";

export default function AccountIndivisualSummaryDashboard({
  email,
}: {
  email: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceParam = searchParams.get("service");

  const activeService: ServiceType =
    serviceParam === "medical" ||
    serviceParam === "tourist" ||
    serviceParam === "business" ||
    serviceParam === "visa"
      ? serviceParam
      : "student";

  /*
   * Only request the currently selected service.
   *
   * student  -> ?student=true
   * medical  -> ?medical=true
   * tourist  -> ?tourist=true
   * business -> ?business=true
   * visa     -> ?visa=true
   */
  const API_URL = useMemo(() => {
    return `${API_ENDPOINTS.gmInternational.accountsIndividualSummary}/${encodeURIComponent(
      email,
    )}?${activeService}=true`;
  }, [email, activeService]);

  const { data, isLoading, isError, refetch } = useFetch<{
    success: boolean;
    message: string;
    data: AccountsIndividualSummary;
  }>(API_URL);

  const handleServiceChange = (service: ServiceType) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("service", service);

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };

  if (isLoading) {
    return <AccountIndivisualSummaryLoader />;
  }

  if (isError || !data?.success || !data.data) {
    return (
      <AccountIndivisualSummaryError onRetry={() => refetch()} />
    );
  }

  /*
   * The account API returns only the requested service.
   *
   * Account response:
   *
   * data
   * └── service
   *     └── data
   *         ├── success
   *         ├── message
   *         └── data
   *             └── result[]
   *
   * Therefore we extract only the active service here.
   */
  const serviceResponse = data.data[activeService];

  const serviceAvailable = serviceResponse?.success === true;

  /*
   * Do not create a union array here.
   *
   * The service-specific components receive their
   * own strongly typed data below.
   */

  const studentAccounts =
    activeService === "student" && serviceAvailable
      ? ((serviceResponse?.data?.data?.result ??
          []) as StudentAccount[])
      : null;

  const medicalAccounts =
    activeService === "medical" && serviceAvailable
      ? ((serviceResponse?.data?.data?.result ??
          []) as MedicalAccount[])
      : null;

  const touristAccounts =
    activeService === "tourist" && serviceAvailable
      ? ((serviceResponse?.data?.data?.result ??
          []) as TouristAccount[])
      : null;

  const businessAccounts =
    activeService === "business" && serviceAvailable
      ? ((serviceResponse?.data?.data?.result ??
          []) as BusinessAccount[])
      : null;

  const visaAccounts =
    activeService === "visa" && serviceAvailable
      ? ((serviceResponse?.data?.data?.result ?? []) as VisaAccount[])
      : null;

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-8">
        {/* ------------------------------------------------------------ */}
        {/* HEADER                                                       */}
        {/* ------------------------------------------------------------ */}

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
            GM International
          </p>

          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Accounts Overview
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Overview of individual accounts, payments, and outstanding
            balances across GM International services.
          </p>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* SERVICE TABS                                                 */}
        {/* ------------------------------------------------------------ */}

        <AccountServiceTabs
          activeService={activeService}
          onChange={handleServiceChange}
        />

        {/* ------------------------------------------------------------ */}
        {/* SELECTED SERVICE                                             */}
        {/* ------------------------------------------------------------ */}

        {activeService === "student" && studentAccounts && (
          <StudentAccounts data={studentAccounts} />
        )}

        {activeService === "medical" && medicalAccounts && (
          <MedicalAccounts data={medicalAccounts} />
        )}

        {activeService === "tourist" && touristAccounts && (
          <TouristAccounts data={touristAccounts} />
        )}

        {activeService === "business" && businessAccounts && (
          <BusinessAccounts data={businessAccounts} />
        )}

        {activeService === "visa" && visaAccounts && (
          <VisaAccounts data={visaAccounts} />
        )}

        {!serviceAvailable && (
          <ServiceUnavailable
            service={activeService}
            onRetry={() => refetch()}
          />
        )}
      </div>
    </div>
  );
}

/* ====================================================================== */
/* STUDENT ACCOUNTS                                                       */
/* ====================================================================== */

function StudentAccounts({ data }: { data: StudentAccount[] }) {
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
              <div className="min-w-0">
                <p className="truncate font-medium">{item.name}</p>

                <p className="mt-1 truncate text-xs text-muted-foreground">
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
              <span className="block max-w-[280px] truncate">
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

/* ====================================================================== */
/* MEDICAL ACCOUNTS                                                       */
/* ====================================================================== */

function MedicalAccounts({ data }: { data: MedicalAccount[] }) {
  return (
    <section className="space-y-4">
      <ServiceHeader
        title="Medical Accounts"
        count={data.length}
        description="Medical treatment account and payment information."
      />

      <AccountTable
        data={data}
        columns={[
          {
            key: "patient",
            label: "Patient",
            render: (item) => (
              <div className="min-w-0">
                <p className="truncate font-medium">{item.name}</p>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {item.patientPhone}
                </p>
              </div>
            ),
          },

          {
            key: "hospital",
            label: "Hospital",
            render: (item) => (
              <span className="block max-w-[240px] truncate">
                {item.hospitalName}
              </span>
            ),
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

/* ====================================================================== */
/* TOURIST ACCOUNTS                                                       */
/* ====================================================================== */

function TouristAccounts({ data }: { data: TouristAccount[] }) {
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
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {item.clientName}
                </p>

                <p className="mt-1 truncate text-xs text-muted-foreground">
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
            render: (item) => (
              <span className="block max-w-[180px] truncate">
                {item.destinationCountry}
              </span>
            ),
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

/* ====================================================================== */
/* BUSINESS ACCOUNTS                                                      */
/* ====================================================================== */

function BusinessAccounts({ data }: { data: BusinessAccount[] }) {
  return (
    <section className="space-y-4">
      <ServiceHeader
        title="Business Accounts"
        count={data.length}
        description="Business account, office, and payment information."
      />

      <AccountTable
        data={data}
        columns={[
          {
            key: "client",
            label: "Client",
            render: (item) => (
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {item.clientName}
                </p>

                <p className="mt-1 truncate text-xs text-muted-foreground">
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
            key: "gender",
            label: "Gender",
            render: (item) => (
              <span className="capitalize">{item.gender}</span>
            ),
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
            render: (item) => <DueAmount value={item.due} />,
          },
        ]}
      />
    </section>
  );
}

/* ====================================================================== */
/* VISA ACCOUNTS                                                          */
/* ====================================================================== */

function VisaAccounts({ data }: { data: VisaAccount[] }) {
  return (
    <section className="space-y-4">
      <ServiceHeader
        title="Visa Accounts"
        count={data.length}
        description="Visa account, passport, and payment information."
      />

      <AccountTable
        data={data}
        columns={[
          {
            key: "client",
            label: "Client",
            render: (item) => (
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {item.clientName}
                </p>

                <p className="mt-1 truncate text-xs text-muted-foreground">
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
            render: (item) => <DueAmount value={item.due} />,
          },
        ]}
      />
    </section>
  );
}

/* ====================================================================== */
/* DUE AMOUNT                                                             */
/* ====================================================================== */

function DueAmount({ value }: { value: number }) {
  return (
    <span
      className={
        value > 0
          ? "font-semibold text-amber-600"
          : "font-semibold text-emerald-600"
      }
    >
      {formatCurrency(value)}
    </span>
  );
}
