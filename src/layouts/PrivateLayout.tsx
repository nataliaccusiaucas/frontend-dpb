import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { useState } from "react"

export function PrivateLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8FEFF] flex">

      <Sidebar onToggle={setCollapsed} />

      <div
        className={`
          flex-1 transition-all duration-300 min-h-screen
          ${collapsed ? "ml-20" : "ml-64"}
        `}
      >
        <main
          className="
            pt-10 px-8 pb-16
            max-w-[1500px]
            mx-auto
            min-h-screen
          "
        >
          <Outlet />
        </main>
      </div>

    </div>
  )
}