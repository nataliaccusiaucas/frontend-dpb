import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"

export function PrivateLayout() {
  return (
    <div className="min-h-screen bg-[#F8FEFF] flex">
      
      <Sidebar />

      <div className="flex-1 ml-60">
        <div className="pt-[90px] px-6 pb-10">
          <Outlet />
        </div>
      </div>

    </div>
  )
}
