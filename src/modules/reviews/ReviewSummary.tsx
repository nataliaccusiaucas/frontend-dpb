import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getReviewSummary } from "./api"
import type { ReviewSummary } from "./types"
import { StarRating } from "../../components/StarRating"


export function ReviewSummaryBlock() {
  const { freelancerId } = useParams()
  const [summary, setSummary] = useState<ReviewSummary | null>(null)

  useEffect(() => {
    if (freelancerId) getReviewSummary(freelancerId).then(setSummary)
  }, [freelancerId])

  if (!summary) return null

  return (
    <div className="mt-6 p-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
      <h2 className="text-[#E4FCFF] text-xl font-bold">Reseñas</h2>

      <p className="text-[#00E8FF] text-lg font-semibold">
        {summary.averageRating.toFixed(1)} ★
      </p>

      <p className="text-gray-300 text-sm mb-4">
        {summary.totalReviews} reseñas
      </p>

      {summary.reviews.slice(0, 3).map(r => (
        <div key={r.id} className="border-t border-white/10 pt-3 mt-3">
          <p className="text-[#E4FCFF]">{r.authorName}</p>
          <p className="text-[#00E8FF]">{r.rating} ★</p>
          <p className="text-gray-300 text-sm mt-1">{r.comment}</p>
          <p className="text-[#00E8FF] text-lg font-semibold flex items-center gap-2">
            <StarRating value={summary.averageRating} />
            {summary.averageRating.toFixed(1)} ★
            </p>
        </div>
      ))}
    </div>
  )
}