import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../modules/auth/AuthContext"
import { useNotifications } from "../modules/notification/useNotifications"
import { useState } from "react"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  User,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

export function Sidebar() {
  const { user, logout } = useAuth()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full
        ${collapsed ? "w-20" : "w-64"}
        bg-linear-to-b from-[#070707]/80 to-[#070707]/60
        backdrop-blur-xl
        border-r border-[#00E8FF]/10
        shadow-[0_0_20px_#00E8FF20]
        z-50 flex flex-col
        transition-all duration-300 ease-in-out
      `}
    >

      {/* LOGO */}
      <div className="h-20 flex items-center justify-center px-4">
        {collapsed ? (
          <span className="font-title text-3xl text-[#00E8FF] drop-shadow-[0_0_8px_#00E8FF]">
            H
          </span>
        ) : (
          <span className="font-title text-3xl text-[#00E8FF] drop-shadow-[0_0_8px_#00E8FF]">
            HireHub
          </span>
        )}
      </div>

      {/* TOGGLER BUTTON */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute -right-4 top-24 w-8 h-8 rounded-full
          bg-[#070707]/80 border border-[#00E8FF]/30
          text-[#00E8FF] flex items-center justify-center
          shadow-[0_0_10px_#00E8FF50]
          cursor-pointer backdrop-blur-xl
          hover:scale-105 transition
        "
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>

      {/* NAV ITEMS */}
      <nav className="flex flex-col gap-2 px-4 mt-4">

        <SidebarItem
          to="/dashboard"
          icon={<LayoutDashboard />}
          label="Dashboard"
          collapsed={collapsed}
        />

        <SidebarItem
          to="/jobrequests"
          icon={<FileText />}
          label="Requests"
          collapsed={collapsed}
        />

        <SidebarItem
          to="/offers"
          icon={<Briefcase />}
          label="Offers"
          collapsed={collapsed}
        />

        <SidebarItem
          to={`/freelancers/${user.id}/profile`}
          icon={<User />}
          label="Profile"
          collapsed={collapsed}
        />
      </nav>

      {/* --- PARTE DE ABAJO: NOTIFICATIONS + LOGOUT --- */}
      <div className="mt-auto px-4 mb-6 flex flex-col gap-3">

        {/* NOTIFICATIONS */}
        <div
          className="
            relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
            text-gray-300 hover:text-[#00E8FF] hover:bg-white/5
            transition-all duration-200 group
          "
        >
          <Bell className="w-6 h-6 group-hover:text-[#00E8FF]" />

          {!collapsed && (
            <span className="text-sm font-body">Notificaciones</span>
          )}

          {unreadCount > 0 && (
            <span className="
              absolute right-2 top-2 bg-[#00E8FF] text-black text-xs 
              w-5 h-5 flex items-center justify-center rounded-full font-bold
            ">
              {unreadCount}
            </span>
          )}
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            logout()
            navigate("/login")
          }}
          className="
            flex items-center gap-3 px-3 py-2 rounded-lg
            text-gray-300 hover:text-red-400 hover:bg-white/5
            transition-all duration-200
          "
        >
          <LogOut className="w-6 h-6" />
          {!collapsed && (
            <span className="text-sm font-body">Cerrar sesión</span>
          )}
        </button>
      </div>

    </aside>
  )
}

function SidebarItem({
  to,
  icon,
  label,
  collapsed,
}: {
  to: string
  icon: React.ReactNode
  label: string
  collapsed: boolean
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-3 py-2 rounded-lg
        transition-all duration-200 group cursor-pointer
        ${isActive
          ? "text-[#00E8FF] bg-white/10 shadow-[0_0_12px_#00E8FF60]"
          : "text-gray-300 hover:bg-white/5 hover:text-[#00E8FF]"
        }
        `
      }
    >
      <span className="w-6 h-6 flex items-center group-hover:text-[#00E8FF]">
        {icon}
      </span>

      {!collapsed && (
        <span className="whitespace-nowrap font-body text-sm">
          {label}
        </span>
      )}
    </NavLink>
  )
}
