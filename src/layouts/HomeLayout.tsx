import { Outlet } from "react-router-dom"
import { AppNavbar } from "../components/AppNavbar"

export function HomeLayout() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#E4FCFF] via-white to-[#E4FCFF]">
      <AppNavbar />
      <div className="pt-px">
        <Outlet />
      </div>
    </div>
  )
}
