export type Offer = {
  id: string
  proposedBudget: number
  proposalText: string
  status: "PENDING" | "ACCEPTED" | "REJECTED"

  jobRequestId: string
  jobRequestTitle: string

  freelancerId: string
  freelancerName: string

  createdAt: string
}
