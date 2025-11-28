import { useEffect, useState } from "react"
import { listOffersForClient } from "./api"
import { Link } from "react-router-dom"
import type { Offer } from "./types"
import { useAuthRequired } from "../auth/useAuthRequired"

export function OffersList() {
  const  user  = useAuthRequired()
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listOffersForClient(user.id).then(data => {
      setOffers(data)
      setLoading(false)
    })
  }, [])

  return (
    <section className="max-w-5xl mx-auto mt-10 space-y-6">

      <h1 className="text-4xl font-title font-bold text-[#003647]">
        Ofertas recibidas
      </h1>

      {loading ? (
        <p className="text-[#004F62] text-lg">Cargando…</p>
      ) : (
        <ul className="grid gap-6">
          {offers.map(o => (
            <li
              key={o.id}
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
                  {o.jobRequestTitle}
                </h2>

                <span className="ml-auto text-sm font-bold text-[#00A6C4]">
                  S/ {o.proposedBudget.toFixed(2)}
                </span>
              </div>

              <p className="text-[#004F62]/80 mt-2 text-sm leading-relaxed">
                {o.proposalText}
              </p>

              <div className="mt-3 text-xs text-[#004F62]/70">
                Estado: {o.status}  
                <br />
                Freelancer: {o.freelancerName}
              </div>

              <Link
                to={`/offers/${o.id}`}
                className="text-[#00A6C4] text-sm mt-3 inline-block font-semibold hover:underline"
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
