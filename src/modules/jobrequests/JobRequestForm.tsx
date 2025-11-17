import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createJobRequest } from "../../lib/api-jobrequests"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../components/ui/Toaster"

const schema = z.object({
  title: z.string().min(3, "El título es obligatorio."),
  description: z.string().min(10, "La descripción es obligatoria."),
  category: z.string().min(2, "La categoría es obligatoria"),
  budget: z.number().positive("El presupuesto debe ser mayor a cero"),
})

type FormValues = z.infer<typeof schema>

export function JobRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      budget: 0,
    },
  })
  const navigate = useNavigate()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await createJobRequest(values)
      toast("Solicitud creada")
      navigate("/jobrequests")
    } catch (error) {
      console.error(error)
      toast("No se pudo crear la solicitud")
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white border rounded-2xl p-6 shadow">
      <h1 className="text-2xl font-semibold mb-4">Nueva solicitud de servicio</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Título</label>
          <input
            className="w-full border rounded-md px-3 py-2"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">Descripción</label>
          <textarea
            rows={5}
            className="w-full border rounded-md px-3 py-2"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">Categoría</label>
          <input
            className="w-full border rounded-md px-3 py-2"
            {...register("category")}
          />
          {errors.category && (
            <p className="text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">Presupuesto(S/)</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded-md px-3 py-2"
            {...register("budget", { valueAsNumber: true })}
          />
          {errors.budget && (
            <p className="text-sm text-red-600">{errors.budget.message}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white rounded-md py-2 disabled:opacity-50"
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  )
}
