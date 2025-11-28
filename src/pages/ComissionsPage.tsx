import { useEffect, useState } from "react"
import { listCommissionsForFreelancer } from "../modules/commissions/api"
import type { Commission } from "../modules/commissions/types"
import { useAuthRequired } from "../modules/auth/useAuthRequired"

export function CommissionsPage() {
  const  user  = useAuthRequired()
  const [commissions, setCommissions] = useState<Commission[]>([])

  useEffect(() => {
    listCommissionsForFreelancer(user.id).then(setCommissions)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-title mb-4">Mis Comisiones</h1>

      <div className="space-y-4">
        {commissions.map(c => (
          <div key={c.id} className="p-4 rounded-xl bg-white shadow border">
            <p className="font-semibold">{c.jobTitle}</p>
            <p className="text-sm text-gray-600">Comisión: S/ {c.amount}</p>
            <p className="text-xs mt-1">Estado: {c.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
