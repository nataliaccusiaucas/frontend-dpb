import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createReview } from "./api"
import { useToast } from "../../components/ui/Toaster"
import { useNavigate, useParams } from "react-router-dom"
import { StarRating } from "../../components/StarRating"
import { useAuthRequired } from "../auth/useAuthRequired"


const schema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(5)
})

type FormValues = z.infer<typeof schema>

export function ReviewForm() {
  const { jobRequestId, freelancerId } = useParams()
  const user  = useAuthRequired()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { rating: 5, comment: "" }
    })

  const onSubmit = async (values: FormValues) => {
    try {
      await createReview({
        authorId: user.id,
        targetId: freelancerId!,
        jobRequestId: jobRequestId!,
        rating: values.rating,
        comment: values.comment
      })

      toast("Reseña enviada correctamente")
      navigate(-1)
    } catch {
      toast("Error al enviar la reseña")
    }
  }

  return (
    <div className="
      max-w-2xl mx-auto mt-12 p-10 
      bg-white/80 backdrop-blur-xl 
      border border-[#00E8FF]/20 
      rounded-3xl shadow-[0_20px_60px_rgba(0,79,98,0.12)]
    ">
      <h1 className="text-4xl font-title font-bold text-[#003647] mb-6">
        Dejar Reseña
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <label className="text-sm text-[#004F62]">Puntuación</label>
          <StarRating
            value={watch("rating")}
            onChange={(v) => setValue("rating", v)}
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-[#004F62]">Comentario</label>
          <textarea
            rows={4}
            className="
              w-full px-4 py-3 rounded-xl 
              bg-white border border-[#00E8FF]/20 
              focus:border-[#00E8FF] 
              text-[#003647]
            "
            {...register("comment")}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm">{errors.comment.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="
            w-full py-3 rounded-full 
            bg-[#00E8FF] text-[#003647] font-semibold
            shadow-[0_10px_30px_rgba(0,232,255,0.4)] 
            hover:bg-[#00C6E0] transition
          "
        >
          {isSubmitting ? "Enviando…" : "Enviar reseña"}
        </button>
      </form>
    </div>
  )
}
