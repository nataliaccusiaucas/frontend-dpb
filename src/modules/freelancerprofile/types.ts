export type FreelancerProfile = {
  id: string
  name: string
  title: string | null
  description: string | null
  skills: string | null
  portfolioUrl: string | null
  location: string | null
  averageRating: number | null
  completedJobs: number
}
