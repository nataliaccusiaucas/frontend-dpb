import { Toaster } from './components/ui/Toaster'
import { AppRoutes } from './routes'
import { useLocation } from "react-router-dom"
import Footer from './components/Footer'

export default function App() {
  const location = useLocation()

  const isPrivate =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/offers") ||
    location.pathname.startsWith("/jobrequests")

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register"

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className={`flex-grow ${isPrivate ? "pt-24" : ""}`}>
        <AppRoutes />
      </main>

      {!isAuthPage && !isPrivate && <Footer />}

      <Toaster />
    </div>
  )
}