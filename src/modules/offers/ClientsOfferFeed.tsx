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
    <div className="max-w-3xl mx-auto mt-24 px-6">
      <h1 className="text-3xl font-bold text-[#E4FCFF] mb-6">
        Ofertas recibidas
      </h1>

      {loading && <p className="text-gray-300">Cargando ofertas...</p>}

      {offers.length === 0 && !loading && (
        <p className="text-gray-400 text-lg text-center">
          Aún no hay ofertas para esta solicitud.
        </p>
      )}

      <div className="space-y-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="
              bg-white/10 backdrop-blur-xl border border-white/20
              p-5 rounded-xl shadow-lg transition hover:scale-[1.02]
            "
          >
            <h2 className="text-[#00E8FF] text-xl font-semibold tracking-wide">
              Oferta de {offer.freelancerName}
            </h2>

            <p className="text-gray-300 mt-1">
              <strong>Propuesta:</strong> S/ {offer.proposedBudget}
            </p>

            <p className="text-gray-300">
              <strong>Mensaje:</strong> {offer.proposalText}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleAccept(offer.id)}
                className="
                  bg-[#00E8FF] text-black px-4 py-2 rounded-lg font-semibold
                  shadow-[0_0_10px_#00E8FF] hover:bg-[#00d0e6] transition
                "
              >
                Aceptar
              </button>

              <button
                onClick={() => handleReject(offer.id)}
                className="
                  px-4 py-2 rounded-lg bg-red-600/80 text-white
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