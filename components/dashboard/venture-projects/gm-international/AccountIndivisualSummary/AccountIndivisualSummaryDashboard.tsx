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

import StudentAccounts from "./StudentAccounts";
import TouristAccounts from "./TouristAccounts";
import MedicalAccounts from "./MedicalAccounts";
import BusinessAccounts from "./BusinessAccounts";
import VisaAccounts from "./VisaAccounts";

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
