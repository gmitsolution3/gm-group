"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  GraduationCap,
  HeartPulse,
  MapPin,
  Package,
  Plane,
  TrendingUp,
} from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";

import { useFetch } from "@/hooks/api/useFetch";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  BusinessDashboard,
  GeneralDashboardResponse,
  MedicalDashboard,
  StudentDashboard,
  TouristDashboard,
  TrendItem,
} from "@/types";

import { formatCurrency, formatDate } from "@/utils";

import { API_ENDPOINTS } from "@/config/api/api";

import GeneralServicesDashboardError from "./GeneralServicesDashboardError";
import GeneralServicesDashboardLoader from "./GeneralServicesDashboardLoader";

import ServiceTabs, { type ServiceType } from "./ServiceTabs";

import ActivityRow from "./ActivityRow";
import EmptyState from "./EmptyState";
import MiniStat from "./MiniStat";
import RecentCard from "./RecentCard";
import StatusRow from "./StatusRow";

/* ====================================================================== */
/* HELPERS                                                                */
/* ====================================================================== */

function formatMonth(item: TrendItem) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(item._id.year, item._id.month - 1));
}

/* ====================================================================== */
/* MAIN DASHBOARD                                                         */
/* ====================================================================== */

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

  /*
   * Only request the currently selected service.
   *
   * student  -> ?student=true
   * medical  -> ?medical=true
   * tourist  -> ?tourist=true
   * business -> ?business=true
   */
  const API_URL = `${API_ENDPOINTS.gmInternational.generalServicesDashboard}?${activeService}=true`;

  const { data, isLoading, isError, refetch } =
    useFetch<GeneralDashboardResponse>(API_URL);

  const handleServiceChange = (service: ServiceType) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("service", service);

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };

  if (isLoading) {
    return <GeneralServicesDashboardLoader />;
  }

  if (isError || !data?.success || !data.data) {
    return (
      <GeneralServicesDashboardError
        message={data?.message}
        onRetry={() => refetch()}
      />
    );
  }

  /*
   * Student / Medical / Tourist response:
   *
   * data
   * └── service
   *     └── data
   *         ├── success
   *         └── data
   *             └── actual dashboard
   *
   * Business response:
   *
   * data
   * └── business
   *     └── data
   *         └── actual dashboard
   */

  const studentData =
    activeService === "student"
      ? (data.data.student?.data?.data ?? null)
      : null;

  const medicalData =
    activeService === "medical"
      ? (data.data.medical?.data ?? null)
      : null;

  const touristData =
    activeService === "tourist"
      ? (data.data.tourist?.data?.data ?? null)
      : null;

  const businessData =
    activeService === "business"
      ? (data.data.business?.data ?? null)
      : null;

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-8">
        {/* -------------------------------------------------------------- */}
        {/* HEADER                                                         */}
        {/* -------------------------------------------------------------- */}

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo">
            GM International
          </p>

          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            General Services
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Overview of GM International&apos;s general service
            operations.
          </p>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* SERVICE TABS                                                    */}
        {/* -------------------------------------------------------------- */}

        <ServiceTabs
          activeService={activeService}
          onChange={handleServiceChange}
        />

        {/* -------------------------------------------------------------- */}
        {/* SELECTED SERVICE                                                */}
        {/* -------------------------------------------------------------- */}

        {activeService === "student" && studentData && (
          <StudentDashboardView data={studentData} />
        )}

        {activeService === "medical" && medicalData && (
          <MedicalDashboardView data={medicalData} />
        )}

        {activeService === "tourist" && touristData && (
          <TouristDashboardView data={touristData} />
        )}

        {activeService === "business" && businessData && (
          <BusinessDashboardView data={businessData} />
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

/* ====================================================================== */
/* STUDENT                                                               */
/* ====================================================================== */

function StudentDashboardView({ data }: { data: StudentDashboard }) {
  const totalApplications =
    data.documentCount?.totalApplications ?? 0;

  const approved = data.documentCount?.totalApproved ?? 0;

  const pending = data.documentCount?.totalPending ?? 0;

  const rejected = data.documentCount?.totalRejected ?? 0;

  return (
    <div className="space-y-8">
      {/* Overview */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          title="Applications"
          value={totalApplications}
          description="Total student applications"
          icon={<GraduationCap />}
          className="border-blue-100 bg-blue-50/40"
          iconClassName="bg-blue-100 text-blue-600"
        />

        <OverviewCard
          title="Approved"
          value={approved}
          description="Approved applications"
          icon={<CheckCircle2 />}
          className="border-emerald-100 bg-emerald-50/40"
          iconClassName="bg-emerald-100 text-emerald-600"
        />

        <OverviewCard
          title="Pending"
          value={pending}
          description="Awaiting processing"
          icon={<Clock3 />}
          className="border-amber-100 bg-amber-50/40"
          iconClassName="bg-amber-100 text-amber-600"
        />

        <OverviewCard
          title="Rejected"
          value={rejected}
          description="Rejected applications"
          icon={<TrendingUp />}
          className="border-red-100 bg-red-50/40"
          iconClassName="bg-red-100 text-red-600"
        />
      </section>

      {/* Applications + Universities */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Student applications</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Application and payment activity.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <StatusRow
              label="Approved"
              value={approved}
              total={totalApplications}
              color="bg-emerald-500"
            />

            <StatusRow
              label="Pending"
              value={pending}
              total={totalApplications}
              color="bg-amber-500"
            />

            <StatusRow
              label="Rejected"
              value={rejected}
              total={totalApplications}
              color="bg-red-500"
            />

            <div className="grid grid-cols-3 gap-3 pt-2">
              <MiniStat
                label="Pending payment"
                value={data.paymentStats?.pending ?? 0}
              />

              <MiniStat
                label="Paid"
                value={data.paymentStats?.paid ?? 0}
              />

              <MiniStat
                label="Failed"
                value={data.paymentStats?.failed ?? 0}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top universities</CardTitle>

            <p className="text-sm text-muted-foreground">
              Universities receiving the most applications.
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            {(data.topUniversities ?? []).length > 0 ? (
              data.topUniversities.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/40 px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <GraduationCap className="h-4 w-4" />
                    </div>

                    <span className="truncate text-sm font-medium">
                      {item._id}
                    </span>
                  </div>

                  <span className="font-bold text-blue-700">
                    {item.count}
                  </span>
                </div>
              ))
            ) : (
              <EmptyState text="No university data available." />
            )}
          </CardContent>
        </Card>
      </section>

      {/* Recent */}

      <RecentCard
        title="Recent student applications"
        icon={<GraduationCap />}
        color="blue"
      >
        {(data.recentApplications ?? []).length > 0 ? (
          data.recentApplications.map((item) => (
            <ActivityRow
              key={item._id}
              name={`${item.firstName} ${item.lastName}`}
              description={item.university}
              date={formatDate(item.submittedAt)}
              badges={[item.applicationStatus, item.paymentStatus]}
            />
          ))
        ) : (
          <EmptyState text="No recent applications." />
        )}
      </RecentCard>

      {/* Monthly */}

      <MonthlyActivity
        items={data.monthlyTrend ?? []}
        service="Student"
      />
    </div>
  );
}

/* ====================================================================== */
/* MEDICAL                                                               */
/* ====================================================================== */

function MedicalDashboardView({ data }: { data: MedicalDashboard }) {
  const totalApplications =
    data.documentCount?.totalApplications ?? 0;

  return (
    <div className="space-y-8">
      {/* Overview */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          title="Applications"
          value={totalApplications}
          description="Medical applications"
          icon={<HeartPulse />}
          className="border-rose-100 bg-rose-50/40"
          iconClassName="bg-rose-100 text-rose-600"
        />

        <OverviewCard
          title="Hospitals"
          value={data.documentCount?.totalHospitals ?? 0}
          description="Available hospitals"
          icon={<MapPin />}
          className="border-blue-100 bg-blue-50/40"
          iconClassName="bg-blue-100 text-blue-600"
        />

        <OverviewCard
          title="Approved"
          value={data.documentCount?.totalApproved ?? 0}
          description="Approved applications"
          icon={<CheckCircle2 />}
          className="border-emerald-100 bg-emerald-50/40"
          iconClassName="bg-emerald-100 text-emerald-600"
        />

        <OverviewCard
          title="Pending"
          value={data.documentCount?.totalPending ?? 0}
          description="Awaiting processing"
          icon={<Clock3 />}
          className="border-amber-100 bg-amber-50/40"
          iconClassName="bg-amber-100 text-amber-600"
        />
      </section>

      {/* Overview details */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                <HeartPulse className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Medical services</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Treatment applications and payment activity.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <MiniStat
                label="Applications"
                value={totalApplications}
              />

              <MiniStat
                label="Hospitals"
                value={data.documentCount?.totalHospitals ?? 0}
              />

              <MiniStat
                label="Approved"
                value={data.documentCount?.totalApproved ?? 0}
              />

              <MiniStat
                label="Pending"
                value={data.documentCount?.totalPending ?? 0}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <MiniStat
                label="Pending payment"
                value={data.paymentStats?.pending ?? 0}
              />

              <MiniStat
                label="Paid"
                value={data.paymentStats?.paid ?? 0}
              />

              <MiniStat
                label="Delivered"
                value={data.paymentStats?.delivered ?? 0}
              />

              <MiniStat
                label="Failed"
                value={data.paymentStats?.failed ?? 0}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top hospitals</CardTitle>

            <p className="text-sm text-muted-foreground">
              Hospitals receiving the most applications.
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            {(data.topHospitals ?? []).length > 0 ? (
              data.topHospitals.map((hospital) => (
                <div
                  key={hospital._id}
                  className="flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50/40 px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                      <HeartPulse className="h-4 w-4" />
                    </div>

                    <span className="truncate text-sm font-medium">
                      {hospital._id}
                    </span>
                  </div>

                  <span className="font-bold text-rose-700">
                    {hospital.count}
                  </span>
                </div>
              ))
            ) : (
              <EmptyState text="No hospital data available." />
            )}
          </CardContent>
        </Card>
      </section>

      {/* Recent */}

      <RecentCard
        title="Recent medical applications"
        icon={<HeartPulse />}
        color="rose"
      >
        {(data.recentApplications ?? []).length > 0 ? (
          data.recentApplications.map((item) => (
            <ActivityRow
              key={item._id}
              name={item.patientName}
              description={item.hospital_name}
              date={formatDate(item.createdAt)}
              badges={[item.appointmentStatus, item.paymentStatus]}
            />
          ))
        ) : (
          <EmptyState text="No recent applications." />
        )}
      </RecentCard>

      {/* Monthly */}

      <MonthlyActivity
        items={data.monthlyTrend ?? []}
        service="Medical"
      />
    </div>
  );
}

/* ====================================================================== */
/* TOURIST                                                                */
/* ====================================================================== */

function TouristDashboardView({ data }: { data: TouristDashboard }) {
  return (
    <div className="space-y-8">
      {/* Overview */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          title="Bookings"
          value={data.documentCount?.totalBookings ?? 0}
          description="Total tourism bookings"
          icon={<Plane />}
          className="border-cyan-100 bg-cyan-50/40"
          iconClassName="bg-cyan-100 text-cyan-600"
        />

        <OverviewCard
          title="Packages"
          value={data.documentCount?.totalTourPackages ?? 0}
          description="Available tour packages"
          icon={<Package />}
          className="border-blue-100 bg-blue-50/40"
          iconClassName="bg-blue-100 text-blue-600"
        />

        <OverviewCard
          title="International"
          value={data.documentCount?.totalInternationalBookings ?? 0}
          description="International bookings"
          icon={<Plane />}
          className="border-violet-100 bg-violet-50/40"
          iconClassName="bg-violet-100 text-violet-600"
        />

        <OverviewCard
          title="Domestic"
          value={data.documentCount?.totalDomesticBookings ?? 0}
          description="Domestic bookings"
          icon={<MapPin />}
          className="border-emerald-100 bg-emerald-50/40"
          iconClassName="bg-emerald-100 text-emerald-600"
        />
      </section>

      {/* Tourism overview */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                <Plane className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Tourism overview</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Domestic and international tourism activity.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <MiniStat
                label="Bookings"
                value={data.documentCount?.totalBookings ?? 0}
              />

              <MiniStat
                label="Tour packages"
                value={data.documentCount?.totalTourPackages ?? 0}
              />

              <MiniStat
                label="Custom packages"
                value={data.documentCount?.totalCustomPackage ?? 0}
              />

              <MiniStat
                label="International"
                value={
                  data.documentCount?.totalInternationalBookings ?? 0
                }
              />

              <MiniStat
                label="Domestic"
                value={data.documentCount?.totalDomesticBookings ?? 0}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-medium text-blue-600">
                  International revenue
                </p>

                <p className="mt-1 text-lg font-bold text-blue-800">
                  {formatCurrency(
                    data.internationalVsDomestic
                      ?.internationalRevenue ?? 0,
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-xs font-medium text-emerald-600">
                  Domestic revenue
                </p>

                <p className="mt-1 text-lg font-bold text-emerald-800">
                  {formatCurrency(
                    data.internationalVsDomestic?.domesticRevenue ??
                      0,
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top tour packages</CardTitle>

            <p className="text-sm text-muted-foreground">
              Most frequently booked packages.
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            {(data.topPackages ?? []).length > 0 ? (
              data.topPackages.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-xl border border-cyan-100 bg-cyan-50/40 px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                      <Package className="h-4 w-4" />
                    </div>

                    <span className="truncate text-sm font-medium">
                      {item._id}
                    </span>
                  </div>

                  <span className="font-bold text-cyan-700">
                    {item.count}
                  </span>
                </div>
              ))
            ) : (
              <EmptyState text="No package data available." />
            )}
          </CardContent>
        </Card>
      </section>

      {/* Recent */}

      <RecentCard
        title="Recent tourist bookings"
        icon={<Plane />}
        color="cyan"
      >
        {(data.recentBookings ?? []).length > 0 ? (
          data.recentBookings.map((item) => (
            <ActivityRow
              key={item._id}
              name={item.fullName}
              description={
                item.packageInfo?.packageName ??
                item.packageInfo?.title ??
                "Tour package"
              }
              date={formatDate(item.createdAt)}
              badges={[item.location?.country ?? "Unknown"]}
            />
          ))
        ) : (
          <EmptyState text="No recent bookings." />
        )}
      </RecentCard>

      {/* Monthly */}

      <MonthlyActivity
        items={data.monthlyTrend ?? []}
        service="Tourist"
      />
    </div>
  );
}

/* ====================================================================== */
/* BUSINESS                                                               */
/* ====================================================================== */

function BusinessDashboardView({
  data,
}: {
  data: BusinessDashboard;
}) {
  const totalApplications =
    data.documentCount?.totalBusinessApplications ?? 0;

  const totalDeals = data.documentCount?.totalBusinessDeals ?? 0;

  return (
    <div className="space-y-8">
      {/* Overview */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <OverviewCard
          title="Companies"
          value={data.documentCount?.totalCompanies ?? 0}
          description="Registered companies"
          icon={<BriefcaseBusiness />}
          className="border-violet-100 bg-violet-50/40"
          iconClassName="bg-violet-100 text-violet-600"
        />

        <OverviewCard
          title="Applications"
          value={totalApplications}
          description="Business applications"
          icon={<BriefcaseBusiness />}
          className="border-blue-100 bg-blue-50/40"
          iconClassName="bg-blue-100 text-blue-600"
        />

        <OverviewCard
          title="Deals"
          value={totalDeals}
          description="Business deals"
          icon={<TrendingUp />}
          className="border-emerald-100 bg-emerald-50/40"
          iconClassName="bg-emerald-100 text-emerald-600"
        />

        <OverviewCard
          title="Packages"
          value={data.documentCount?.totalBusinessPackages ?? 0}
          description="Business packages"
          icon={<Package />}
          className="border-amber-100 bg-amber-50/40"
          iconClassName="bg-amber-100 text-amber-600"
        />

        <OverviewCard
          title="Activity"
          value={data.summary?.totalBusinessActivity ?? 0}
          description="Total business activity"
          icon={<TrendingUp />}
          className="border-cyan-100 bg-cyan-50/40"
          iconClassName="bg-cyan-100 text-cyan-600"
        />
      </section>

      {/* Application + Deal status */}

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Business applications</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Current application status.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <StatusRow
              label="Pending"
              value={data.documentCount?.applications?.pending ?? 0}
              total={totalApplications}
              color="bg-amber-500"
            />

            <StatusRow
              label="Approved"
              value={data.documentCount?.applications?.approved ?? 0}
              total={totalApplications}
              color="bg-emerald-500"
            />

            <StatusRow
              label="Rejected"
              value={data.documentCount?.applications?.rejected ?? 0}
              total={totalApplications}
              color="bg-red-500"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business deals</CardTitle>

            <p className="text-sm text-muted-foreground">
              Current deal status.
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            <StatusRow
              label="Pending"
              value={data.documentCount?.deals?.pending ?? 0}
              total={totalDeals}
              color="bg-amber-500"
            />

            <StatusRow
              label="Approved"
              value={data.documentCount?.deals?.approved ?? 0}
              total={totalDeals}
              color="bg-emerald-500"
            />
          </CardContent>
        </Card>
      </section>

      {/* Top countries */}

      <Card>
        <CardHeader>
          <CardTitle>Top business countries</CardTitle>

          <p className="text-sm text-muted-foreground">
            Countries generating the most business applications.
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          {(data.topCountries ?? []).length > 0 ? (
            data.topCountries.map((country) => (
              <div
                key={country._id}
                className="flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50/40 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <span className="text-sm font-medium">
                    {country._id}
                  </span>
                </div>

                <span className="font-bold text-violet-700">
                  {country.count}
                </span>
              </div>
            ))
          ) : (
            <EmptyState text="No country data available." />
          )}
        </CardContent>
      </Card>

      {/* Recent applications + deals */}

      <section className="grid gap-6 lg:grid-cols-2">
        <RecentCard
          title="Recent business applications"
          icon={<BriefcaseBusiness />}
          color="violet"
        >
          {(data.recentApplications ?? []).length > 0 ? (
            data.recentApplications.map((item) => (
              <ActivityRow
                key={item._id}
                name={`${item.firstName} ${item.lastName}`}
                description={item.companyName}
                date={formatDate(item.createdAt)}
                badges={[item.applicationStatus, item.paymentStatus]}
              />
            ))
          ) : (
            <EmptyState text="No recent applications." />
          )}
        </RecentCard>

        <RecentCard
          title="Recent business deals"
          icon={<TrendingUp />}
          color="violet"
        >
          {(data.recentDeals ?? []).length > 0 ? (
            data.recentDeals.map((item) => (
              <ActivityRow
                key={item._id}
                name={item.f_name}
                description={item.serviceTitle}
                date={formatDate(item.createdAt)}
                badges={[item.applicationStatus]}
              />
            ))
          ) : (
            <EmptyState text="No recent deals." />
          )}
        </RecentCard>
      </section>

      {/* Monthly */}

      <div className="grid gap-6 lg:grid-cols-2">
        <MonthlyActivity
          items={data.monthlyTrendApplications ?? []}
          service="Applications"
        />

        <MonthlyActivity
          items={data.monthlyTrendDeals ?? []}
          service="Deals"
        />
      </div>
    </div>
  );
}

/* ====================================================================== */
/* SHARED COMPONENTS                                                      */
/* ====================================================================== */

function OverviewCard({
  title,
  value,
  description,
  icon,
  className,
  iconClassName,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <Card className={className}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <p className="mt-4 text-3xl font-bold tracking-tight">
              {value.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              iconClassName ?? "bg-muted text-foreground"
            }`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MonthlyActivity({
  items,
  service,
}: {
  items: TrendItem[];
  service: string;
}) {
  const maxActivity = Math.max(...items.map((item) => item.count), 1);

  const sortedItems = [...items].sort(
    (a, b) =>
      new Date(a._id.year, a._id.month - 1).getTime() -
      new Date(b._id.year, b._id.month - 1).getTime(),
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <TrendingUp className="h-5 w-5" />
          </div>

          <div>
            <CardTitle>Monthly activity</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Recent {service.toLowerCase()} volume.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {sortedItems.length === 0 ? (
          <EmptyState text="No monthly activity available." />
        ) : (
          <div className="space-y-5">
            {sortedItems.map((item, index) => {
              const width = (item.count / maxActivity) * 100;

              return (
                <div
                  key={`${service}-${item._id.year}-${item._id.month}-${index}`}
                >
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {formatMonth(item)}
                      </span>

                      <Badge
                        variant="outline"
                        className="text-[10px]"
                      >
                        {service}
                      </Badge>
                    </div>

                    <span className="text-sm font-bold text-indigo-700">
                      {item.count}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-indigo-50">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
                      style={{
                        width: `${Math.min(width, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
