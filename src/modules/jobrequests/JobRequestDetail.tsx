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
    return <p className="text-[#E4FCFF] mt-6 text-center">Cargando…</p>

  return (
    <article className="max-w-2xl mx-auto mt-6 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl">
      <h1 className="text-3xl font-semibold text-[#E4FCFF]">{job.title}</h1>

      <p className="mt-3 text-gray-200 whitespace-pre-line">{job.description}</p>

      <div className="mt-4 text-[#00E8FF] font-semibold">
        Presupuesto: S/ {job.budget.toFixed(2)}
      </div>

      <p className="text-gray-300 text-sm mt-1">Estado: {job.status}</p>
      <p className="text-gray-300 text-sm">Cliente: {job.clientName}</p>

      <Link
        to="/jobrequests"
        className="mt-6 inline-block text-[#00E8FF] hover:underline"
      >
        ← Volver
      </Link>
    </article>
  )
}
