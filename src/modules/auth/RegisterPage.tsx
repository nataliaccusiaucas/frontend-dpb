import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../../components/ui/Toaster";

const SKILLS = [
  "Programación web",
  "Móvil / Apps",
  "Diseño gráfico",
  "Marketing Digital",
  "Community Manager",
  "Data / Analytics",
  "UX / UI",
  "Copywriting",
  "Otro",
];

const schema = z
  .object({
    name: z.string().min(2, "Nombre es obligatorio"),
    email: z.string().email("Correo inválido"),
    role: z.enum(["CLIENT", "FREELANCER"]),
    phone: z.string().optional(),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirm: z.string(),
    skills: z.array(z.string()).optional(),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Las contraseñas no coinciden",
  })
  .refine(
    (data) =>
      data.role === "CLIENT" ||
      (data.role === "FREELANCER" &&
        data.skills &&
        data.skills.length > 0),
    {
      path: ["skills"],
      message: "Selecciona al menos una habilidad si eres freelancer",
    }
  );

type FormValues = z.infer<typeof schema>;

export function RegisterPage() {
  const {
    register: reg,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { skills: [] },
  });

  const selectedRole = watch("role");

  const { register: registerUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmit(values: FormValues) {
    try {
      await registerUser(
        values.name,
        values.email,
        values.password,
        values.role,
        values.phone ?? "",
        values.skills ?? []
      );

      toast("Cuenta creada exitosamente");
      navigate("/login");
    } catch (e) {
      console.error(e);
      toast("No se pudo registrar la cuenta");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8feff] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-160 h-160 bg-[#00e8ff33] rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-15%] right-[-15%] w-180 h-180 bg-[#00aacb33] rounded-full blur-[150px] animate-pulse-slow"></div>

      <div
        className="
        w-full max-w-md p-10 rounded-3xl
        bg-white/70 backdrop-blur-xl
        border border-white/40
        shadow-[0_0_25px_#00E8FF40]
      "
      >
        <h1 className="text-3xl font-title text-[#004F62] mb-2 text-center">
          Crea tu cuenta en{" "}
          <span className="text-[#00C2D8] drop-shadow-[0_0_8px_#00E8FF80]">
            HireHub
          </span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="block text-sm text-[#004F62] mb-1">
              Nombre completo
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-white text-[#004F62] border border-gray-300"
              {...reg("name")}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-[#004F62] mb-1">
              Correo electrónico
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-white text-[#004F62] border border-gray-300"
              {...reg("email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-[#004F62] mb-1">
              Tipo de cuenta
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-[#004F62]"
              {...reg("role")}
            >
              <option value="">Selecciona...</option>
              <option value="CLIENT">Cliente (Solicita servicios)</option>
              <option value="FREELANCER">Freelancer (Ofrece servicios)</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {selectedRole === "FREELANCER" && (
            <div>
              <label className="block text-sm text-[#004F62] mb-1">
                Habilidades del freelancer
              </label>

              <select
                multiple
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-[#004F62] h-40"
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map(
                    (o) => o.value
                  );
                  setValue("skills", selected, { shouldValidate: true });
                }}
              >
                {SKILLS.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>

              {errors.skills && (
                <p className="text-red-500 text-sm">{errors.skills.message}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm text-[#004F62] mb-1">Teléfono</label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-white text-[#004F62] border border-gray-300"
              {...reg("phone")}
            />
          </div>

          <div>
            <label className="block text-sm text-[#004F62] mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white text-[#004F62] border border-gray-300"
              {...reg("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-[#004F62] mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-white text-[#004F62] border border-gray-300"
              {...reg("confirm")}
            />
            {errors.confirm && (
              <p className="text-red-500 text-sm">{errors.confirm.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="
              w-full py-3 rounded-lg 
              bg-[#00E8FF] text-[#004F62] font-semibold
              shadow-[0_0_15px_#00E8FF80]
              hover:bg-[#00C2D8] transition 
              disabled:opacity-50
            "
          >
            {isSubmitting ? "Creando…" : "Crear cuenta"}
          </button>
        </form>

        <p className="text-sm text-[#004F62] mt-6 text-center">
          ¿Ya tienes cuenta?{" "}
          <Link className="text-[#00C2D8]" to="/login">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
