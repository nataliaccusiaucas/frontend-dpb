import { useEffect, useState } from "react"
import { listAllCommissions } from "../modules/commissions/api"
import type { Commission } from "../modules/commissions/types"

export function CommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([])

  useEffect(() => {
    listAllCommissions().then(setCommissions)
  }, [])

  return (
    <div className="p-6">
      <h1 className="font-title text-2xl mb-4">Comisiones</h1>

      <div className="grid gap-4">
        {commissions.map(c => (
          <div
            key={c.id}
            className="p-4 rounded-xl bg-white shadow border border-[#00E8FF]/20"
          >
            <p><strong>Trabajo:</strong> {c.jobTitle}</p>
            <p><strong>Monto:</strong> S/{c.amount}</p>
            <p><strong>Estado:</strong> {c.status}</p>
            <p><strong>Fecha:</strong> {new Date(c.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
