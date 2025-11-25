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
  <div className="max-w-2xl mx-auto mt-10 
    bg-white/80 backdrop-blur-xl 
    rounded-3xl border border-[#00E8FF]/15 
    shadow-[0_20px_60px_rgba(0,79,98,0.12)] 
    p-8 md:p-10">

    <h1 className="text-3xl md:text-4xl font-title font-bold text-[#070707] mb-8">
      Nueva solicitud
    </h1>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* TÍTULO */}
      <div>
        <label className="text-sm font-body text-[#004F62]">Título</label>
        <input
          className="w-full px-4 py-2 rounded-xl 
          bg-white border border-[#00E8FF]/20 
          focus:border-[#00E8FF] 
          text-[#070707]
          shadow-sm transition"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* DESCRIPCIÓN */}
      <div>
        <label className="text-sm font-body text-[#004F62]">Descripción</label>
        <textarea
          rows={4}
          className="w-full px-4 py-2 rounded-xl 
          bg-white border border-[#00E8FF]/20 
          focus:border-[#00E8FF]
          text-[#070707]
          shadow-sm transition"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* CATEGORÍA */}
      <div>
        <label className="text-sm font-body text-[#004F62]">Categoría</label>
        <select
          {...register("category")}
          className="w-full px-4 py-2 rounded-xl 
          bg-white border border-[#00E8FF]/20 
          focus:border-[#00E8FF] 
          text-[#070707]
          shadow-sm transition"
        >
          <option value="">Selecciona una categoría</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* PRESUPUESTO */}
      <div>
        <label className="text-sm font-body text-[#004F62]">
          Presupuesto (S/)
        </label>
        <input
          type="number"
          step="0.01"
          className="w-full px-4 py-2 rounded-xl 
          bg-white border border-[#00E8FF]/20
          focus:border-[#00E8FF] 
          text-[#070707]
          shadow-sm transition"
          {...register("budget", { valueAsNumber: true })}
        />
        {errors.budget && (
          <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
        )}
      </div>

      {/* BOTÓN */}
      <button
        disabled={isSubmitting}
        className="w-full py-3 rounded-full 
        bg-[#00E8FF] text-[#070707] font-semibold 
        shadow-[0_10px_30px_rgba(0,232,255,0.4)] 
        hover:bg-[#00C6E0] transition"
      >
        {isSubmitting ? "Guardando…" : "Crear solicitud"}
      </button>
    </form>
  </div>
)
}