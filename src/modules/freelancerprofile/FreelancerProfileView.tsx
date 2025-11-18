import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getFreelancerProfile } from "./api"
import type { FreelancerProfile } from "./types"
import { ReviewSummaryBlock } from "../reviews/ReviewSummary"

export function FreelancerProfileView() {
  const { id } = useParams()
  const [profile, setProfile] = useState<FreelancerProfile | null>(null)

  useEffect(() => {
    if (id) getFreelancerProfile(id).then(setProfile)
  }, [id])

  if (!profile)
    return <p className="text-[#E4FCFF] mt-6 text-center">Cargando…</p>

  return (
    <section className="max-w-3xl mx-auto mt-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl">
      <h1 className="text-4xl font-bold text-[#E4FCFF]">{profile.name}</h1>

      {profile.title && (
        <p className="text-[#00E8FF] mt-1 text-lg">{profile.title}</p>
      )}

      <div className="mt-4 text-gray-200 space-y-2">
        <p>
          <strong>Descripción:</strong> {profile.description || "No especificado"}
        </p>
        <p>
          <strong>Skills:</strong> {profile.skills || "No especificado"}
        </p>
        <p>
          <strong>Ubicación:</strong> {profile.location || "No especificado"}
        </p>
        <p>
          <strong>Portfolio:</strong>{" "}
          {profile.portfolioUrl ? (
            <a
              className="text-[#00E8FF] underline"
              href={profile.portfolioUrl}
              target="_blank"
              rel="noreferrer"
            >
              Ver portfolio
            </a>
          ) : (
            "No especificado"
          )}
        </p>

        <p>
          <strong>Rating promedio:</strong>{" "}
          {profile.averageRating ?? "No registrado"}
        </p>
        <p>
          <strong>Trabajos completados:</strong> {profile.completedJobs}
        </p>
      </div>

      <ReviewSummaryBlock />
                <div className="mt-6 flex gap-3 fade-in">
            <a
                href={`/reviews/freelancer/${profile.id}`}
                className="px-4 py-2 bg-[#00E8FF] text-black font-semibold rounded-lg shadow-[0_0_10px_#00E8FF] hover:bg-[#00d0e6] transition"
            >
                Ver todas las reseñas
            </a>

            <a
                href={`/reviews/new/${profile.id}`} 
                className="px-4 py-2 border border-[#00E8FF]/40 text-[#E4FCFF] rounded-lg hover:bg-[#00E8FF]/10 transition"
            >
                Dejar reseña
            </a>
            </div>

    </section>
  )
}
