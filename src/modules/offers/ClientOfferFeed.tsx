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

      if (showToast && data.length > 0) {
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


  async function handleAccept(id: string) {
    await updateOfferStatus(id, "ACCEPTED")
    toast("✔ Oferta aceptada")
    loadOffers()
  }

  async function handleReject(id: string) {
    await updateOfferStatus(id, "REJECTED")
    toast("✖ Oferta rechazada")
    loadOffers()
  }

  return (
    <div className="pb-10">

      {/* ENCABEZADO IGUAL AL DASHBOARD */}
      <div className="text-center mb-10 mt-4">
        <h1 className="text-3xl md:text-4xl font-title font-bold text-[#070707] drop-shadow-[0_0_6px_#00E8FF]">
          Ofertas recibidas
        </h1>
        <p className="text-sm text-[#004F62]/70 font-body mt-1">
          Las ofertas aparecerán aquí cuando los freelancers propongan un presupuesto.
        </p>
      </div>

      {/* SI NO HAY OFERTAS */}
      {offers.length === 0 && !loading && (
        <div className="max-w-lg mx-auto mt-20 bg-white/70 backdrop-blur-xl border border-[#00E8FF]/20 shadow-[0_20px_60px_rgba(0,79,98,0.12)] rounded-3xl p-10 text-center">
          <p className="text-lg font-title text-[#004F62]/70">
            Aún no hay ofertas para tus solicitudes.
          </p>
        </div>
      )}

      {/* LISTA DE OFERTAS */}
      <div className="max-w-3xl mx-auto space-y-6 px-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="
              bg-white/80 backdrop-blur-xl 
              border border-[#00E8FF]/25 
              rounded-3xl p-6 
              shadow-[0_20px_60px_rgba(0,79,98,0.12)]
              hover:scale-[1.01] transition
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-title text-[#070707]">
                  Oferta de {offer.freelancerName}
                </h2>

                <p className="text-sm text-[#004F62]/80 mt-1">
                  <strong>Mensaje:</strong> {offer.proposalText}
                </p>
              </div>

              <span className="text-lg font-semibold text-[#00A6C4]">
                S/ {offer.proposedBudget}
              </span>
            </div>

            <div className="flex gap-4 mt-5">
              <button
                onClick={() => handleAccept(offer.id)}
                className="
                  flex-1 py-2 rounded-xl 
                  bg-[#00E8FF] text-[#070707] font-semibold 
                  shadow-[0_0_12px_rgba(0,232,255,0.8)]
                  hover:bg-[#00CAE0] transition
                "
              >
                Aceptar
              </button>

              <button
                onClick={() => handleReject(offer.id)}
                className="
                  flex-1 py-2 rounded-xl 
                  bg-red-500/80 text-white font-semibold
                  hover:bg-red-600 transition
                "
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

