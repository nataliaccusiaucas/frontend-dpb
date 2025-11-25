import { useEffect, useState } from "react"
import { getReviewsForFreelancer } from "../modules/reviews/api"
import type { Review } from "../modules/reviews/types"
import { useAuth } from "../modules/auth/AuthContext"

export function ReviewsPage() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    getReviewsForFreelancer(user.id).then(setReviews)
  }, [])

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">

      <h1 className="text-3xl font-title text-[#070707]">Mis Reseñas</h1>

      {reviews.length === 0 && (
        <p className="text-[#004F62]">Aún no tienes reseñas.</p>
      )}

      {reviews.map(r => (
        <div key={r.id} className="p-6 rounded-3xl bg-[#E4FCFF] border border-[#00E8FF]/20">
          <p className="text-[#004F62]">{r.comment}</p>
          <p className="text-sm text-[#00A6C4] mt-2">⭐ {r.rating} — {r. authorName}</p>
        </div>
      ))}
    </div>
  )
}
