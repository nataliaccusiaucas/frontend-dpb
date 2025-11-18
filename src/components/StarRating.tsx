import { useState } from "react"

export function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = hover !== null ? star <= hover : star <= value

        return (
          <svg
            key={star}
            onMouseEnter={() => onChange && setHover(star)}
            onMouseLeave={() => onChange && setHover(null)}
            onClick={() => onChange && onChange(star)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={active ? "#00E8FF" : "#444"}
            className={`w-6 h-6 cursor-pointer transition-all duration-200 ${
              active ? "drop-shadow-[0_0_8px_#00E8FF]" : ""
            }`}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
          </svg>
        )
      })}
    </div>
  )
}