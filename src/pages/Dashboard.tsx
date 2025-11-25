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
  const [reviews] = useState<Review[]>([])
  const [commissions] = useState<Commission[]>([])
  const [invoices] = useState<CommissionInvoice[]>([])

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
    <div className="pb-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#004F62]/60 font-body">
            PANEL GENERAL
          </p>

          <h1 className="text-3xl font-title font-bold text-[#070707]">
            Hola, {user.email.split("@")[0]}
          </h1>

          <p className="text-[#004F62]/70 text-sm font-body mt-1">
            {isClient
              ? "Revisa tus solicitudes, ofertas y notificaciones."
              : "Gestiona tus propuestas y mira tus últimas reseñas."}
          </p>
        </div>

        <div className="flex gap-2">
          {isClient && (
            <Link
              to="/jobrequests/new"
              className="px-4 py-2 rounded-full bg-[#00E8FF] text-black font-semibold shadow-lg"
            >
              + Nueva solicitud
            </Link>
          )}

          <Link
            to="/offers"
            className="px-4 py-2 rounded-full border border-[#00E8FF]/40 bg-white/60 text-[#004F62]"
          >
            Ver ofertas
          </Link>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <InfoCard label="Solicitudes" value={jobRequests.length} />
        <InfoCard label="Ofertas" value={offers.length} />
        <InfoCard label="Notificaciones" value={unreadCount} />
      </div>

      {/* SECTION LISTS */}
      <div className="grid lg:grid-cols-[2fr,1fr] gap-8">

        <div className="space-y-8">

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



/* COMPONENTES TIPADOS */

function InfoCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white/80 border border-[#00E8FF]/20 p-4 shadow">
      <p className="text-xs uppercase text-[#004F62]/60">{label}</p>
      <p className="text-3xl font-title text-[#070707] mt-2">{value}</p>
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
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#00E8FF]/15 p-6 shadow">
      <h2 className="font-title text-xl text-[#070707] mb-1">{title}</h2>

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
      className="block p-4 rounded-2xl bg-[#E4FCFF] border border-[#00E8FF]/20 hover:bg-[#d9f9ff]"
    >
      <h3 className="font-semibold">{r.title}</h3>
      <p className="text-[#004F62]/70 text-sm">{r.description}</p>
    </Link>
  )
}

function OfferItem({ offer }: { offer: Offer }) {
  return (
    <Link
      to={`/offers/${offer.id}`}
      className="block p-4 bg-[#E4FCFF] rounded-2xl border border-[#00E8FF]/20 hover:bg-[#d9f9ff]"
    >
      <h3 className="font-semibold">{offer.jobRequestTitle}</h3>
      <p className="text-[#004F62]/70 text-sm">{offer.proposalText}</p>
    </Link>
  )
}

function ProfileWidget({ user }: { user: any }) {
  return (
    <div className="bg-white/90 rounded-3xl border border-[#00E8FF]/20 p-6 shadow">
      <h3 className="font-title text-lg">Mi perfil</h3>
      <p className="text-[#004F62]/70 text-sm mt-1">{user.email}</p>

      <Link
        to={`/freelancers/${user.id}/profile`}
        className="text-[#00E8FF] text-sm mt-4 inline-block hover:underline"
      >
        Ver perfil →
      </Link>
    </div>
  )
}

function NotificationsWidget({ count }: { count: number }) {
  return (
    <div className="bg-white/90 rounded-3xl border border-[#00E8FF]/20 p-6 shadow">
      <h3 className="font-title text-lg">Notificaciones</h3>
      <p className="text-[#004F62]/70 text-sm mt-1">
        Tienes <span className="font-semibold">{count}</span> sin leer
      </p>

      <Link to="/notifications" className="text-[#00E8FF] text-sm hover:underline mt-3 inline-block">
        Ver todas →
      </Link>
    </div>
  )
}
