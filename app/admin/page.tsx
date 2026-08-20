import { AdminAuthGate } from "@/components/AdminAuthGate";
import { AdminStudio } from "@/components/AdminStudio";

export const metadata = { title: "Portfolio Studio — Onyedika" };

export default function AdminPage() {
  return (
    <AdminAuthGate>
      <AdminStudio />
    </AdminAuthGate>
  );
}
