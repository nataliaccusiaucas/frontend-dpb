import { Toaster } from './components/ui/Toaster'
import { AppRoutes } from './routes'
import { useLocation } from "react-router-dom"
import {Navbar} from './components/Navbar'
import  Footer  from './components/Footer'

export default function App() {
  const location = useLocation()

  // Detecta si estamos en Dashboard/offers/privado
  const isPrivate =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/offers") ||
    location.pathname.startsWith("/jobrequests")

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register"

  return (
    <div className={`min-h-screen flex flex-col`}>
      {/* NAVBAR SOLO EN HOME Y RUTAS PRIVADAS */}
      {!isAuthPage && (
        <div className={isPrivate ? "" : "absolute top-0 left-0 w-full z-50"}>
          {/* Home = absolute, Private = normal */}
          <Navbar variant={isPrivate ? "private" : "home"} />
        </div>
      )}

      {/* CONTENIDO */}
      <main className={`flex-grow ${isPrivate ? "pt-24" : ""}`}>
        <AppRoutes />
      </main>

      {/* FOOTER SOLO EN HOME */}
      {!isAuthPage && !isPrivate && (
        <Footer />
      )}

      <Toaster />
    </div>
  )
}
