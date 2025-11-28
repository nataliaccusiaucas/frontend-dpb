import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createJobRequest } from "./api"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../components/ui/Toaster"
import { useAuth } from "../auth/AuthContext"

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  budget: z.number().positive(),
  categories: z.array(z.string()).min(1, "Selecciona al menos una categoría")
})

type FormValues = z.infer<typeof schema>

const CATEGORIES = [
  "Programación web",
  "Móvil / Apps",
  "Diseño gráfico",
  "Marketing",
  "Community Manager",
  "Data / Analytics",
  "UX/UI",
  "Otro",
]

export function JobRequestForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue} =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { 
        title: "", 
        description: "", 
        budget: 0,
        categories: []
      }
    })

  const { user } = useAuth()
  if (!user) return null

  const navigate = useNavigate()
  const { toast } = useToast()

  const onSubmit = async (values: FormValues) => {
    try {
      await createJobRequest({
        ...values,
        clientId: user.id!
      })
      toast("Solicitud creada")
      navigate("/jobrequests")
    } catch (e) {
      console.error(e)
      toast("Error al crear la solicitud")
    }
  }

  return (
    <div className="
      max-w-2xl mx-auto mt-12 p-10 rounded-3xl
      bg-white/80 backdrop-blur-xl
      border border-[#00E8FF]/15
      shadow-[0_20px_60px_rgba(0,79,98,0.12)]
    ">
      <h1 className="text-4xl font-title font-bold text-[#003647] mb-8">
        Nueva Solicitud
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <div>
          <label className="text-sm text-[#004F62]">Título</label>
          <input
            className="w-full px-4 py-2 rounded-xl bg-white border border-[#00E8FF]/20 focus:border-[#00E8FF] text-[#070707] shadow-sm transition"
            {...register("title")}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="text-sm text-[#004F62]">Descripción</label>
          <textarea
            rows={4}
            className="w-full px-4 py-2 rounded-xl bg-white border border-[#00E8FF]/20 focus:border-[#00E8FF] text-[#070707] shadow-sm transition"
            {...register("description")}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="text-sm text-[#004F62]">Categorías (puedes elegir varias)</label>
            <select multiple onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map(o => o.value)
                setValue("categories", selected, { shouldValidate: true })
              }}
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#00E8FF]/20 focus:border-[#00E8FF] text-[#070707] shadow-sm transition h-40"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

          {errors.categories && (
            <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-[#004F62]">Presupuesto (S/)</label>
          <input
            type="number"
            step="0.01"
            className="w-full px-4 py-2 rounded-xl bg-white border border-[#00E8FF]/20 focus:border-[#00E8FF] text-[#070707] shadow-sm transition"
            {...register("budget", { valueAsNumber: true })}
          />
          {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full py-3 rounded-full bg-[#00E8FF] text-[#070707] font-semibold shadow-[0_10px_30px_rgba(0,232,255,0.4)] hover:bg-[#00C6E0] transition"
        >
          {isSubmitting ? "Guardando…" : "Crear solicitud"}
        </button>

      </form>
    </div>
  )
}
