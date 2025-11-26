import { useState } from "react"

type OfferCardProps = {
  offer: {
    id: string
    proposedBudget: number
    proposalText: string
    freelancerName: string
    freelancerTitle?: string | null
    freelancerDescription?: string | null
    freelancerSkills?: string | null
    freelancerPortfolioUrl?: string | null
    freelancerLocation?: string | null
  }
  onAccept: (id: string) => void
  onReject: (id: string) => void
}

export function OfferCard({ offer, onAccept, onReject }: OfferCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-[#00E8FF]/20 shadow-[0_18px_50px_rgba(0,79,98,0.10)] p-6">
      

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/100"
            className="w-12 h-12 rounded-full border border-[#00E8FF]/30"
          />

          <div>
            <h3 className="font-title text-[#070707] text-sm font-semibold">
              {offer.freelancerName}
              {offer.freelancerTitle ? ` — ${offer.freelancerTitle}` : ""}
            </h3>
            {offer.freelancerDescription && (
              <p className="text-xs text-[#004F62]/70">{offer.freelancerDescription}</p>
            )}
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-[#004F62]/60">Propuesta</p>
          <p className="text-lg font-bold text-[#00A6C4]">
            S/ {offer.proposedBudget.toFixed(2)}
          </p>
        </div>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="text-xs font-semibold text-[#00A6C4] underline mt-3"
      >
        {open ? "Ver menos" : "Ver más"}
      </button>

      {open && (
        <div className="mt-4 bg-[#F8FEFF] border border-[#00E8FF]/20 p-4 rounded-2xl">
          
          {offer.freelancerDescription && (
            <>
              <p className="text-sm font-semibold text-[#070707] mb-1">Experiencia</p>
              <p className="text-xs text-[#004F62]/70">
                {offer.freelancerDescription}
              </p>
            </>
          )}

          {offer.freelancerSkills && (
            <>
              <p className="text-sm font-semibold text-[#070707] mt-3 mb-1">Skills</p>
              <p className="text-xs text-[#004F62]/70">{offer.freelancerSkills}</p>
            </>
          )}

          {offer.freelancerPortfolioUrl && (
            <a
              href={offer.freelancerPortfolioUrl}
              target="_blank"
              className="text-xs text-[#00A6C4] underline block mt-3"
            >
              Portafolio →
            </a>
          )}

          <p className="text-xs text-[#004F62]/60 mt-3">
            Ubicación: {offer.freelancerLocation || "No especificado"}
          </p>
        </div>
      )}

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onAccept(offer.id)}
          className="flex-1 py-2 rounded-xl bg-[#00E8FF] text-black font-semibold shadow-[0_10px_30px_rgba(0,232,255,0.3)]"
        >
          Aceptar
        </button>

        <button
          onClick={() => onReject(offer.id)}
          className="flex-1 py-2 rounded-xl border border-red-300 bg-red-50 text-red-500 font-semibold"
        >
          Rechazar
        </button>
      </div>

    </div>
  )
}
