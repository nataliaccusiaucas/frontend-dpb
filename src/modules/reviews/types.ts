export type Review = {
  id: string
  authorName: string
  targetName: string
  jobTitle: string
  rating: number
  comment: string
  createdAt: string
}

export type ReviewSummary = {
  averageRating: number
  totalReviews: number
  reviews: Review[]
}