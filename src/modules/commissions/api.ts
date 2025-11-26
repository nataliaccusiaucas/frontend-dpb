import api from "../../lib/axios"
import type { Commission, CommissionInvoice } from "./types"

export async function listAllCommissions(): Promise<Commission[]> {
  const { data } = await api.get("/commissions")
  return data
}

export async function markCommissionAsPaid(id: string): Promise<Commission> {
  const { data } = await api.patch(`/commissions/${id}/pay`)
  return data
}

export async function listCommissionsForFreelancer(
  freelancerId: string
): Promise<Commission[]> {
  const { data } = await api.get(`/commissions/freelancer/${freelancerId}`)
  return data
}

export async function listAllInvoices(): Promise<CommissionInvoice[]> {
  const { data } = await api.get("/commission-invoices")
  return data
}

export async function listInvoicesForFreelancer(
  freelancerId: string
): Promise<CommissionInvoice[]> {
  const { data } = await api.get(`/commission-invoices/freelancer/${freelancerId}`)
  return data
}

export async function markInvoiceAsPaid(id: string): Promise<CommissionInvoice> {
  const { data } = await api.patch(`/commission-invoices/${id}/pay`)
  return data
}
