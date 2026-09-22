import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="flex min-h-full items-center justify-center bg-background p-6">
      <div className="w-full max-w-xl rounded-xl border bg-card p-8 text-center shadow-sm">
        <h1 className="mt-3 text-3xl font-bold text-foreground">
          ระบบลงทะเบียนเรียน CPE & ISNE
        </h1>

        <Link
          to="/enrollment"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          ไปหน้าลงทะเบียนเรียน
        </Link>
      </div>
    </div>
  );
}
