import { Outlet } from "react-router-dom";

export function HomeLayout() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Outlet />
    </main>
  );
}
