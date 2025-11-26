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

  if (loading)
    return <p className="text-[#004F62] text-center mt-6">Cargando…</p>

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-5">
      {reviews.map(r => (
        <div
          key={r.id}
          className="
            p-5 rounded-2xl
            bg-white/85 backdrop-blur-xl
            border border-[#00E8FF]/15
            shadow-[0_15px_45px_rgba(0,79,98,0.12)]
          "
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[#003647]">{r.authorName}</p>
            <span className="text-[#00A6C4] font-bold">{r.rating} ★</span>
          </div>

          <p className="mt-2 text-[#004F62]/80">{r.comment}</p>

          <p className="text-xs text-[#004F62]/50 mt-2">
            {new Date(r.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}
