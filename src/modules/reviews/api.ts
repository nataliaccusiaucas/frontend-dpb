import api from "../../lib/axios"
import type { Review, ReviewSummary } from "./types"

export async function createReview(input: {
  authorId: string
  targetId: string
  jobRequestId: string
  rating: number
  comment: string
}): Promise<Review> {
  const { data } = await api.post("/api/reviews", input)
  return data
}

export async function getReviewsForFreelancer(freelancerId: string): Promise<Review[]> {
  const { data } = await api.get(`/api/reviews/freelancer/${freelancerId}`)
  return data
}

export async function getReviewSummary(freelancerId: string): Promise<ReviewSummary> {
  const { data } = await api.get(`/api/reviews/freelancer/${freelancerId}/summary`)
  return data
}