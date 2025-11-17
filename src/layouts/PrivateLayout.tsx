import { Outlet } from "react-router-dom";

export function PrivateLayout() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-black p-6">
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
    </main>
  );
}
