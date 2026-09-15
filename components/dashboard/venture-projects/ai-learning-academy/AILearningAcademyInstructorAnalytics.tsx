"use client";

import { BookOpen, Users, GraduationCap } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AILearningDashboardData } from "@/types";

interface AILearningAcademyInstructorAnalyticsProps {
  instructors: AILearningDashboardData["instructors"];
}

export default function AILearningAcademyInstructorAnalytics({
  instructors,
}: AILearningAcademyInstructorAnalyticsProps) {
  const { topInstructors } = instructors;

  return (
    <div className="space-y-6">
      {/* Section heading */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Instructor Analytics
          </h2>
          <p className="text-xs text-muted-foreground">
            Instructors ranked by course and consultancy activity
          </p>
        </div>
      </div>

      <Card className="rounded-2xl border border-border/70 bg-card shadow-xs">
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="text-base font-bold">Top instructors</CardTitle>
        </CardHeader>

        <CardContent className="p-5">
          {topInstructors.length === 0 ? (
            <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
              No instructor analytics available.
            </div>
          ) : (
            <div className="space-y-3">
              {topInstructors.map((instructor, index) => (
                <div
                  key={instructor.instructorId}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border/60 p-4 transition-all hover:bg-muted/30"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-sm">
                        {instructor.instructorName}
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Instructor activity
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                    <MetricBadge
                      icon={BookOpen}
                      value={instructor.courseCount}
                      label="courses"
                    />

                    <MetricBadge
                      icon={Users}
                      value={instructor.consultancyCount}
                      label="consultancies"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function MetricBadge({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-muted/60 px-2.5 py-1.5 text-xs">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />

      <span className="font-semibold">{value}</span>

      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
