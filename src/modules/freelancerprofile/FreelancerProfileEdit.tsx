import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getFreelancerProfile, updateFreelancerProfile } from "./api"
import type { FreelancerProfile } from "./types"
import { useToast } from "../../components/ui/Toaster"

export function FreelancerProfileEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [profile, setProfile] = useState<FreelancerProfile | null>(null)

  useEffect(() => {
    if (id) getFreelancerProfile(id).then(setProfile)
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await updateFreelancerProfile(id!, {
      title: profile?.title || "",
      description: profile?.description || "",
      skills: profile?.skills || "",
      portfolioUrl: profile?.portfolioUrl || "",
      location: profile?.location || ""
    })

    toast("Perfil actualizado")
    navigate(`/freelancers/${id}/profile`)
  }

  if (!profile)
    return <p className="text-[#E4FCFF] mt-6 text-center">Cargando…</p>

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl space-y-4"
    >
      <h1 className="text-3xl font-bold text-[#E4FCFF]">Editar Perfil</h1>

      {["title", "description", "skills", "portfolioUrl", "location"].map((field) => (
        <div key={field}>
          <label className="text-[#E4FCFF] capitalize">{field}</label>
          <input
            value={(profile as any)[field] || ""}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev!, [field]: e.target.value }))
            }
            className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-md text-[#E4FCFF]"
          />
        </div>
      ))}

      <button
        className="w-full bg-[#00E8FF] text-black font-semibold py-2 rounded-xl hover:bg-[#00d0e6]"
      >
        Guardar cambios
      </button>
    </form>
  )
}
