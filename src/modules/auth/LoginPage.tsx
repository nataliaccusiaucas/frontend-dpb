import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from './AuthContext'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useToast } from '../../components/ui/Toaster'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) })

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as any
  const { toast } = useToast()

  async function onSubmit(values: FormValues) {
    try {
      await login(values.email, values.password)
      toast('¡Bienvenido de vuelta!')
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch {
      toast('Correo o contraseña incorrectos')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      <div
        className="
          w-full max-w-md p-8 rounded-3xl
          bg-white/70 backdrop-blur-xl
          border border-gray-200
          shadow-xl
        "
      >

        <h1 className="text-3xl font-title text-gray-900 mb-6 text-center">
          Bienvenido a{" "}
          <span className="text-[#00C2D8] drop-shadow-[0_0_8px_#00E8FF80]">
            HireHub
          </span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
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
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
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
            {isSubmitting ? "Iniciando…" : "Iniciar sesión"}
          </button>

        </form>

        <p className="text-sm text-gray-700 mt-4 text-center">
          ¿Aún no tienes cuenta?{" "}
          <Link className="text-[#00C2D8]" to="/register">
            Regístrate
          </Link>
        </p>

      </div>
    </div>
  )
}
