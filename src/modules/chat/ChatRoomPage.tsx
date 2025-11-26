import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { listMessages, sendMessage } from "./api"
import type { Message } from "./types"

export function ChatRoomPage() {
  const { conversationId } = useParams()
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(true)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  async function load() {
    if (!conversationId) return
    setLoading(true)
    const data = await listMessages(conversationId)
    setMessages(data)
    setLoading(false)
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    load()
    const int = setInterval(load, 5000)
    return () => clearInterval(int)
  }, [conversationId])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim() || !conversationId) return

    const newMsg = await sendMessage(conversationId, user.id, text.trim())
    setMessages(prev => [...prev, newMsg])
    setText("")
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50)
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 flex flex-col h-[70vh] bg-white/85 rounded-3xl border border-[#00E8FF]/15 shadow-[0_20px_60px_rgba(0,79,98,0.12)] overflow-hidden">
      
      <div className="px-6 py-4 border-b border-[#00E8FF]/15 bg-[#F8FEFF]">
        <h1 className="text-lg font-title text-[#003647]">
          Chat del proyecto
        </h1>
        <p className="text-xs text-[#004F62]/70">
          Coordina entregables, plazos y dudas con tu contraparte.
        </p>
      </div>

      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {loading ? (
          <p className="text-[#004F62] text-sm text-center mt-4">Cargando mensajes…</p>
        ) : messages.length === 0 ? (
          <p className="text-[#004F62]/70 text-sm text-center mt-4">
            Aún no hay mensajes. Escribe el primero.
          </p>
        ) : (
          messages.map(m => {
            const isMe = m.senderId === user.id
            return (
              <div
                key={m.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[70%] px-3 py-2 rounded-2xl text-sm
                    ${isMe
                      ? "bg-[#00E8FF] text-[#070707] rounded-br-sm"
                      : "bg-[#E4FCFF] text-[#003647] rounded-bl-sm"
                    }
                  `}
                >
                  {!isMe && (
                    <p className="text-[10px] font-semibold text-[#004F62]/80 mb-0.5">
                      {m.senderName}
                    </p>
                  )}
                  <p>{m.content}</p>
                  <p className="text-[9px] text-black/40 mt-1">
                    {new Date(m.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="border-t border-[#00E8FF]/15 bg-white px-4 py-3 flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded-full bg-[#F8FEFF] border border-[#00E8FF]/20 text-sm text-[#003647] focus:outline-none focus:border-[#00E8FF]"
          placeholder="Escribe un mensaje..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-[#00E8FF] text-sm font-semibold text-[#070707] shadow-[0_10px_25px_rgba(0,232,255,0.4)] hover:bg-[#00C6E0] transition"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
