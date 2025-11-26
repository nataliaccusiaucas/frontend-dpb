export type Commission = {
  id: string
  jobTitle: string
  amount: number
  status: "PENDING" | "PAID" | string
  createdAt: string
}

export type CommissionInvoice = {
  id: string
  freelancerName: string
  amount: number
  issuedAt: string
  dueDate: string
  status: "PENDING" | "PAID" | "OVERDUE" | string
}
