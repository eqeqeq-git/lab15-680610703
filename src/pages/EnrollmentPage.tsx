import { useState } from "react";
import type { Enrollment } from "@/lib/types";
import {
  courses,
  enrollments as initialEnrollments,
  currentStudent,
  CURRENT_STUDENT_ID,
} from "@/lib/mock-data";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";

export default function EnrollmentPage() {
  // ✅ แก้ไข 1: เปลี่ยนชื่อ function จาก Enrollent → EnrollmentPage

  // ✅ แก้ไข 2: เพิ่ม state สำหรับ enrollments
  const [enrollments, setEnrollments] =
    useState<Enrollment[]>(initialEnrollments);

  const student = currentStudent;

  // ✅ แก้ไข 3: คำนวณ enrolled course IDs
  const enrolledCourseIds = enrollments
    .filter((e) => e.studentId === CURRENT_STUDENT_ID)
    .map((e) => e.courseId);

  // ✅ แก้ไข 4: สร้าง handler สำหรับเพิ่ม enrollment
  const handleAddEnrollment = (courseId: string, enrolledAt: string) => {
    const newEnrollment: Enrollment = {
      studentId: CURRENT_STUDENT_ID,
      courseId,
      enrolledAt,
    };
    setEnrollments([...enrollments, newEnrollment]);
  };

  // ✅ แก้ไข 5: สร้าง handler สำหรับลบ enrollment
  const handleRemoveEnrollment = (courseId: string) => {
    setEnrollments(
      enrollments.filter(
        (e) => !(e.studentId === CURRENT_STUDENT_ID && e.courseId === courseId),
      ),
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="border-b bg-card/50 px-3 py-3 sm:px-4 sm:py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="mr-auto text-right">
            <h1 className="text-lg font-bold text-card-foreground sm:text-xl">
              รายวิชาทั้งหมด
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              {student?.firstName} {student?.lastName} ({CURRENT_STUDENT_ID})
            </p>
          </div>

          <RegisterDialog
            student={student!}
            enrolledCourseIds={enrolledCourseIds}
            onEnroll={handleAddEnrollment}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="mx-auto max-w-[calc(100%-0.5rem)] space-y-3 pr-1">
          {courses.map((course) => {
            const isEnrolled = enrolledCourseIds.includes(course.courseId);
            const enrollmentRecord = enrollments.find(
              (e) =>
                e.studentId === CURRENT_STUDENT_ID &&
                e.courseId === course.courseId,
            );

            return (
              <div key={course.courseId} className="relative pr-0">
                <CourseCard
                  course={course}
                  student={student!}
                  isEnrolled={isEnrolled}
                  enrolledAt={enrollmentRecord?.enrolledAt}
                  onRemoveEnrollment={() =>
                    handleRemoveEnrollment(course.courseId)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
