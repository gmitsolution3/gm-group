"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  HeartPulse,
  MapPin,
  Package,
  Plane,
  TrendingUp,
} from "lucide-react";

import { useFetch } from "@/hooks/api/useFetch";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { GeneralDashboardResponse, TrendItem } from "@/types";
import { formatCurrency, formatDate, formatNumber } from "@/utils";
import GeneralServicesDashboardError from "./GeneralServicesDashboardError";
import GeneralServicesDashboardLoader from "./GeneralServicesDashboardLoader";

import { API_ENDPOINTS } from "@/config/api/api";
import OverviewCard from "./OverviewCard";
import ServiceCard from "./ServiceCard";
import StatusRow from "./StatusRow";
import MiniStat from "./MiniStat";
import EmptyState from "./EmptyState";
import RecentCard from "./RecentCard";
import ActivityRow from "./ActivityRow";

function formatMonth(item: TrendItem) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(item._id.year, item._id.month - 1));
}

export function GeneralServicesDashboard({
  student = true,
  tourist = true,
  medical = true,
  business = true,
}: {
  student?: boolean;
  tourist?: boolean;
  medical?: boolean;
  business?: boolean;
}) {
  const API_URL =
    `${API_ENDPOINTS.gmInternational.generalServicesDashboard}?student=${student}` +
    `&tourist=${tourist}` +
    `&medical=${medical}` +
    `&business=${business}`;

  const { data, isLoading, isError, refetch } =
    useFetch<GeneralDashboardResponse>(API_URL);

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

  const studentData = data.data.student?.data ?? null;

  const medicalData = data.data.medical?.data ?? null;

  const touristData = data.data.tourist?.data ?? null;

  const businessData = data.data.business?.data ?? null;

  /*
   * Aggregate statistics.
   *
   * Optional chaining is intentionally used here because
   * any individual service can be disabled or return null.
   */

  const totalApplications =
    (studentData?.documentCount?.totalApplications ?? 0) +
    (medicalData?.documentCount?.totalApplications ?? 0) +
    (businessData?.documentCount?.totalBusinessApplications ?? 0);

  const totalBookings =
    touristData?.documentCount?.totalBookings ?? 0;

  const totalApproved =
    (studentData?.documentCount?.totalApproved ?? 0) +
    (medicalData?.documentCount?.totalApproved ?? 0) +
    (touristData?.documentCount?.totalApproved ?? 0) +
    (businessData?.documentCount?.applications?.approved ?? 0);

  const totalPending =
    (studentData?.documentCount?.totalPending ?? 0) +
    (medicalData?.documentCount?.totalPending ?? 0) +
    (touristData?.documentCount?.totalPending ?? 0) +
    (businessData?.documentCount?.applications?.pending ?? 0);

  /*
   * Monthly activity is normalized once so the rendering
   * section stays simple and safe.
   */

  const monthlyActivity = [
    ...(studentData?.monthlyTrend ?? []).map((item) => ({
      ...item,
      service: "Student",
    })),

    ...(medicalData?.monthlyTrend ?? []).map((item) => ({
      ...item,
      service: "Medical",
    })),

    ...(touristData?.monthlyTrend ?? []).map((item) => ({
      ...item,
      service: "Tourist",
    })),

    ...(businessData?.monthlyTrendApplications ?? []).map((item) => ({
      ...item,
      service: "Business",
    })),
  ];

  const maxMonthlyActivity = Math.max(
    ...monthlyActivity.map((item) => item.count),
    1,
  );

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
            Overview of student, medical, tourist, and business
            services.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <OverviewCard
            title="Applications"
            value={formatNumber(totalApplications)}
            description="Student, medical & business"
            icon={<FileText />}
            className="border-blue-100 bg-gradient-to-br from-blue-50 to-background"
            iconClassName="bg-blue-100 text-blue-600"
            valueClassName="text-blue-950"
          />

          <OverviewCard
            title="Tourist bookings"
            value={formatNumber(totalBookings)}
            description="Total tourism bookings"
            icon={<Plane />}
            className="border-cyan-100 bg-gradient-to-br from-cyan-50 to-background"
            iconClassName="bg-cyan-100 text-cyan-600"
            valueClassName="text-cyan-950"
          />

          <OverviewCard
            title="Approved"
            value={formatNumber(totalApproved)}
            description="Approved applications"
            icon={<CheckCircle2 />}
            className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-background"
            iconClassName="bg-emerald-100 text-emerald-600"
            valueClassName="text-emerald-950"
          />

          <OverviewCard
            title="Pending"
            value={formatNumber(totalPending)}
            description="Awaiting processing"
            icon={<Clock3 />}
            className="border-amber-100 bg-gradient-to-br from-amber-50 to-background"
            iconClassName="bg-amber-100 text-amber-600"
            valueClassName="text-amber-950"
          />
        </section>

        <section>
          <div className="mb-4">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Service overview
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Current activity across each GM International service.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {studentData && (
              <ServiceCard
                title="Student"
                description="Education & university applications"
                icon={<GraduationCap />}
                value={
                  studentData.documentCount?.totalApplications ?? 0
                }
                approved={
                  studentData.documentCount?.totalApproved ?? 0
                }
                pending={studentData.documentCount?.totalPending ?? 0}
                rejected={
                  studentData.documentCount?.totalRejected ?? 0
                }
                className="border-blue-100 bg-blue-50/40"
                iconClassName="bg-blue-100 text-blue-600"
                accentClassName="text-blue-700"
              />
            )}

            {medicalData && (
              <ServiceCard
                title="Medical"
                description="Medical treatment applications"
                icon={<HeartPulse />}
                value={
                  medicalData.documentCount?.totalApplications ?? 0
                }
                approved={
                  medicalData.documentCount?.totalApproved ?? 0
                }
                pending={medicalData.documentCount?.totalPending ?? 0}
                rejected={
                  medicalData.documentCount?.totalRejected ?? 0
                }
                className="border-rose-100 bg-rose-50/40"
                iconClassName="bg-rose-100 text-rose-600"
                accentClassName="text-rose-700"
              />
            )}

            {touristData && (
              <ServiceCard
                title="Tourist"
                description="Domestic & international tours"
                icon={<Plane />}
                value={touristData.documentCount?.totalBookings ?? 0}
                approved={
                  touristData.documentCount?.totalApproved ?? 0
                }
                pending={touristData.documentCount?.totalPending ?? 0}
                rejected={0}
                className="border-cyan-100 bg-cyan-50/40"
                iconClassName="bg-cyan-100 text-cyan-600"
                accentClassName="text-cyan-700"
              />
            )}

            {businessData && (
              <ServiceCard
                title="Business"
                description="Business applications & deals"
                icon={<BriefcaseBusiness />}
                value={
                  businessData.documentCount
                    ?.totalBusinessApplications ?? 0
                }
                approved={
                  businessData.documentCount?.applications
                    ?.approved ?? 0
                }
                pending={
                  businessData.documentCount?.applications?.pending ??
                  0
                }
                rejected={
                  businessData.documentCount?.applications
                    ?.rejected ?? 0
                }
                className="border-violet-100 bg-violet-50/40"
                iconClassName="bg-violet-100 text-violet-600"
                accentClassName="text-violet-700"
              />
            )}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Student                                                          */}
        {/* ---------------------------------------------------------------- */}

        {studentData && (
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
                  value={
                    studentData.documentCount?.totalApproved ?? 0
                  }
                  total={
                    studentData.documentCount?.totalApplications ?? 0
                  }
                  color="bg-emerald-500"
                />

                <StatusRow
                  label="Pending"
                  value={studentData.documentCount?.totalPending ?? 0}
                  total={
                    studentData.documentCount?.totalApplications ?? 0
                  }
                  color="bg-amber-500"
                />

                <StatusRow
                  label="Rejected"
                  value={
                    studentData.documentCount?.totalRejected ?? 0
                  }
                  total={
                    studentData.documentCount?.totalApplications ?? 0
                  }
                  color="bg-red-500"
                />

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <MiniStat
                    label="Pending payment"
                    value={studentData.paymentStats?.pending ?? 0}
                  />

                  <MiniStat
                    label="Paid"
                    value={studentData.paymentStats?.paid ?? 0}
                  />

                  <MiniStat
                    label="Failed"
                    value={studentData.paymentStats?.failed ?? 0}
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
                {(studentData.topUniversities ?? []).length > 0 ? (
                  studentData.topUniversities.map((item) => (
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
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Medical                                                          */}
        {/* ---------------------------------------------------------------- */}

        {medicalData && (
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
                      Treatment applications and hospitals.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <MiniStat
                    label="Applications"
                    value={
                      medicalData.documentCount?.totalApplications ??
                      0
                    }
                  />

                  <MiniStat
                    label="Hospitals"
                    value={
                      medicalData.documentCount?.totalHospitals ?? 0
                    }
                  />

                  <MiniStat
                    label="Approved"
                    value={
                      medicalData.documentCount?.totalApproved ?? 0
                    }
                  />

                  <MiniStat
                    label="Pending"
                    value={
                      medicalData.documentCount?.totalPending ?? 0
                    }
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
                {(medicalData.topHospitals ?? []).length > 0 ? (
                  medicalData.topHospitals.map((hospital) => (
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
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Tourist                                                          */}
        {/* ---------------------------------------------------------------- */}

        {touristData && (
          <section className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                    <Plane className="h-5 w-5" />
                  </div>

                  <div>
                    <CardTitle>Tourist services</CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Tourism bookings and destinations.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <MiniStat
                    label="Bookings"
                    value={
                      touristData.documentCount?.totalBookings ?? 0
                    }
                  />

                  <MiniStat
                    label="Packages"
                    value={
                      touristData.documentCount?.totalTourPackages ??
                      0
                    }
                  />

                  <MiniStat
                    label="International"
                    value={
                      touristData.documentCount
                        ?.totalInternationalBookings ?? 0
                    }
                  />

                  <MiniStat
                    label="Domestic"
                    value={
                      touristData.documentCount
                        ?.totalDomesticBookings ?? 0
                    }
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-medium text-blue-600">
                      International revenue
                    </p>

                    <p className="mt-1 text-lg font-bold text-blue-800">
                      {formatCurrency(
                        touristData.internationalVsDomestic
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
                        touristData.internationalVsDomestic
                          ?.domesticRevenue ?? 0,
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
                {(touristData.topPackages ?? []).length > 0 ? (
                  touristData.topPackages.map((item) => (
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
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Business                                                         */}
        {/* ---------------------------------------------------------------- */}

        {businessData && (
          <section className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>

                  <div>
                    <CardTitle>Business services</CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Business applications, deals, and companies.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                  <MiniStat
                    label="Companies"
                    value={
                      businessData.documentCount?.totalCompanies ?? 0
                    }
                  />

                  <MiniStat
                    label="Applications"
                    value={
                      businessData.documentCount
                        ?.totalBusinessApplications ?? 0
                    }
                  />

                  <MiniStat
                    label="Deals"
                    value={
                      businessData.documentCount
                        ?.totalBusinessDeals ?? 0
                    }
                  />

                  <MiniStat
                    label="Packages"
                    value={
                      businessData.documentCount
                        ?.totalBusinessPackages ?? 0
                    }
                  />

                  <MiniStat
                    label="Activity"
                    value={
                      businessData.summary?.totalBusinessActivity ?? 0
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Business applications</CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                  <StatusRow
                    label="Pending"
                    value={
                      businessData.documentCount?.applications
                        ?.pending ?? 0
                    }
                    total={
                      businessData.documentCount
                        ?.totalBusinessApplications ?? 0
                    }
                    color="bg-amber-500"
                  />

                  <StatusRow
                    label="Approved"
                    value={
                      businessData.documentCount?.applications
                        ?.approved ?? 0
                    }
                    total={
                      businessData.documentCount
                        ?.totalBusinessApplications ?? 0
                    }
                    color="bg-emerald-500"
                  />

                  <StatusRow
                    label="Rejected"
                    value={
                      businessData.documentCount?.applications
                        ?.rejected ?? 0
                    }
                    total={
                      businessData.documentCount
                        ?.totalBusinessApplications ?? 0
                    }
                    color="bg-red-500"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business deals</CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                  <StatusRow
                    label="Pending"
                    value={
                      businessData.documentCount?.deals?.pending ?? 0
                    }
                    total={
                      businessData.documentCount
                        ?.totalBusinessDeals ?? 0
                    }
                    color="bg-amber-500"
                  />

                  <StatusRow
                    label="Approved"
                    value={
                      businessData.documentCount?.deals?.approved ?? 0
                    }
                    total={
                      businessData.documentCount
                        ?.totalBusinessDeals ?? 0
                    }
                    color="bg-emerald-500"
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top business countries</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {(businessData.topCountries ?? []).length > 0 ? (
                  businessData.topCountries.map((country) => (
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
          </section>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Recent activity                                                  */}
        {/* ---------------------------------------------------------------- */}

        <section>
          <div className="mb-4">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Recent activity
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Latest activity across the available services.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {studentData && (
              <RecentCard
                title="Recent student applications"
                icon={<GraduationCap />}
                color="blue"
              >
                {(studentData.recentApplications ?? []).map(
                  (item) => (
                    <ActivityRow
                      key={item._id}
                      name={`${item.firstName} ${item.lastName}`}
                      description={item.university}
                      date={formatDate(item.submittedAt)}
                      badges={[
                        item.applicationStatus,
                        item.paymentStatus,
                      ]}
                    />
                  ),
                )}
              </RecentCard>
            )}

            {touristData && (
              <RecentCard
                title="Recent tourist bookings"
                icon={<Plane />}
                color="cyan"
              >
                {(touristData.recentBookings ?? []).map((item) => (
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
                ))}
              </RecentCard>
            )}

            {medicalData && (
              <RecentCard
                title="Recent medical applications"
                icon={<HeartPulse />}
                color="rose"
              >
                {(medicalData.recentApplications ?? []).map(
                  (item) => (
                    <ActivityRow
                      key={item._id}
                      name={item.patientName}
                      description={item.hospital_name}
                      date={formatDate(item.createdAt)}
                      badges={[
                        item.appointmentStatus,
                        item.paymentStatus,
                      ]}
                    />
                  ),
                )}
              </RecentCard>
            )}

            {businessData && (
              <RecentCard
                title="Recent business applications"
                icon={<BriefcaseBusiness />}
                color="violet"
              >
                {(businessData.recentApplications ?? []).map(
                  (item) => (
                    <ActivityRow
                      key={item._id}
                      name={`${item.firstName} ${item.lastName}`}
                      description={item.companyName}
                      date={formatDate(item.createdAt)}
                      badges={[
                        item.applicationStatus,
                        item.paymentStatus,
                      ]}
                    />
                  ),
                )}
              </RecentCard>
            )}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Monthly activity                                                 */}
        {/* ---------------------------------------------------------------- */}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <TrendingUp className="h-5 w-5" />
              </div>

              <div>
                <CardTitle>Monthly activity</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Recent application and booking volume.
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {monthlyActivity.length === 0 ? (
              <EmptyState text="No monthly activity available." />
            ) : (
              <div className="space-y-5">
                {monthlyActivity
                  .sort(
                    (a, b) =>
                      new Date(
                        a._id.year,
                        a._id.month - 1,
                      ).getTime() -
                      new Date(b._id.year, b._id.month - 1).getTime(),
                  )
                  .map((item, index) => {
                    const width =
                      (item.count / maxMonthlyActivity) * 100;

                    return (
                      <div
                        key={`${item.service}-${item._id.year}-${item._id.month}-${index}`}
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
                              {item.service}
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
      </div>
    </div>
  );
}
