import { Outlet } from "react-router-dom"
import { AppNavbar } from "../components/AppNavbar"

export function HomeLayout() {
  return (
    <div className="min-h-screen bg-[#070707]">
      <AppNavbar />
      <div className="pt-24">
        <Outlet />
      </div>
    </div>
  )
}
