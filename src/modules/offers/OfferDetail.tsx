import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getOffer } from "./api"
import type { Offer } from "./types"

export function OfferDetail() {
  const { id } = useParams()
  const [offer, setOffer] = useState<Offer | null>(null)

  useEffect(() => {
    if (id) getOffer(id).then(setOffer)
  }, [id])

  if (!offer)
    return <p className="text-[#E4FCFF] mt-6 text-center">Cargando…</p>

  return (
    <article className="max-w-2xl mx-auto mt-6 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl">
      <h1 className="text-3xl font-semibold text-[#E4FCFF]">
        Oferta para: {offer.jobRequestTitle}
      </h1>

      <p className="mt-3 text-gray-200 whitespace-pre-line">
        {offer.proposalText}
      </p>

      <div className="mt-4 text-[#00E8FF] font-semibold">
        Presupuesto propuesto: S/ {offer.proposedBudget.toFixed(2)}
      </div>

      <p className="text-gray-300 text-sm mt-2">Estado: {offer.status}</p>
      <p className="text-gray-300 text-sm">Freelancer: {offer.freelancerName}</p>

      <Link
        to="/offers"
        className="mt-6 inline-block text-[#00E8FF] hover:underline"
      >
        ← Volver
      </Link>
    </article>
  )
}
