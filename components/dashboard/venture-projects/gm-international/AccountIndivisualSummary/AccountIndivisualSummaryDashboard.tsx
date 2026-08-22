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
import AccountServiceTabs from "./AccountServiceTabs";
import ServiceUnavailable from "./ServiceUnavailable";

import BusinessAccounts from "./BusinessAccounts";
import MedicalAccounts from "./MedicalAccounts";
import StudentAccounts from "./StudentAccounts";
import TouristAccounts from "./TouristAccounts";
import VisaAccounts from "./VisaAccounts";

export type ServiceType =
  | "student"
  | "medical"
  | "tourist"
  | "business"
  | "visa";

type AccountServiceResponse = {
  success: boolean;
  data?: {
    data?: {
      result?: unknown[];
    };
  };
};

function getServiceResult<T>(
  service: AccountServiceResponse | undefined,
): T[] {
  if (!service?.success) {
    return [];
  }

  return (service.data?.data?.result ?? []) as T[];
}

function isServiceType(value: string | null): value is ServiceType {
  return (
    value === "student" ||
    value === "medical" ||
    value === "tourist" ||
    value === "business" ||
    value === "visa"
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

  const activeService: ServiceType = isServiceType(serviceParam)
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
  const apiUrl = useMemo(() => {
    return `${API_ENDPOINTS.gmInternational.accountsIndividualSummary}/${encodeURIComponent(
      email,
    )}?${activeService}=true`;
  }, [email, activeService]);

  const { data, isLoading, isError, refetch } = useFetch<{
    success: boolean;
    message: string;
    data: AccountsIndividualSummary;
  }>(apiUrl);

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
    return <AccountIndivisualSummaryError onRetry={refetch} />;
  }

  /*
   * The API returns only the service requested by
   * the active tab.
   */
  const serviceResponse = data.data[activeService] as
    | AccountServiceResponse
    | undefined;

  const serviceAvailable = serviceResponse?.success === true;

  const accounts = getServiceResult<
    | StudentAccount
    | MedicalAccount
    | TouristAccount
    | BusinessAccount
    | VisaAccount
  >(serviceResponse);

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-8">
        {/* Header */}

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

        {/* Service Tabs */}

        <AccountServiceTabs
          activeService={activeService}
          onChange={handleServiceChange}
        />

        {/* Selected Service */}

        {serviceAvailable ? (
          <>
            {activeService === "student" && (
              <StudentAccounts data={accounts as StudentAccount[]} />
            )}

            {activeService === "medical" && (
              <MedicalAccounts data={accounts as MedicalAccount[]} />
            )}

            {activeService === "tourist" && (
              <TouristAccounts data={accounts as TouristAccount[]} />
            )}

            {activeService === "business" && (
              <BusinessAccounts
                data={accounts as BusinessAccount[]}
              />
            )}

            {activeService === "visa" && (
              <VisaAccounts data={accounts as VisaAccount[]} />
            )}
          </>
        ) : (
          <ServiceUnavailable
            service={activeService}
            onRetry={refetch}
          />
        )}
      </div>
    </div>
  );
}
