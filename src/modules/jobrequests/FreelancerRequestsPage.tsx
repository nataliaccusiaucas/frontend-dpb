import { useEffect, useState } from "react"
import { listRelevantRequests } from "../../modules/jobrequests/api"
import { useAuth } from "../../modules/auth/AuthContext"
import { Link } from "react-router-dom"
import type { JobRequest } from "./types"

export function FreelancerRequestsPage() {
  const { user } = useAuth()

  const [requests, setRequests] = useState<JobRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [, setSkills] = useState<string[]>([])

  useEffect(() => {
    async function load() {
      if (!user) return

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/freelancer-profiles/user/${user.id}`
      )

      if (res.ok) {
        const profile = await res.json()

        const parsedSkills =
          profile.skills
            ?.split(",")
            .map((s: string) => s.trim().toLowerCase()) || []

        setSkills(parsedSkills)

        const data = await listRelevantRequests(parsedSkills)
        setRequests(data)
      }

      setLoading(false)
    }

    load()
  }, [user])

  if (loading) {
    return <p className="text-[#004F62] mt-6">Cargando…</p>
  }

  return (
    <section className="max-w-5xl mx-auto mt-10 space-y-6">
      <h1 className="text-4xl font-title font-bold text-[#003647]">
        Requests según tus habilidades
      </h1>

      {requests.length === 0 ? (
        <p className="text-[#004F62]/80">
          No hay solicitudes para tus categorías por ahora.
        </p>
      ) : (
        <ul className="grid gap-6">
          {requests.map((r) => (
            <li
              key={r.id}
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
                  {r.title}
                </h2>

                <span className="ml-auto text-sm font-bold text-[#00A6C4]">
                  S/ {r.budget.toFixed(2)}
                </span>
              </div>

              <div className="mt-2 text-sm text-[#004F62]/90">
                Categorías: {r.categories?.join(", ")}
              </div>

              <p className="text-[#004F62]/80 mt-2 text-sm">{r.description}</p>

              <Link
                to={`/job-requests/${r.id}`}
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
