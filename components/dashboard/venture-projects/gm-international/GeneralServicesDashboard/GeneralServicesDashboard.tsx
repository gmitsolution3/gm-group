"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useFetch } from "@/hooks/api/useFetch";

import { GeneralDashboardResponse } from "@/types";

import { API_ENDPOINTS } from "@/config/api/api";

import GeneralServicesDashboardError from "./GeneralServicesDashboardError";
import GeneralServicesDashboardLoader from "./GeneralServicesDashboardLoader";

import ServiceTabs, {
  type ServiceType,
} from "./ServiceTabs";

import StudentDashboard from "./StudentDashboard";
import MedicalDashboard from "./MedicalDashboard";
import TouristDashboard from "./TouristDashboard";
import BusinessDashboard from "./BusinessDashboard";

export default function GeneralServicesDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceParam = searchParams.get("service");

  const activeService: ServiceType =
    serviceParam === "medical" ||
    serviceParam === "tourist" ||
    serviceParam === "business"
      ? serviceParam
      : "student";

  const API_URL =
    `${API_ENDPOINTS.gmInternational.generalServicesDashboard}?${activeService}=true`;

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useFetch<GeneralDashboardResponse>(API_URL);

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
    return <GeneralServicesDashboardLoader />;
  }

  if (
    isError ||
    !data?.success ||
    !data.data
  ) {
    return (
      <GeneralServicesDashboardError
        message={data?.message}
        onRetry={() => refetch()}
      />
    );
  }

  const studentData =
    activeService === "student"
      ? data.data.student?.data?.data ?? null
      : null;

  const medicalData =
    activeService === "medical"
      ? data.data.medical?.data ?? null
      : null;

  const touristData =
    activeService === "tourist"
      ? data.data.tourist?.data?.data ?? null
      : null;

  const businessData =
    activeService === "business"
      ? data.data.business?.data ?? null
      : null;

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-8">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
            GM International
          </p>

          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            General Services
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Overview of GM International&apos;s
            general service operations.
          </p>
        </section>

        <ServiceTabs
          activeService={activeService}
          onChange={handleServiceChange}
        />

        {activeService === "student" &&
          studentData && (
            <StudentDashboard
              data={studentData}
            />
          )}

        {activeService === "medical" &&
          medicalData && (
            <MedicalDashboard
              data={medicalData}
            />
          )}

        {activeService === "tourist" &&
          touristData && (
            <TouristDashboard
              data={touristData}
            />
          )}

        {activeService === "business" &&
          businessData && (
            <BusinessDashboard
              data={businessData}
            />
          )}

        {!studentData &&
          !medicalData &&
          !touristData &&
          !businessData && (
            <GeneralServicesDashboardError
              message={`No ${activeService} dashboard data is available.`}
              onRetry={() => refetch()}
            />
          )}
      </div>
    </div>
  );
}