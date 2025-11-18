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
    <section className="max-w-4xl mx-auto mt-6 space-y-6">
      <div className="flex items-center">
        <h1 className="text-3xl font-semibold text-[#E4FCFF]">Solicitudes</h1>
        <Link
          to="/jobrequests/new"
          className="ml-auto px-4 py-2 rounded-xl text-black font-medium bg-[#00E8FF] hover:bg-[#00d0e6] transition"
        >
          Crear solicitud
        </Link>
      </div>

      {loading ? (
        <p className="text-[#E4FCFF]">Cargando…</p>
      ) : (
        <ul className="grid gap-4">
          {items.map(o => (
            <li
              key={o.id}
              className="p-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20"
            >
              <div className="flex items-start">
                <h2 className="text-xl font-semibold text-[#E4FCFF]">{o.title}</h2>
                <span className="ml-auto text-sm font-bold text-[#00E8FF]">
                  S/ {o.budget.toFixed(2)}
                </span>
              </div>

              <p className="text-gray-200 mt-1">{o.description}</p>

              <div className="mt-2 text-xs text-gray-300">
                Estado: {o.status}  
                <br />
                Cliente: {o.clientName}
              </div>

              <Link
                to={`/jobrequests/${o.id}`}
                className="text-[#00E8FF] text-sm mt-2 inline-block hover:underline"
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