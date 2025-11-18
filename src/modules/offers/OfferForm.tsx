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

      toast("Offer creada correctamente")
      navigate(-1)
    } catch {
      toast("Error al crear la offer")
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl">
      <h1 className="text-3xl font-semibold text-[#E4FCFF] mb-5">
        Enviar oferta
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <label className="text-[#E4FCFF] text-sm">Presupuesto propuesto</label>
          <input
            type="number"
            step="0.01"
            className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 text-[#E4FCFF]"
            {...register("proposedBudget", { valueAsNumber: true })}
          />
          {errors.proposedBudget && <p className="text-red-400">{errors.proposedBudget.message}</p>}
        </div>

        <div>
          <label className="text-[#E4FCFF] text-sm">Propuesta</label>
          <textarea
            rows={4}
            className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 text-[#E4FCFF]"
            {...register("proposalText")}
          />
          {errors.proposalText && <p className="text-red-400">{errors.proposalText.message}</p>}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full py-2 rounded-md bg-[#00E8FF] text-black font-semibold hover:bg-[#00d0e6] transition"
        >
          {isSubmitting ? "Enviando…" : "Enviar oferta"}
        </button>

      </form>
    </div>
  )
}
