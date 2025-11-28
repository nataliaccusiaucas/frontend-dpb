import { useEffect, useState } from "react"
import { listJobRequests } from "./api"
import { Link } from "react-router-dom"
import type { JobRequest } from "./types"

export function JobRequestList() {
  const [items, setItems] = useState<JobRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listJobRequests().then(data => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  return (
    <section className="max-w-5xl mx-auto mt-10 space-y-6">

      <div className="flex items-center">
        <h1 className="text-4xl font-title font-bold text-[#003647]">
          Mis solicitudes
        </h1>

        <Link
          to="/jobrequests/new"
          className="
            ml-auto px-5 py-2.5 rounded-xl
            bg-[#00E8FF] text-[#070707] font-semibold
            shadow-[0_10px_25px_rgba(0,232,255,0.35)]
            hover:bg-[#00C6E0] transition
          "
        >
          Crear solicitud
        </Link>
      </div>

      {loading ? (
        <p className="text-[#004F62] text-lg">Cargando…</p>
      ) : (
        <ul className="grid gap-6">
          {items.map(o => (
            <li
              key={o.id}
              className="
                p-6 rounded-3xl
                bg-white/80 backdrop-blur-xl
                border border-[#00E8FF]/15
                shadow-[0_20px_60px_rgba(0,79,98,0.12)]
                hover:shadow-[0_25px_70px_rgba(0,79,98,0.18)]
                transition
              "
            >
              <div className="flex items-start">
                <h2 className="text-xl font-title font-semibold text-[#003647]">
                  {o.title}
                </h2>

                <span className="ml-auto text-sm font-bold text-[#00A6C4]">
                  S/ {o.budget.toFixed(2)}
                </span>
              </div>

              <p className="text-[#004F62]/80 mt-2 text-sm">
                {o.description}
              </p>

              <div className="mt-3 text-xs text-[#004F62]/75">
                Estado: {o.status}
                <br />
                Cliente: {o.clientName}
              </div>

              <Link
                to={`/jobrequests/${o.id}`}
                className="mt-3 inline-block text-[#00A6C4] text-sm font-semibold hover:underline"
              >
                Ver detalles →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
