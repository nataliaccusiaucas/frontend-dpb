import { useEffect, useState } from "react"
import { getReviewsForFreelancer } from "./api"
import type { Review } from "./types"
import { useParams } from "react-router-dom"

export function ReviewsList() {
  const { freelancerId } = useParams()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (freelancerId) {
      getReviewsForFreelancer(freelancerId).then(data => {
        setReviews(data)
        setLoading(false)
      })
    }
  }, [freelancerId])

  if (loading) return <p className="text-[#E4FCFF]">Cargando…</p>

  return (
    <div className="mt-6 space-y-4">
      {reviews.map(r => (
        <div
          key={r.id}
          className="p-4 bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl"
        >
          <div className="flex justify-between">
            <p className="text-[#E4FCFF] font-semibold">{r.authorName}</p>
            <p className="text-[#00E8FF] font-bold">{r.rating} ★</p>
          </div>

          <p className="text-gray-200 mt-1">{r.comment}</p>
          <p className="text-gray-400 text-xs mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  )
}