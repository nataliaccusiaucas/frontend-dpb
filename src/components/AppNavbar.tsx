import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../modules/auth/AuthContext";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react"
import { useNotifications } from "../modules/notification/useNotifications"


export function AppNavbar() {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markOne } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          isAuthPage
            ? "bg-[#070707]/70 backdrop-blur-xl border-b border-[#00E8FF]/10 shadow-[0_0_12px_#00E8FF20]"
            : scrolled
            ? "bg-[#070707]/70 backdrop-blur-xl border-b border-[#00E8FF]/20 shadow-[0_0_12px_#00E8FF20]"
            : "bg-transparent backdrop-blur-0 border-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link
          to="/"
          className="font-title text-2xl tracking-wide text-[#00E8FF] drop-shadow-[0_0_6px_#00E8FF] hover:text-white transition"
        >
          HireHub
        </Link>

        {user && (
          <nav className="flex items-center gap-6 font-body text-sm">

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-[#00E8FF] drop-shadow-[0_0_6px_#00E8FF]"
                  : "text-gray-300 hover:text-[#00E8FF] transition"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/offers"
              className={({ isActive }) =>
                isActive
                  ? "text-[#00E8FF] drop-shadow-[0_0_6px_#00E8FF]"
                  : "text-gray-300 hover:text-[#00E8FF] transition"
              }
            >
              Offers
            </NavLink>

            <NavLink
              to="/jobrequests"
              className={({ isActive }) =>
                isActive
                  ? "text-[#00E8FF] drop-shadow-[0_0_6px_#00E8FF]"
                  : "text-gray-300 hover:text-[#00E8FF] transition"
              }
            >
              Requests
            </NavLink>

            {user.role === "ADMIN" && (
              <div className="relative group">
                <div className="flex items-center gap-1 cursor-pointer text-gray-300 hover:text-[#00E8FF] transition">
                  <span>Admin</span>
                  <svg
                    className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                <div
                  className="
                    invisible opacity-0 group-hover:visible group-hover:opacity-100
                    transition-all duration-200 absolute left-0 mt-2 
                    w-48 bg-[#070707]/90 backdrop-blur-xl 
                    rounded-lg border border-[#00E8FF]/20 shadow-xl
                  "
                >
                  <NavLink
                    to="/admin/commissions"
                    className="block px-4 py-2 text-gray-300 hover:text-[#00E8FF] hover:bg-white/5 transition rounded-t-lg"
                  >
                    Comisiones
                  </NavLink>

                  <NavLink
                    to="/admin/invoices"
                    className="block px-4 py-2 text-gray-300 hover:text-[#00E8FF] hover:bg-white/5 transition rounded-b-lg"
                  >
                    Facturas
                  </NavLink>
                </div>
              </div>
            )}
          </nav>
        )}

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 text-white border border-[#00E8FF]/40 rounded-lg hover:bg-[#00E8FF]/10 transition font-body"
              >
                Iniciar sesión
              </NavLink>

              <NavLink
                to="/register"
                className="px-4 py-2 bg-[#00E8FF] text-black font-semibold rounded-lg shadow-[0_0_10px_#00E8FF] hover:bg-[#00C6A6] transition font-body"
              >
                Registrarse
              </NavLink>
            </>
          ) : (
            <>
              {user && (
            <div className="relative group">
              <button className="relative">
                <Bell className="w-6 h-6 text-[#E4FCFF] hover:text-[#00E8FF] transition" />

                {unreadCount > 0 && (
                  <span className="
                    absolute -top-1 -right-1 bg-[#00E8FF] text-black text-xs 
                    w-5 h-5 flex items-center justify-center rounded-full font-bold
                  ">
                    {unreadCount}
                  </span>
                )}
              </button>

              <div
                className="
                  invisible opacity-0 group-hover:visible group-hover:opacity-100
                  transition-all duration-200 absolute right-0 mt-2 w-80
                  bg-[#070707]/90 backdrop-blur-xl border border-[#00E8FF]/20
                  rounded-xl shadow-xl text-[#E4FCFF]
                "
              >
            <div className="max-h-80 overflow-y-auto divide-y divide-white/10">

              {notifications.length === 0 ? (
                <p className="p-4 text-gray-400 text-sm">Sin notificaciones</p>
              ) : (
                notifications.map(n => (
                  <button
                    key={n.id}
                    onClick={() => markOne(n.id)}
                    className={`w-full text-left p-4 hover:bg-white/5 transition ${
                      !n.read ? "bg-white/5 border-l-4 border-[#00E8FF]" : ""
                    }`}
                  >
                    <p className="font-medium">{n.message}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </button>
                ))
              )}

            </div>
          </div>
        </div>
      )}

              <span className="text-gray-300 text-sm font-body">{user.email}</span>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="px-4 py-2 border border-[#00E8FF]/40 text-white rounded-lg hover:bg-[#00E8FF]/10 transition font-body"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
