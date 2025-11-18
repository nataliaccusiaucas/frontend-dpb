import { useEffect, useMemo, useState } from "react"
import { listAllCommissions, markCommissionAsPaid } from "./api"
import type { Commission } from "./types"
import { useToast } from "../../components/ui/Toaster"

const months = [
  "Todos",
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

export function CommissionsList() {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState<number | 0>(0) // 0 = todos
  const { toast } = useToast()

  useEffect(() => {
    listAllCommissions().then(data => {
      setCommissions(data)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    if (selectedMonth === 0) return commissions
    return commissions.filter(c => {
      const date = new Date(c.createdAt)
      return date.getMonth() + 1 === selectedMonth
    })
  }, [commissions, selectedMonth])

  const totals = useMemo(() => {
    const total = filtered.reduce((sum, c) => sum + c.amount, 0)
    const pending = filtered
      .filter(c => c.status === "PENDING")
      .reduce((sum, c) => sum + c.amount, 0)
    const paid = filtered
      .filter(c => c.status === "PAID")
      .reduce((sum, c) => sum + c.amount, 0)
    return { total, pending, paid }
  }, [filtered])

  const handleMarkPaid = async (id: string) => {
    try {
      const updated = await markCommissionAsPaid(id)
      setCommissions(prev =>
        prev.map(c => (c.id === id ? { ...c, status: updated.status } : c))
      )
      toast("Comisión marcada como pagada")
    } catch {
      toast("Error al actualizar la comisión")
    }
  }

  return (
    <section className="max-w-6xl mx-auto mt-8 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#E4FCFF]">Comisiones</h1>
          <p className="text-gray-300 text-sm">
            Panel de administración de comisiones de HireHub
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-[#E4FCFF] text-sm">Mes:</label>
          <select
            className="bg-[#070707]/80 border border-[#00E8FF]/30 text-[#E4FCFF] px-3 py-2 rounded-lg"
            value={selectedMonth}
            onChange={e => setSelectedMonth(Number(e.target.value))}
          >
            {months.map((m, idx) => (
              <option key={idx} value={idx}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
          <p className="text-gray-300 text-sm">Total comisiones</p>
          <p className="mt-2 text-2xl font-bold text-[#00E8FF]">
            S/ {totals.total.toFixed(2)}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
          <p className="text-gray-300 text-sm">Pendientes</p>
          <p className="mt-2 text-2xl font-bold text-yellow-300">
            S/ {totals.pending.toFixed(2)}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
          <p className="text-gray-300 text-sm">Pagadas</p>
          <p className="mt-2 text-2xl font-bold text-emerald-300">
            S/ {totals.paid.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
        <table className="w-full text-sm text-left text-[#E4FCFF]">
          <thead className="bg-[#070707]/70 border-b border-white/10">
            <tr>
              <th className="px-4 py-3">Trabajo</th>
              <th className="px-4 py-3">Monto</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-300">
                  Cargando…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-center text-gray-300">
                  No hay comisiones para este período.
                </td>
              </tr>
            ) : (
              filtered.map(c => {
                const date = new Date(c.createdAt).toLocaleString()
                const isPending = c.status === "PENDING"

                return (
                  <tr key={c.id} className="border-t border-white/10">
                    <td className="px-4 py-3">{c.jobTitle}</td>
                    <td className="px-4 py-3">S/ {c.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          isPending
                            ? "bg-yellow-400/20 text-yellow-300"
                            : "bg-emerald-400/20 text-emerald-300"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{date}</td>
                    <td className="px-4 py-3 text-right">
                      {isPending && (
                        <button
                          onClick={() => handleMarkPaid(c.id)}
                          className="px-3 py-1 text-xs rounded-lg border border-[#00E8FF]/40 hover:bg-[#00E8FF]/10"
                        >
                          Marcar pagada
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
