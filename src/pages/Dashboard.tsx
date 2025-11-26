import { Link } from "react-router-dom"
import { useAuth } from "../modules/auth/AuthContext"
import { useEffect, useState, ReactNode } from "react"

import { listJobRequests } from "../modules/jobrequests/api"
import { listOffersForClient, listOffersByFreelancer } from "../modules/offers/api"
import { useNotifications } from "../modules/notification/useNotifications"

import type { JobRequest } from "../modules/jobrequests/types"
import type { Offer } from "../modules/offers/types"
import type { Review } from "../modules/reviews/types"
import type { Commission, CommissionInvoice } from "../modules/commissions/types"

export function Dashboard() {
  const { user } = useAuth()
  const { unreadCount } = useNotifications()

  const [jobRequests, setJobRequests] = useState<JobRequest[]>([])
  const [offers, setOffers] = useState<Offer[]>([])

  const isClient = user.role === "CLIENT"
  const isFreelancer = user.role === "FREELANCER"

  useEffect(() => {
    async function load() {
      const jr = await listJobRequests()
      setJobRequests(jr)

      if (isClient) {
        setOffers(await listOffersForClient(user.id))
      }

      if (isFreelancer) {
        setOffers(await listOffersByFreelancer(user.id))
      }
    }
    load()
  }, [user])

  return (
    <div className="pb-10 max-w-6xl mx-auto mt-10 space-y-12">

      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-[#004F62]/60 font-body">
          PANEL GENERAL
        </p>

        <h1 className="text-4xl font-title font-bold text-[#003647]">
          Hola, {user.email.split("@")[0]}
        </h1>

        <p className="text-[#004F62]/70 text-sm font-body mt-1">
          {isClient
            ? "Revisa tus solicitudes, ofertas y notificaciones."
            : "Gestiona tus propuestas y mira tus últimas reseñas."}
        </p>

        <div className="flex gap-3 mt-5">
          {isClient && (
            <Link
              to="/jobrequests/new"
              className="
                px-5 py-2.5 rounded-xl
                bg-[#00E8FF] text-[#070707] font-semibold
                shadow-[0_10px_25px_rgba(0,232,255,0.35)]
                hover:bg-[#00C6E0] transition
              "
            >
              + Nueva solicitud
            </Link>
          )}

          <Link
            to="/offers"
            className="
              px-5 py-2.5 rounded-xl
              border border-[#00E8FF]/30
              bg-white/50 text-[#004F62]
              shadow-sm hover:bg-white/80 transition
            "
          >
            Ver ofertas
          </Link>
        </div>
      </header>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <InfoCard label="Solicitudes" value={jobRequests.length} />
        <InfoCard label="Ofertas" value={offers.length} />
        <InfoCard label="Notificaciones" value={unreadCount} />
      </div>

      <div className="grid lg:grid-cols-[2fr,1fr] gap-10">

        <div className="space-y-10">

          <SectionCard
            title={isClient ? "Mis solicitudes" : "Solicitudes disponibles"}
            empty="No hay solicitudes aún."
          >
            {jobRequests.slice(0, 5).map((r) => (
              <RequestItem key={r.id} r={r} />
            ))}
          </SectionCard>

          <SectionCard
            title={isClient ? "Ofertas recibidas" : "Mis ofertas enviadas"}
            empty="No hay ofertas aún."
          >
            {offers.slice(0, 5).map((o) => (
              <OfferItem key={o.id} offer={o} />
            ))}
          </SectionCard>

        </div>

        <div className="space-y-6">
          <ProfileWidget user={user} />
          <NotificationsWidget count={unreadCount} />
        </div>

      </div>

    </div>
  )
}


function InfoCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="
      rounded-3xl p-6
      bg-white/80 backdrop-blur-xl
      border border-[#00E8FF]/15
      shadow-[0_15px_45px_rgba(0,79,98,0.12)]
    ">
      <p className="text-xs uppercase text-[#004F62]/60">{label}</p>
      <p className="text-3xl font-title text-[#003647] mt-2">{value}</p>
    </div>
  )
}

function SectionCard({
  title,
  empty,
  children,
}: {
  title: string
  empty: string
  children: ReactNode
}) {
  const isEmpty = Array.isArray(children) && children.length === 0

  return (
    <div
      className="
        p-6 rounded-3xl
        bg-white/80 backdrop-blur-xl
        border border-[#00E8FF]/15
        shadow-[0_15px_45px_rgba(0,79,98,0.12)]
      "
    >
      <h2 className="font-title text-2xl font-bold text-[#003647] mb-2">
        {title}
      </h2>

      {isEmpty ? (
        <p className="text-[#004F62]/70 text-sm">{empty}</p>
      ) : (
        <div className="space-y-3">{children}</div>
      )}
    </div>
  )
}

function RequestItem({ r }: { r: JobRequest }) {
  return (
    <Link
      to={`/jobrequests/${r.id}`}
      className="
        block p-4 rounded-2xl bg-[#F8FEFF]
        border border-[#00E8FF]/15
        hover:bg-[#E4FCFF] transition
      "
    >
      <h3 className="font-title text-lg text-[#003647]">{r.title}</h3>
      <p className="text-[#004F62]/70 text-sm mt-1">{r.description}</p>
    </Link>
  )
}

function OfferItem({ offer }: { offer: Offer }) {
  return (
    <Link
      to={`/offers/${offer.id}`}
      className="
        block p-4 rounded-2xl bg-[#F8FEFF]
        border border-[#00E8FF]/15
        hover:bg-[#E4FCFF] transition
      "
    >
      <h3 className="font-title text-lg text-[#003647]">{offer.jobRequestTitle}</h3>
      <p className="text-[#004F62]/70 text-sm mt-1">{offer.proposalText}</p>
    </Link>
  )
}

function ProfileWidget({ user }: { user: any }) {
  return (
    <div className="
      bg-white/80 backdrop-blur-xl
      rounded-3xl border border-[#00E8FF]/15
      p-6 shadow-[0_15px_45px_rgba(0,79,98,0.12)]
    ">
      <h3 className="font-title text-xl text-[#003647]">Mi perfil</h3>
      <p className="text-[#004F62]/70 text-sm mt-1">{user.email}</p>

      <Link
        to={`/freelancers/${user.id}/profile`}
        className="text-[#00A6C4] text-sm mt-4 inline-block font-semibold hover:underline"
      >
        Ver perfil →
      </Link>
    </div>
  )
}

function NotificationsWidget({ count }: { count: number }) {
  return (
    <div className="
      bg-white/80 backdrop-blur-xl
      rounded-3xl border border-[#00E8FF]/15
      p-6 shadow-[0_15px_45px_rgba(0,79,98,0.12)]
    ">
      <h3 className="font-title text-xl text-[#003647]">Notificaciones</h3>
      <p className="text-[#004F62]/70 text-sm mt-1">
        Tienes <span className="font-semibold">{count}</span> sin leer
      </p>

      <Link
        to="/notifications"
        className="text-[#00A6C4] text-sm font-semibold hover:underline mt-3 inline-block"
      >
        Ver todas →
      </Link>
    </div>
  )
}
