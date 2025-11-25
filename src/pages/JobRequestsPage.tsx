import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { listJobRequests } from "../modules/jobrequests/api"
import type { JobRequest } from "../modules/jobrequests/types"

export function JobRequestsPage() {
  const [requests, setRequests] = useState<JobRequest[]>([])

  useEffect(() => {
    listJobRequests().then((data) => setRequests(data))
  }, [])

  const activos = requests.length
  const finalizados = 0
  const pendientes = 0

  return (
    <div className="pb-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#004F62]/60 font-body">
            SOLICITUDES
          </p>
          <h1 className="text-2xl md:text-3xl font-title font-bold text-[#070707]">
            Solicitudes de trabajo
          </h1>
          <p className="text-sm text-[#004F62]/80 font-body mt-1">
            Gestiona tus solicitudes creadas.
          </p>
        </div>

        <div>
          <Link
            to="/jobrequests/new"
            className="px-4 py-2 rounded-full bg-[#00E8FF] text-[#070707] 
            font-semibold shadow-[0_10px_30px_rgba(0,232,255,0.4)]
            hover:bg-[#00C6E0] transition"
          >
            + Nueva solicitud
          </Link>
        </div>
      </div>

      {/* CONTADORES */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <SummaryBox label="En curso" value={activos} pill="Activos" />
        <SummaryBox label="Completados" value={finalizados} pill="Finalizados" />
        <SummaryBox label="Pendientes" value={pendientes} pill="Por iniciar" />
      </div>

      {/* LISTA DE SOLICITUDES */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-[#004F62]/80 text-center">
            Aún no tienes solicitudes creadas.
          </p>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              className="rounded-2xl bg-white/80 backdrop-blur-xl border 
              border-[#00E8FF]/15 shadow-[0_20px_60px_rgba(0,79,98,0.12)] 
              p-5 md:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-title text-lg text-[#070707]">
                    {req.title}
                  </h3>
                  <p className="text-sm text-[#004F62]/80 font-body mt-1 line-clamp-2">
                    {req.description}
                  </p>
                  <p className="text-xs text-[#004F62]/60 mt-1">
                    Categoría: {req.category || "Sin categoría"}
                  </p>
                  <p className="text-xs text-[#004F62]/60">
                    Estado: {req.status}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#00E8FF]/10 
                  text-[#004F62] text-sm font-semibold">
                  S/ {req.budget}
                </span>
              </div>

              <Link
                to={`/jobrequests/${req.id}`}
                className="text-[#00E8FF] mt-3 inline-block font-medium text-sm hover:underline"
              >
                Ver detalles →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SummaryBox({ label, value, pill }: { label: string; value: number; pill: string }) {
  return (
    <div className="rounded-2xl bg-white/80 border border-[#00E8FF]/20 shadow-[0_14px_40px_rgba(0,79,98,0.08)] p-4 flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[#004F62]/60 font-body">
        {pill}
      </span>
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-title text-[#070707]">{value}</p>
        <span className="text-xs text-[#004F62]/70 font-body">{label}</span>
      </div>
    </div>
  )
}

