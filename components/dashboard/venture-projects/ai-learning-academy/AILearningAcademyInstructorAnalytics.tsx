"use client";

import { BookOpen, Users } from "lucide-react";

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
    <Card>
      <CardHeader>
        <CardTitle>Top instructors</CardTitle>

        <p className="text-sm text-muted-foreground">
          Instructors ranked by their course and consultancy activity.
        </p>
      </CardHeader>

      <CardContent>
        {topInstructors.length === 0 ? (
          <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed text-sm text-muted-foreground">
            No instructor analytics available.
          </div>
        ) : (
          <div className="space-y-3">
            {topInstructors.map((instructor, index) => (
              <div
                key={instructor.instructorId}
                className="flex items-center justify-between gap-4 rounded-2xl border p-4 transition-colors hover:bg-muted/20"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700">
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {instructor.instructorName}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
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
