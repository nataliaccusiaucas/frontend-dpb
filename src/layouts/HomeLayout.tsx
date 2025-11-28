import { Outlet, useLocation } from "react-router-dom"
import { AppNavbar } from "../components/AppNavbar"
import Footer from "../components/Footer"

export function HomeLayout() {
  const location = useLocation()

  // Ocultar solo el FOOTER en login/register
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register"

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      <AppNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}

    </div>
  )
}
