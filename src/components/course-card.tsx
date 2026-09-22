import { Trash2 } from "lucide-react";
import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type CourseCardProps = {
  course: Course;
  student: Student;
  isEnrolled?: boolean;
  enrolledAt?: string;
  onRemoveEnrollment?: () => void;
};

export function CourseCard({
  course,
  student,
  isEnrolled = false,
  enrolledAt,
  onRemoveEnrollment,
}: CourseCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Bangkok",
    };

    return new Intl.DateTimeFormat("th-TH", options).format(date);
  };

  return (
    <Card className="relative overflow-hidden transition-shadow hover:shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-sm font-semibold leading-snug sm:text-base">
              {course.courseTitle}
            </CardTitle>
            <CardDescription className="mt-1 text-[11px] leading-relaxed sm:text-xs">
              รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
              {course.instructors.join(", ")}
            </CardDescription>
          </div>

          <CardAction className="pt-0.5">
            {isEnrolled ? (
              <Badge variant="amber-light" className="px-2 py-0.5 text-[10px]">
                ลงทะเบียนแล้ว
              </Badge>
            ) : (
              <Badge variant="purple-light" className="px-2 py-0.5 text-[10px]">
                เปิดรับ
              </Badge>
            )}
          </CardAction>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {isEnrolled ? (
          <div className="flex items-end justify-between gap-2">
            <div className="space-y-0.5 text-[11px] text-muted-foreground sm:text-xs">
              <p>
                ชื่อ นศ.: {student.firstName} {student.lastName}
              </p>
              <p>โปรแกรม: {student.program}</p>
              {enrolledAt && <p>ลงทะเบียนเมื่อ: {formatDate(enrolledAt)}</p>}
            </div>

            {onRemoveEnrollment && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onRemoveEnrollment}
                aria-label="Delete enrollment"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        ) : (
          <div className="text-[11px] text-muted-foreground sm:text-xs">
            ยังไม่ได้ลงทะเบียนรายวิชานี้
          </div>
        )}
      </CardContent>
    </Card>
  );
}
