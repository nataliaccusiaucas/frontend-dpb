export type JobRequest = {
  id: string
  title: string
  description: string
  budget: number
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  clientId: string
  clientName: string
  createdAt: string
  categories: string[]
}
