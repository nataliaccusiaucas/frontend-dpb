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
    <div className="
      min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#E4FCFF] via-white to-[#CFF8FF]
      px-4 relative overflow-hidden
    ">

      {/* Burbuja decorativa izquierda */}
      <div className="absolute w-64 h-64 bg-[#00E8FF]/20 blur-3xl rounded-full -top-10 -left-10"></div>

      {/* Burbuja decorativa derecha */}
      <div className="absolute w-72 h-72 bg-[#004F62]/20 blur-3xl rounded-full bottom-0 right-0"></div>

      <div
        className="
          w-full max-w-md p-10 rounded-[2rem]
          bg-white/60 backdrop-blur-2xl 
          border border-white/40 shadow-[0_0_40px_#00E8FF20]
          relative z-10
        "
      >

        <h1 className="text-4xl font-title text-[#004F62] mb-2 text-center">
          Bienvenido
        </h1>

        <p className="text-center text-[#004F62]/70 mb-8">
          Ingresa a tu cuenta de{" "}
          <span className="text-[#00C2D8] font-semibold">
            HireHub
          </span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-[#004F62] mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              className="
                w-full px-4 py-3 rounded-xl 
                bg-white/70 text-[#004F62]
                border border-[#00C2D8]/30
                focus:ring-2 focus:ring-[#00E8FF] focus:border-[#00E8FF]
                shadow-sm outline-none transition
              "
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-[#004F62] mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="
                w-full px-4 py-3 rounded-xl 
                bg-white/70 text-[#004F62]
                border border-[#00C2D8]/30
                focus:ring-2 focus:ring-[#00E8FF] focus:border-[#00E8FF]
                shadow-sm outline-none transition
              "
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* BUTTON */}
          <button
            disabled={isSubmitting}
            className="
              w-full py-3 rounded-xl 
              bg-[#00E8FF] text-black font-semibold
              shadow-[0_0_12px_#00E8FF90]
              hover:bg-[#00C2D8] transition 
              disabled:opacity-50 mt-3
            "
          >
            {isSubmitting ? "Iniciando…" : "Iniciar sesión"}
          </button>

        </form>

        <p className="text-sm text-[#004F62] mt-6 text-center">
          ¿No tienes cuenta?{" "}
          <Link className="text-[#00C2D8] font-medium hover:underline" to="/register">
            Regístrate aquí
          </Link>
        </p>

      </div>
    </div>
  )
}
