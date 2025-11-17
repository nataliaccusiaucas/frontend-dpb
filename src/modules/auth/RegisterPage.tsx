import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from './AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '../../components/ui/Toaster'

const schema = z.object({
    name: z.string().min(2, 'Nombre es obligatorio'),
    email: z.string().email(),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirm: z.string().min(6, 'Contraseña es obligatoria')
}).refine((d) => d.password === d.confirm, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm']
})

type FormValues = z.infer<typeof schema>

export function RegisterPage() {
  const { register: reg, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) })

  const { register: registerUser } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  async function onSubmit(values: FormValues) {
    try {
      await registerUser(values.email, values.password, values.name)
      toast('Cuenta creada exitosamente 🎉')
      navigate('/')
    } catch {
      toast('No se pudo registrar la cuenta')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      <div className="
        w-full max-w-md p-8 rounded-3xl
        bg-white/70 backdrop-blur-xl
        border border-gray-200
        shadow-xl
      ">

        <h1 className="text-3xl font-title text-gray-900 mb-6 text-center">
          Crea tu cuenta en{" "}
          <span className="text-[#00C2D8] drop-shadow-[0_0_8px_#00E8FF80]">
            HireHub
          </span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              className="
                w-full px-4 py-2 rounded-lg 
                bg-gray-100 text-gray-900 
                border border-gray-300 
                focus:border-[#00C2D8] focus:ring-1 focus:ring-[#00C2D8]
                outline-none transition
              "
              {...reg('name')}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              className="
                w-full px-4 py-2 rounded-lg 
                bg-gray-100 text-gray-900
                border border-gray-300 
                focus:border-[#00C2D8] focus:ring-1 focus:ring-[#00C2D8]
                outline-none transition
              "
              {...reg('email')}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="
                w-full px-4 py-2 rounded-lg 
                bg-gray-100 text-gray-900
                border border-gray-300 
                focus:border-[#00C2D8] focus:ring-1 focus:ring-[#00C2D8]
                outline-none transition
              "
              {...reg('password')}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="
                w-full px-4 py-2 rounded-lg 
                bg-gray-100 text-gray-900
                border border-gray-300 
                focus:border-[#00C2D8] focus:ring-1 focus:ring-[#00C2D8]
                outline-none transition
              "
              {...reg('confirm')}
            />
            {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm.message}</p>}
          </div>

          <button
            disabled={isSubmitting}
            className="
              w-full py-2 rounded-lg 
              bg-[#00E8FF] text-black font-semibold
              shadow-[0_0_12px_#00E8FF80]
              hover:bg-[#00C2D8] transition 
              disabled:opacity-50
            "
          >
            {isSubmitting ? 'Creando…' : 'Crear cuenta'}
          </button>

        </form>

        <p className="text-sm text-gray-700 mt-4 text-center">
          ¿Ya tienes cuenta?{" "}
          <Link className="text-[#00C2D8]" to="/login">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
