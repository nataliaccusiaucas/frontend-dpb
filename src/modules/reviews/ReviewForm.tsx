import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createReview } from "./api"
import { useToast } from "../../components/ui/Toaster"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { StarRating } from "../../components/StarRating"


const schema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(5)
})

type FormValues = z.infer<typeof schema>

export function ReviewForm() {
  const { jobRequestId, freelancerId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors, isSubmitting },watch,
  setValue} =
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
    } catch (e: any) {
      toast("Error al enviar la reseña")
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl">
      <h1 className="text-3xl font-semibold text-[#E4FCFF] mb-5">
        Dejar reseña
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
            <label className="text-[#E4FCFF] text-sm">Puntuación</label>
            <StarRating
                value={watch("rating")}
                onChange={(value) => setValue("rating", value)}
            />
            {errors.rating && <p className="text-red-400">{errors.rating.message}</p>}
            </div>


        <div>
          <label className="text-[#E4FCFF] text-sm">Comentario</label>
          <textarea
            rows={4}
            {...register("comment")}
            className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 text-[#E4FCFF]"
          />
          {errors.comment && <p className="text-red-400">{errors.comment.message}</p>}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full py-2 rounded-md bg-[#00E8FF] text-black font-semibold hover:bg-[#00d0e6] transition"
        >
          {isSubmitting ? "Enviando…" : "Enviar reseña"}
        </button>
      </form>
    </div>
  )
}
