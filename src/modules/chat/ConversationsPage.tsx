import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthContext"
import { listConversations } from "./api"
import type { Conversation } from "./types"
import { Link } from "react-router-dom"

export function ConversationsPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return
    listConversations(user.id).then(data => {
      setItems(data)
      setLoading(false)
    })
  }, [user])

  return (
    <section className="max-w-5xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-title font-bold text-[#003647]">
        Mensajes
      </h1>

      {loading ? (
        <p className="text-[#004F62]">Cargando conversaciones…</p>
      ) : items.length === 0 ? (
        <div className="bg-white/80 rounded-3xl border border-[#00E8FF]/15 p-8 shadow">
          <p className="text-[#004F62] text-sm">
            Aún no tienes conversaciones. Acepta o recibe ofertas para empezar a chatear.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4">
          {items.map(c => (
            <li key={c.id}>
              <Link
                to={`/chat/${c.id}`}
                className="
                  block p-5 rounded-3xl bg-white/85 backdrop-blur-xl
                  border border-[#00E8FF]/15
                  shadow-[0_18px_50px_rgba(0,79,98,0.10)]
                  hover:shadow-[0_24px_60px_rgba(0,79,98,0.15)]
                  transition
                "
              >
                <p className="text-xs text-[#004F62]/70 mb-1">
                  {c.jobTitle}
                </p>
                <p className="font-semibold text-[#003647] text-sm">
                  {c.clientName} ↔ {c.freelancerName}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
