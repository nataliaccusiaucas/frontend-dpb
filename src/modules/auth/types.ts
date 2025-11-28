export type User = {
  id: string
  name: string
  email: string
  role: "CLIENT" | "FREELANCER" | "ADMIN"
  phone?: string
  avatarUrl?: string
  averageRating?: number
  completedJobs?: number
  createdAt?: string
}
