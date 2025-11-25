import { useEffect, useState } from "react"
import { listAllInvoices } from "../modules/commissions/api"
import type { CommissionInvoice } from "../modules/commissions/types"

export function InvoicesPage() {
  const [invoices, setInvoices] = useState<CommissionInvoice[]>([])

  useEffect(() => {
    listAllInvoices().then(setInvoices)
  }, [])

  return (
    <div className="p-6">
      <h1 className="font-title text-2xl mb-4">Facturas</h1>

      <div className="grid gap-4">
        {invoices.map(inv => (
          <div
            key={inv.id}
            className="p-4 rounded-xl bg-white shadow border border-[#00E8FF]/20"
          >
            <p><strong>Freelancer:</strong> {inv.freelancerName}</p>
            <p><strong>Monto:</strong> S/{inv.amount}</p>
            <p><strong>Emitida:</strong> {new Date(inv.issuedAt).toLocaleDateString()}</p>
            <p><strong>Vence:</strong> {new Date(inv.dueDate).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> {inv.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}