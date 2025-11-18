import api from "../../lib/axios"
import type { Commission, CommissionInvoice } from "./types"

export async function listAllCommissions(): Promise<Commission[]> {
  const { data } = await api.get("/api/commissions")
  return data
}

export async function markCommissionAsPaid(id: string): Promise<Commission> {
  const { data } = await api.patch(`/api/commissions/${id}/pay`)
  return data
}

export async function listAllInvoices(): Promise<CommissionInvoice[]> {
  const { data } = await api.get("/api/commission-invoices")
  return data
}

export async function markInvoiceAsPaid(id: string): Promise<CommissionInvoice> {
  const { data } = await api.patch(`/api/commission-invoices/${id}/pay`)
  return data
}
