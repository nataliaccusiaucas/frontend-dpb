import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createJobRequest } from "./api"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../components/ui/Toaster"
import { useAuth } from "../../modules/auth/AuthContext"

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  budget: z.number().positive(),
  category: z.string().optional()
})

type FormValues = z.infer<typeof schema>

export function JobRequestForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }} =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { title: "", description: "", budget: 0, category: "" }
    })

  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const onSubmit = async (values: FormValues) => {
    try {
      await createJobRequest({
        ...values,
        clientId: user.id
      })
      toast("Solicitud creada")
      navigate("/jobrequests")
    } catch {
      toast("Error al crear la solicitud")
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl">
      <h1 className="text-3xl font-semibold text-[#E4FCFF] mb-5">
        Nueva Solicitud
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <label className="text-[#E4FCFF] text-sm">Título</label>
          <input
            className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 text-[#E4FCFF]"
            {...register("title")}
          />
          {errors.title && <p className="text-red-400">{errors.title.message}</p>}
        </div>

        <div>
          <label className="text-[#E4FCFF] text-sm">Descripción</label>
          <textarea
            rows={4}
            className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 text-[#E4FCFF]"
            {...register("description")}
          />
          {errors.description && <p className="text-red-400">{errors.description.message}</p>}
        </div>

        <div>
          <label className="text-[#E4FCFF] text-sm">Categoría (opcional)</label>
          <input
            className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 text-[#E4FCFF]"
            {...register("category")}
          />
        </div>

        <div>
          <label className="text-[#E4FCFF] text-sm">Presupuesto (S/)</label>
          <input
            type="number"
            step="0.01"
            className="w-full bg-transparent border border-white/20 rounded-md px-3 py-2 text-[#E4FCFF]"
            {...register("budget", { valueAsNumber: true })}
          />
          {errors.budget && <p className="text-red-400">{errors.budget.message}</p>}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full py-2 rounded-md bg-[#00E8FF] text-black font-semibold hover:bg-[#00d0e6] transition"
        >
          {isSubmitting ? "Guardando…" : "Crear solicitud"}
        </button>
      </form>
    </div>
  )
}
