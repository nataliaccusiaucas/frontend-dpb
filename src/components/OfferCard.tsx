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
    <div className="
      w-full 
      rounded-3xl 
      bg-white/90 
      backdrop-blur-xl 
      border border-[#00E8FF]/20 
      shadow-[0_18px_60px_rgba(0,79,98,0.12)] 
      p-6 
      space-y-4 
      transition-transform
      hover:-translate-y-0.5
    ">
      
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">

        {/* FOTO + DATOS */}
        <div className="flex items-start gap-4">
          <img
            src="https://i.pravatar.cc/150"
            className="w-14 h-14 rounded-full border border-[#00E8FF]/40 object-cover"
          />

          <div className="max-w-[220px]">
            <h3 className="font-title text-[#070707] text-sm font-semibold leading-tight">
              {offer.freelancerName}
              {offer.freelancerTitle ? (
                <span className="font-normal"> — {offer.freelancerTitle}</span>
              ) : null}
            </h3>

            {offer.freelancerDescription && (
              <p className="text-xs text-[#004F62]/70 mt-1 leading-relaxed">
                {offer.freelancerDescription}
              </p>
            )}
          </div>
        </div>

        {/* PRECIO */}
        <div className="text-right">
          <p className="text-[11px] text-[#004F62]/60">Propuesta</p>
          <p className="text-[#00A6C4] font-bold text-lg">
            S/ {offer.proposedBudget.toFixed(2)}
          </p>
        </div>
      </div>

      {/* VER MÁS */}
      <button
        onClick={() => setOpen(!open)}
        className="text-xs font-semibold text-[#00A6C4] underline"
      >
        {open ? "Ver menos" : "Ver más"}
      </button>

      {/* DETALLES */}
      {open && (
        <div className="mt-2 bg-[#F8FEFF] border border-[#00E8FF]/20 p-4 rounded-2xl space-y-3">

          {offer.freelancerSkills && (
            <div>
              <p className="text-sm font-semibold text-[#070707]">Skills</p>
              <p className="text-xs text-[#004F62]/70">{offer.freelancerSkills}</p>
            </div>
          )}

          {offer.freelancerPortfolioUrl && (
            <a
              href={offer.freelancerPortfolioUrl}
              target="_blank"
              className="text-xs text-[#00A6C4] underline block"
            >
              Ver portafolio →
            </a>
          )}

          <p className="text-xs text-[#004F62]/70">
            Ubicación: {offer.freelancerLocation || "No especificado"}
          </p>
        </div>
      )}

      {/* BOTONES */}
      <div className="flex gap-4 pt-2">

        <button
          onClick={() => onAccept(offer.id)}
          className="flex-1 py-3 rounded-xl bg-[#00E8FF] text-[#004F62] font-semibold 
            shadow-[0_10px_30px_rgba(0,232,255,0.35)]
            hover:bg-[#00D2EB] transition"
        >
          Aceptar
        </button>

        <button
          onClick={() => onReject(offer.id)}
          className="flex-1 py-3 rounded-xl border border-red-300 bg-red-50 text-red-500 font-semibold
            hover:bg-red-100 transition"
        >
          Rechazar
        </button>

      </div>
    </div>
  )
}
