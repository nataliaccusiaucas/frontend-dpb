import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createOffer } from "./api"
import { useToast } from "../../components/ui/Toaster"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"

const schema = z.object({
  proposedBudget: z.number().positive(),
  proposalText: z.string().min(5)
})

type FormValues = z.infer<typeof schema>

export function OfferForm() {
  const { jobRequestId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors, isSubmitting }} =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { proposedBudget: 0, proposalText: "" }
    })

  const onSubmit = async (values: FormValues) => {
    try {
      await createOffer({
        proposedBudget: values.proposedBudget,
        proposalText: values.proposalText,
        jobRequestId: jobRequestId!,
        freelancerId: user.id
      })

      toast("Oferta enviada con éxito ✨")
      navigate(-1)
    } catch {
      toast("Error al enviar la oferta")
    }
  }

  return (
    <div
      className="
        max-w-xl mx-auto mt-10 p-10 rounded-3xl
        bg-white/85 backdrop-blur-xl
        border border-[#00E8FF]/15
        shadow-[0_20px_60px_rgba(0,79,98,0.12)]
      "
    >
      <h1 className="text-3xl font-title font-bold text-[#003647] mb-8">
        Enviar oferta
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* PRESUPUESTO */}
        <div>
          <label className="text-sm text-[#004F62]/90">Presupuesto propuesto (S/)</label>
          <input
            type="number"
            step="0.01"
            className="
              w-full px-4 py-2 rounded-xl
              bg-white border border-[#00E8FF]/25
              focus:border-[#00E8FF]
              text-[#070707] shadow-sm transition
            "
            {...register("proposedBudget", { valueAsNumber: true })}
          />
          {errors.proposedBudget && (
            <p className="text-red-500 mt-1 text-sm">{errors.proposedBudget.message}</p>
          )}
        </div>

        {/* PROPUESTA */}
        <div>
          <label className="text-sm text-[#004F62]/90">Propuesta</label>
          <textarea
            rows={4}
            className="
              w-full px-4 py-2 rounded-xl
              bg-white border border-[#00E8FF]/25
              focus:border-[#00E8FF]
              text-[#070707] shadow-sm transition
            "
            {...register("proposalText")}
          />
          {errors.proposalText && (
            <p className="text-red-500 mt-1 text-sm">{errors.proposalText.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="
            w-full py-3 rounded-xl
            bg-[#00E8FF] text-[#070707] font-semibold
            shadow-[0_10px_30px_rgba(0,232,255,0.4)]
            hover:bg-[#00C6E0] transition
          "
        >
          {isSubmitting ? "Enviando…" : "Enviar oferta"}
        </button>

      </form>
    </div>
  )
}
