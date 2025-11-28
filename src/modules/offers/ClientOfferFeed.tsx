import { useEffect, useState } from "react"
import { listOffersForClient, updateOfferStatus } from "./api"
import { useToast } from "../../components/ui/Toaster"
import { useAuthRequired } from "../auth/useAuthRequired"

export function ClientOfferFeed() {
  const  user  = useAuthRequired()
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
    <div className="max-w-5xl mx-auto mt-10 space-y-10">


      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.2em] text-[#004F62]/60">
          Tus solicitudes
        </p>
        <h1 className="text-4xl font-title font-bold text-[#003647]">
          Ofertas recibidas
        </h1>
        <p className="text-[#004F62]/70 text-sm">
          Propuestas enviadas por freelancers para tus solicitudes activas.
        </p>
      </div>


      {loading && (
        <p className="text-[#004F62] text-lg text-center">Cargando ofertas...</p>
      )}


      {!loading && offers.length === 0 && (
        <div className="
          rounded-3xl bg-white/85 backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,79,98,0.12)]
          border border-[#00E8FF]/15
          p-10 text-center
        ">
          <h2 className="text-[#003647] text-xl font-title">
            Aún no hay ofertas para tus solicitudes.
          </h2>
          <p className="text-[#004F62]/70 mt-2 text-sm">
            Los freelancers te enviarán propuestas pronto.
          </p>
        </div>
      )}


      <div className="space-y-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="
              bg-white/90 backdrop-blur-xl
              rounded-3xl p-8 border border-[#00E8FF]/20
              shadow-[0_18px_50px_rgba(0,79,98,0.10)]
              flex flex-col gap-4
            "
          >

            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-[#070707]">
                  {offer.freelancerName}
                </h2>
                <p className="text-[#004F62]/70 text-sm">
                  Oferta para: {offer.jobRequestTitle}
                </p>
              </div>

              <span className="text-[#00A6C4] text-xl font-bold">
                S/ {offer.proposedBudget}
              </span>
            </div>

            <p className="text-[#004F62]/80 leading-relaxed">
              {offer.proposalText}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => handleAccept(offer.id)}
                className="
                  px-5 py-2 rounded-xl
                  bg-[#00E8FF] text-black font-semibold
                  shadow-[0_10px_30px_rgba(0,232,255,0.3)]
                  hover:bg-[#00d0e6] transition
                "
              >
                Aceptar
              </button>

              <button
                onClick={() => handleReject(offer.id)}
                className="
                  px-5 py-2 rounded-xl
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
