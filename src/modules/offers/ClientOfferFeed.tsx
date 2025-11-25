import { useEffect, useState } from "react"
import { listOffersForClient, updateOfferStatus } from "./api"
import { useAuth } from "../auth/AuthContext"
import { useToast } from "../../components/ui/Toaster"

export function ClientOfferFeed() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [offers, setOffers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadOffers(showToast = false) {
    setLoading(true)
    try {
      const data = await listOffersForClient(user.id)
      setOffers(data)

      if (showToast && data.length > offers.length) {
        const sound = new Audio("/sounds/new-offer.mp3")
        sound.volume = 0.4
        sound.play()
        toast("📨 Nuevas ofertas llegaron")
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (user?.id) loadOffers()
    const interval = setInterval(() => loadOffers(true), 6000)
    return () => clearInterval(interval)
  }, [user])

  async function handleAccept(offerId: string) {
    await updateOfferStatus(offerId, "ACCEPTED")
    toast("✔ Oferta aceptada")
    loadOffers()
  }

  async function handleReject(offerId: string) {
    await updateOfferStatus(offerId, "REJECTED")
    toast("✖ Oferta rechazada")
    loadOffers()
  }

  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-10">
      
      {/* 🔹 Encabezado */}
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.2em] text-[#004F62]/60 font-body">
          TUS SOLICITUDES
        </p>
        <h1 className="text-3xl md:text-4xl font-title font-bold text-[#070707]">
          Ofertas recibidas
        </h1>
        <p className="text-[#004F62]/70 text-sm font-body">
          Aquí verás las propuestas que envían los freelancers a tus solicitudes.
        </p>
      </div>

      {/* 🔹 Si está cargando */}
      {loading && (
        <p className="text-[#004F62] text-lg text-center">Cargando ofertas...</p>
      )}

      {/* 🔹 Estado vacío */}
      {!loading && offers.length === 0 && (
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,79,98,0.12)] border border-[#00E8FF]/15 p-10 text-center">
          <h2 className="text-[#070707] text-xl font-title">
            Aún no hay ofertas para tus solicitudes.
          </h2>
          <p className="text-[#004F62]/70 mt-2 text-sm">
            (Los freelancers te enviarán propuestas cuando revisen tus solicitudes)
          </p>
        </div>
      )}

      {/* 🔹 Listado de ofertas */}
      <div className="space-y-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white/90 backdrop-blur-xl rounded-3xl border border-[#00E8FF]/20 shadow-[0_18px_50px_rgba(0,79,98,0.10)] p-6 md:p-8 flex flex-col gap-4"
          >
            {/* Título */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[#070707] text-xl font-semibold font-title">
                  {offer.freelancerName}
                </h2>
                <p className="text-[#004F62]/70 text-sm">
                  Oferta para: {offer.jobRequestTitle}
                </p>
              </div>

              <span className="text-[#00A6C4] font-bold text-lg">
                S/ {offer.proposedBudget}
              </span>
            </div>

            {/* Texto */}
            <p className="text-[#004F62]/80 leading-relaxed">
              {offer.proposalText}
            </p>

            {/* Botones */}
            <div className="flex gap-4">
              <button
                onClick={() => handleAccept(offer.id)}
                className="px-5 py-2 rounded-xl bg-[#00E8FF] text-black font-semibold shadow-[0_10px_30px_rgba(0,232,255,0.3)] hover:bg-[#00d0e6] transition"
              >
                Aceptar
              </button>

              <button
                onClick={() => handleReject(offer.id)}
                className="px-5 py-2 rounded-xl bg-red-500/80 text-white font-semibold hover:bg-red-600 transition"
              >
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
