import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { courses } from "@/lib/mock-data";

type RegisterDialogProps = {
  student: Student;
  enrolledCourseIds: string[];
  onEnroll: (courseId: string, enrolledAt: string) => void;
};

function getCurrentTimeValue() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function RegisterDialog({
  student,
  enrolledCourseIds,
  onEnroll,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [currentTime, setCurrentTime] = useState(getCurrentTimeValue());

  const availableCourses = courses.filter(
    (course) => !enrolledCourseIds.includes(course.courseId),
  );

  useEffect(() => {
    if (open) {
      setCurrentTime(getCurrentTimeValue());
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedCourseId = courseId.trim();
    if (!trimmedCourseId || enrolledCourseIds.includes(trimmedCourseId)) {
      setOpen(false);
      setCourseId("");
      return;
    }

    onEnroll(trimmedCourseId, new Date().toISOString());
    setCourseId("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          type="button"
          className="ml-auto inline-flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนเรียน</DialogTitle>
            <DialogDescription>
              เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="courseId">วิชา</Label>
            <select
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">เลือกวิชา</option>
              {availableCourses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseId} - {course.courseTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เวลา</Label>
            <Input id="time" type="time" defaultValue={currentTime} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentName">ชื่อ นศ.</Label>
            <Input
              id="studentName"
              value={`${student.firstName} ${student.lastName}`}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input id="program" value={student.program} readOnly />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId.trim()}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
