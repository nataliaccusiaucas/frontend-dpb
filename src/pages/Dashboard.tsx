import { Link } from "react-router-dom"
import { useAuth } from "../modules/auth/AuthContext"

export function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="pt-4">
      <h1 className="text-3xl font-semibold text-[#E4FCFF] mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          to="/jobrequests"
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl 
          border border-white/20 text-[#E4FCFF] hover:bg-white/20 transition"
        >
          <h2 className="text-xl font-bold">Requests</h2>
          <p className="text-gray-300">Crea, revisa y administra tus solicitudes.</p>
        </Link>

        <Link
          to="/offers"
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl 
          border border-white/20 text-[#E4FCFF] hover:bg-white/20 transition"
        >
          <h2 className="text-xl font-bold">Offers</h2>
          <p className="text-gray-300">Ofertas enviadas y recibidas.</p>
        </Link>

        <Link
          to={`/freelancers/${user.id}/profile`}
          className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl 
          border border-white/20 text-[#E4FCFF] hover:bg-white/20 transition"
        >
          <h2 className="text-xl font-bold">Profile</h2>
          <p className="text-gray-300">Completa tu perfil para destacar.</p>
        </Link>

        {user.role === "CLIENT" && (
          <Link
            to="/client/offers"
            className="p-6 rounded-2xl bg-[#00E8FF]/10 backdrop-blur-xl 
            border border-[#00E8FF]/30 text-[#E4FCFF] hover:bg-[#00E8FF]/20 
            shadow-[0_0_10px_#00E8FF50] transition"
          >
            <h2 className="text-xl font-bold">Ofertas recibidas</h2>
            <p className="text-gray-300">
              Mira las ofertas que te envían en tiempo real (estilo InDriver).
            </p>
          </Link>
        )}

      </div>
    </div>
  )
}
