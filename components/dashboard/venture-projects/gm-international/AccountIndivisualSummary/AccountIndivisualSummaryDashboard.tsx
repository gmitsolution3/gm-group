"use client";

import {
  BriefcaseBusiness,
  GraduationCap,
  HeartPulse,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

type ServiceType =
  | "student"
  | "medical"
  | "tourist"
  | "business"
  | "visa";

  type ServiceTab = {
  value: ServiceType;
  label: string;
  icon: React.ElementType;
};

const services: ServiceTab[] = [
  {
    value: "student",
    label: "Student",
    icon: GraduationCap,
  },
  {
    value: "medical",
    label: "Medical",
    icon: HeartPulse,
  },
  {
    value: "tourist",
    label: "Tourist",
    icon: Plane,
  },
  {
    value: "business",
    label: "Business",
    icon: BriefcaseBusiness,
  },
  {
    value: "visa",
    label: "Visa",
    icon: ShieldCheck,
  },
];

function AccountServiceTabs({
  activeService,
  onChange,
}: {
  activeService: ServiceType;
  onChange: (service: ServiceType) => void;
}) {
  return (
    <div className="border-b border-border">
      <div className="flex w-full overflow-x-auto">
        {services.map((service) => {
          const Icon = service.icon;
          const isActive =
            activeService === service.value;

          return (
            <button
              key={service.value}
              type="button"
              onClick={() => onChange(service.value)}
              className={[
                "relative flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />

              <span>{service.label}</span>

              {isActive && (
                <span className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-foreground" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

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

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useFetch<{
    success: boolean;
    message: string;
    data: AccountsIndividualSummary;
  }>(API_URL);

  const handleServiceChange = (
    service: ServiceType,
  ) => {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.set("service", service);

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };

  if (isLoading) {
    return <AccountIndivisualSummaryLoader />;
  }

  if (
    isError ||
    !data?.success ||
    !data.data
  ) {
    return (
      <AccountIndivisualSummaryError
        onRetry={() => refetch()}
      />
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
  const serviceResponse =
    data.data[activeService];

  const serviceAvailable =
    serviceResponse?.success === true;

  /*
   * Do not create a union array here.
   *
   * The service-specific components receive their
   * own strongly typed data below.
   */

  const studentAccounts =
    activeService === "student" &&
    serviceAvailable
      ? (serviceResponse?.data?.data?.result ??
          []) as StudentAccount[]
      : null;

  const medicalAccounts =
    activeService === "medical" &&
    serviceAvailable
      ? (serviceResponse?.data?.data?.result ??
          []) as MedicalAccount[]
      : null;

  const touristAccounts =
    activeService === "tourist" &&
    serviceAvailable
      ? (serviceResponse?.data?.data?.result ??
          []) as TouristAccount[]
      : null;

  const businessAccounts =
    activeService === "business" &&
    serviceAvailable
      ? (serviceResponse?.data?.data?.result ??
          []) as BusinessAccount[]
      : null;

  const visaAccounts =
    activeService === "visa" &&
    serviceAvailable
      ? (serviceResponse?.data?.data?.result ??
          []) as VisaAccount[]
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
            Overview of individual accounts,
            payments, and outstanding balances
            across GM International services.
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

        {activeService === "student" &&
          studentAccounts && (
            <StudentAccounts
              data={studentAccounts}
            />
          )}

        {activeService === "medical" &&
          medicalAccounts && (
            <MedicalAccounts
              data={medicalAccounts}
            />
          )}

        {activeService === "tourist" &&
          touristAccounts && (
            <TouristAccounts
              data={touristAccounts}
            />
          )}

        {activeService === "business" &&
          businessAccounts && (
            <BusinessAccounts
              data={businessAccounts}
            />
          )}

        {activeService === "visa" &&
          visaAccounts && (
            <VisaAccounts
              data={visaAccounts}
            />
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
/* SERVICE UNAVAILABLE                                                    */
/* ====================================================================== */

function ServiceUnavailable({
  service,
  onRetry,
}: {
  service: ServiceType;
  onRetry: () => void;
}) {
  const label =
    services.find(
      (item) => item.value === service,
    )?.label ?? service;

  return (
    <div className="rounded-2xl border bg-card p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">
        {label} account data unavailable
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        The {label.toLowerCase()} account service
        did not return usable data.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-lg border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
      >
        Try again
      </button>
    </div>
  );
}

/* ====================================================================== */
/* STUDENT ACCOUNTS                                                       */
/* ====================================================================== */

function StudentAccounts({
  data,
}: {
  data: StudentAccount[];
}) {
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
                <p className="truncate font-medium">
                  {item.name}
                </p>

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
            render: (item) =>
              formatCurrency(item.totalAmount),
          },

          {
            key: "advance",
            label: "Advance",
            render: (item) =>
              formatCurrency(item.advance),
          },

          {
            key: "due",
            label: "Due",
            render: (item) => (
              <DueAmount value={item.due} />
            ),
          },
        ]}
      />
    </section>
  );
}

/* ====================================================================== */
/* MEDICAL ACCOUNTS                                                       */
/* ====================================================================== */

function MedicalAccounts({
  data,
}: {
  data: MedicalAccount[];
}) {
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
                <p className="truncate font-medium">
                  {item.name}
                </p>

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
            render: (item) =>
              item.countryName,
          },

          {
            key: "age",
            label: "Age",
            render: (item) =>
              item.patientAge,
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
            render: (item) =>
              formatDate(item.flyingDate),
          },

          {
            key: "total",
            label: "Total",
            render: (item) =>
              formatCurrency(item.totalAmount),
          },

          {
            key: "advance",
            label: "Advance",
            render: (item) =>
              formatCurrency(item.advance),
          },

          {
            key: "due",
            label: "Due",
            render: (item) => (
              <DueAmount value={item.due} />
            ),
          },
        ]}
      />
    </section>
  );
}

/* ====================================================================== */
/* TOURIST ACCOUNTS                                                       */
/* ====================================================================== */

function TouristAccounts({
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
              <span className="capitalize">
                {item.gender}
              </span>
            ),
          },

          {
            key: "guests",
            label: "Guests",
            render: (item) =>
              item.numberOfGuests,
          },

          {
            key: "passport",
            label: "Passport",
            render: (item) =>
              item.passportNumber || "—",
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
            render: (item) =>
              item.duration,
          },

          {
            key: "flyingDate",
            label: "Flying date",
            render: (item) =>
              formatDate(item.flyingDate),
          },

          {
            key: "total",
            label: "Total",
            render: (item) =>
              formatCurrency(item.totalAmount),
          },

          {
            key: "advance",
            label: "Advance",
            render: (item) =>
              formatCurrency(item.advance),
          },

          {
            key: "due",
            label: "Due",
            render: (item) => (
              <DueAmount value={item.due} />
            ),
          },
        ]}
      />
    </section>
  );
}

/* ====================================================================== */
/* BUSINESS ACCOUNTS                                                      */
/* ====================================================================== */

function BusinessAccounts({
  data,
}: {
  data: BusinessAccount[];
}) {
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
            render: (item) =>
              item.country,
          },

          {
            key: "office",
            label: "Office",
            render: (item) =>
              item.officeLocation,
          },

          {
            key: "gender",
            label: "Gender",
            render: (item) => (
              <span className="capitalize">
                {item.gender}
              </span>
            ),
          },

          {
            key: "passport",
            label: "Passport",
            render: (item) =>
              item.passportNumber || "—",
          },

          {
            key: "total",
            label: "Total",
            render: (item) =>
              formatCurrency(item.totalAmount),
          },

          {
            key: "advance",
            label: "Advance",
            render: (item) =>
              formatCurrency(item.advance),
          },

          {
            key: "due",
            label: "Due",
            render: (item) => (
              <DueAmount value={item.due} />
            ),
          },
        ]}
      />
    </section>
  );
}

/* ====================================================================== */
/* VISA ACCOUNTS                                                          */
/* ====================================================================== */

function VisaAccounts({
  data,
}: {
  data: VisaAccount[];
}) {
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
            render: (item) =>
              item.passportNumber || "—",
          },

          {
            key: "dateOfBirth",
            label: "Date of birth",
            render: (item) =>
              formatDate(item.dateOfBirth),
          },

          {
            key: "country",
            label: "Country",
            render: (item) =>
              item.country,
          },

          {
            key: "total",
            label: "Total",
            render: (item) =>
              formatCurrency(item.totalAmount),
          },

          {
            key: "advance",
            label: "Advance",
            render: (item) =>
              formatCurrency(item.advance),
          },

          {
            key: "due",
            label: "Due",
            render: (item) => (
              <DueAmount value={item.due} />
            ),
          },
        ]}
      />
    </section>
  );
}

/* ====================================================================== */
/* SERVICE HEADER                                                         */
/* ====================================================================== */

function ServiceHeader({
  title,
  count,
  description,
}: {
  title: string;
  count: number;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          {title}
        </h2>

        <span className="shrink-0 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          {count}{" "}
          {count === 1
            ? "account"
            : "accounts"}
        </span>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/* ====================================================================== */
/* DUE AMOUNT                                                             */
/* ====================================================================== */

function DueAmount({
  value,
}: {
  value: number;
}) {
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