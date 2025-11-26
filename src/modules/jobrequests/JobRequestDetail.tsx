import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getJobRequest } from "./api"
import type { JobRequest } from "./types"

export function JobRequestDetail() {
  const { id } = useParams()
  const [job, setJob] = useState<JobRequest | null>(null)

  useEffect(() => {
    if (id) getJobRequest(id).then(setJob)
  }, [id])

  if (!job)
    return <p className="text-[#004F62] mt-6 text-center">Cargando…</p>

  return (
    <article
      className="
        max-w-2xl mx-auto mt-10 p-8 rounded-3xl
        bg-white/80 backdrop-blur-xl
        border border-[#00E8FF]/15
        shadow-[0_20px_60px_rgba(0,79,98,0.12)]
      "
    >
      <h1 className="text-4xl font-title font-bold text-[#003647]">
        {job.title}
      </h1>

      <p className="mt-4 text-[#004F62]/90">
        {job.description}
      </p>

      <div className="mt-5 text-[#00A6C4] font-semibold text-lg">
        Presupuesto: S/ {job.budget.toFixed(2)}
      </div>

      <p className="text-[#004F62]/80 text-sm mt-2">Estado: {job.status}</p>
      <p className="text-[#004F62]/80 text-sm">Cliente: {job.clientName}</p>

      <Link
        to="/jobrequests"
        className="mt-8 inline-block text-[#00A6C4] font-semibold hover:underline"
      >
        ← Volver
      </Link>
    </article>
  )
}
