import { Link } from "react-router-dom"
import { useEffect, useState, ReactNode } from "react"

import { listJobRequests } from "../modules/jobrequests/api"
import { listOffersForClient, listOffersByFreelancer } from "../modules/offers/api"
import { useNotifications } from "../modules/notification/useNotifications"

import type { JobRequest } from "../modules/jobrequests/types"
import type { Offer } from "../modules/offers/types"
import { useAuthRequired } from "../modules/auth/useAuthRequired"


export function Dashboard() {
  const  user  = useAuthRequired()
  const { unreadCount } = useNotifications()

  const [jobRequests, setJobRequests] = useState<JobRequest[]>([])
  const [offers, setOffers] = useState<Offer[]>([])

  const isClient = user.role === "CLIENT"
  const isFreelancer = user.role === "FREELANCER"

  useEffect(() => {
    async function load() {
      const jr = await listJobRequests()
      setJobRequests(jr)

      if (isClient) setOffers(await listOffersForClient(user.id))
      if (isFreelancer) setOffers(await listOffersByFreelancer(user.id))
    }
    load()
  }, [user])


  return (
    <div
      className="
        pb-16 
        max-w-6xl mx-auto 
        mt-10 space-y-14
        bg-linear-to-br from-[#E4FCFF] via-[#F7FEFF] to-[#FFFFFF]
        rounded-3xl
        shadow-[0_40px_90px_rgba(0,79,98,0.12)]
        p-10
      "
    >

      <header className="space-y-3">
        <p className="text-xs font-semibold tracking-[0.25em] text-[#00A6C4]">
          PANEL GENERAL
        </p>

        <h1 className="text-5xl font-title font-extrabold text-[#003647] leading-tight drop-shadow-sm">
          Hola, {user.email.split("@")[0]}
        </h1>

        <p className="text-[#004F62]/80 text-[15px] max-w-xl leading-relaxed">
          {isClient
            ? "Gestiona tus solicitudes, recibe ofertas en tiempo real y encuentra al freelancer ideal."
            : "Supervisa tus propuestas, mejora tu perfil y revisa tus próximas oportunidades."}
        </p>

        <div className="flex gap-4 mt-6">

          {isClient && (
            <Link
              to="/jobrequests/new"
              className="
                px-6 py-3 rounded-full
                bg-[#00E8FF]
                text-[#003647] font-semibold
                shadow-[0_0_20px_rgba(0,232,255,0.55)]
                hover:bg-[#00D2E6] transition
              "
            >
              + Crear solicitud
            </Link>
          )}

          <Link
            to="/offers"
            className="
              px-6 py-3 rounded-full
              border border-[#00E8FF]/40
              bg-white/60 text-[#004F62]
              shadow-sm hover:bg-white/80 transition font-semibold
            "
          >
            Ver ofertas
          </Link>
        </div>
      </header>


      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <InfoCard label="Solicitudes" value={jobRequests.length} />
        <InfoCard label="Ofertas" value={offers.length} />
        <InfoCard label="Notificaciones" value={unreadCount} />
      </div>


      <div className="grid lg:grid-cols-[2fr,1fr] gap-12 mt-10">

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
    <div
      className="
        p-6 rounded-3xl
        bg-white/85 backdrop-blur-xl
        border border-[#00E8FF]/20
        shadow-[0_20px_60px_rgba(0,79,98,0.12)]
      "
    >
      <p className="text-xs uppercase tracking-wide text-[#00A6C4]/80">
        {label}
      </p>

      <p className="text-4xl font-title font-bold text-[#003647] mt-1">
        {value}
      </p>
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
        p-7 rounded-3xl
        bg-white/80 backdrop-blur-xl
        border border-[#00E8FF]/15
        shadow-[0_25px_70px_rgba(0,79,98,0.10)]
      "
    >
      <h2 className="font-title text-2xl font-bold text-[#003647] mb-3">
        {title}
      </h2>

      {isEmpty ? (
        <p className="text-[#004F62]/70 text-sm">{empty}</p>
      ) : (
        <div className="space-y-4">{children}</div>
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
        border border-[#00E8FF]/20
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
        border border-[#00E8FF]/20
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
    <div
      className="
        bg-white/90 backdrop-blur-xl
        rounded-3xl border border-[#00E8FF]/20
        p-6 shadow-[0_20px_60px_rgba(0,79,98,0.12)]
      "
    >
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
    <div
      className="
        bg-white/90 backdrop-blur-xl
        rounded-3xl border border-[#00E8FF]/20
        p-6 shadow-[0_20px_60px_rgba(0,79,98,0.12)]
      "
    >
      <h3 className="font-title text-xl text-[#003647]">Notificaciones</h3>
      <p className="text-[#004F62]/70 text-sm mt-2">
        Tienes <span className="font-semibold">{count}</span> sin leer
      </p>

      <Link
        to="/notifications"
        className="text-[#00A6C4] text-sm mt-4 inline-block font-semibold hover:underline"
      >
        Ver todas →
      </Link>
    </div>
  )
}
