import { Outlet } from "react-router-dom"
import { AppNavbar } from "../components/AppNavbar"
import Footer from "../components/Footer"

export function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col">

      <AppNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
