import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../modules/auth/AuthContext";
import { useEffect, useState } from "react";

export function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
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
              to="/"
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
