import { Link } from "react-router-dom"
import { useAuth } from "../modules/auth/AuthContext"

type Project = {
  id: number
  title: string
  description: string
  status: "En curso" | "Pendiente" | "Completado"
  progress: number
  dueDate: string
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Landing page para fintech",
    description: "Diseño y desarrollo de landing responsive con formulario de contacto.",
    status: "En curso",
    progress: 65,
    dueDate: "2025-02-10",
  },
  {
    id: 2,
    title: "Rediseño de logo y branding",
    description: "Actualización del logo y manual de marca para e-commerce.",
    status: "Pendiente",
    progress: 20,
    dueDate: "2025-02-18",
  },
  {
    id: 3,
    title: "Campaña de anuncios Meta Ads",
    description: "Configuración de campañas, segmentación y piezas gráficas.",
    status: "En curso",
    progress: 45,
    dueDate: "2025-02-25",
  },
]

const deadlines = [
  { day: 5, label: "Entrega copy campaña" },
  { day: 10, label: "Revisión landing fintech" },
  { day: 18, label: "Entrega branding" },
  { day: 25, label: "Cierre campaña Meta Ads" },
]

export function Dashboard() {
  const { user } = useAuth()

  const completed = mockProjects.filter(p => p.progress === 100).length
  const inProgress = mockProjects.filter(p => p.progress > 0 && p.progress < 100).length
  const pending = mockProjects.filter(p => p.progress === 0).length

  return (
    <div className="pb-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#004F62]/60 font-body">
            PANEL GENERAL
          </p>
          <h1 className="text-2xl md:text-3xl font-title font-bold text-[#070707]">
            Hola, {user?.email?.split("@")[0] || "freelancer"} 👋
          </h1>
          <p className="text-sm text-[#004F62]/80 font-body mt-1">
            Revisa el estado de tus proyectos, plazos y solicitudes en un solo lugar.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-xs md:text-sm font-body">
          <Link
            to="/jobrequests/new"
            className="px-4 py-2 rounded-full bg-[#00E8FF] text-[#070707] font-semibold shadow-[0_10px_30px_rgba(0,232,255,0.4)] hover:bg-[#00C6E0] transition"
          >
            + Nueva solicitud
          </Link>
          <Link
            to="/offers"
            className="px-4 py-2 rounded-full border border-[#00E8FF]/40 bg-white/60 text-[#004F62] hover:bg-[#E4FCFF] transition"
          >
            Ver ofertas
          </Link>
        </div>
      </div>

      {/* LAYOUT PRINCIPAL */}
      <div className="grid lg:grid-cols-[2.1fr,1.1fr] gap-8">
        {/* COLUMNA IZQUIERDA – PROYECTOS */}
        <div className="space-y-6">
          {/* Resumen rápido */}
          <div className="grid sm:grid-cols-3 gap-4">
            <SummaryCard
              label="En curso"
              value={inProgress}
              pill="Activos"
            />
            <SummaryCard
              label="Completados"
              value={completed}
              pill="Finalizados"
            />
            <SummaryCard
              label="Pendientes"
              value={pending}
              pill="Por iniciar"
            />
          </div>

          {/* Lista de proyectos */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-[#00E8FF]/15 shadow-[0_20px_60px_rgba(0,79,98,0.12)] p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-title text-lg md:text-xl text-[#070707]">
                  Mis proyectos
                </h2>
                <p className="text-xs md:text-sm text-[#004F62]/70 font-body">
                  Basado en tus solicitudes y ofertas recientes.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {mockProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA – PROGRESO / CALENDARIO / PLAZOS */}
        <div className="space-y-6">
          <ProgressWidget projects={mockProjects} />

          <MiniCalendar monthLabel="Febrero 2025" deadlines={deadlines} />

          <DeadlinesList deadlines={deadlines} />
        </div>
      </div>
    </div>
  )
}

/* ---------- COMPONENTES PEQUEÑOS DENTRO DEL MISMO FILE ---------- */

type SummaryCardProps = {
  label: string
  value: number
  pill: string
}

function SummaryCard({ label, value, pill }: SummaryCardProps) {
  return (
    <div className="rounded-2xl bg-white/80 border border-[#00E8FF]/20 shadow-[0_14px_40px_rgba(0,79,98,0.08)] p-4 flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[#004F62]/60 font-body">
        {pill}
      </span>
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-title text-[#070707]">{value}</p>
        <span className="text-xs text-[#004F62]/70 font-body">{label}</span>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl bg-[#E4FCFF] border border-[#00E8FF]/20 px-4 py-4 md:px-5 md:py-5 flex flex-col gap-3 shadow-[0_10px_30px_rgba(0,79,98,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-title text-base md:text-lg text-[#070707]">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-[#004F62]/80 font-body mt-1">
            {project.description}
          </p>
        </div>
        <span
          className={`
            text-[11px] px-2.5 py-1 rounded-full font-body
            ${
              project.status === "Completado"
                ? "bg-emerald-100 text-emerald-700"
                : project.status === "En curso"
                ? "bg-[#00E8FF]/10 text-[#004F62]"
                : "bg-amber-100 text-amber-700"
            }
          `}
        >
          {project.status}
        </span>
      </div>

      {/* Barra de progreso */}
      <div>
        <div className="flex items-center justify-between text-[11px] text-[#004F62]/70 font-body mb-1">
          <span>Progreso</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-white/70 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#00E8FF]"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#004F62]/70 font-body">
        <span>Entrega estimada</span>
        <span className="font-medium">
          {new Date(project.dueDate).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "short",
          })}
        </span>
      </div>
    </div>
  )
}

function ProgressWidget({ projects }: { projects: Project[] }) {
  const average =
    projects.reduce((acc, p) => acc + p.progress, 0) / projects.length || 0

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-[#00E8FF]/25 shadow-[0_18px_50px_rgba(0,79,98,0.14)] p-5">
      <h3 className="font-title text-base md:text-lg text-[#070707] mb-3">
        Avance general
      </h3>

      <div className="flex items-center gap-4">
        {/* “Gráfico” principal */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-[#E4FCFF]" />
          <div
            className="absolute inset-1 rounded-full bg-[#00E8FF]/20"
          />
          <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center">
            <span className="font-title text-xl text-[#070707]">
              {Math.round(average)}%
            </span>
          </div>
        </div>

        {/* Detalle de barras por proyecto */}
        <div className="flex-1 space-y-2">
          {projects.map(p => (
            <div key={p.id}>
              <div className="flex justify-between text-[11px] text-[#004F62]/70 font-body mb-0.5">
                <span className="truncate max-w-40">{p.title}</span>
                <span>{p.progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#E4FCFF] overflow-hidden">
                <div
                  className="h-full bg-[#00E8FF]"
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type MiniCalendarProps = {
  monthLabel: string
  deadlines: { day: number; label: string }[]
}

function MiniCalendar({ monthLabel, deadlines }: MiniCalendarProps) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  const deadlineDays = new Set(deadlines.map(d => d.day))

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-[#00E8FF]/20 shadow-[0_18px_50px_rgba(0,79,98,0.14)] p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#004F62]/60 font-body">
            CALENDARIO
          </p>
          <h3 className="font-title text-base md:text-lg text-[#070707]">
            {monthLabel}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[11px] font-body text-center text-[#004F62]/70 mb-1">
        <span>L</span>
        <span>M</span>
        <span>M</span>
        <span>J</span>
        <span>V</span>
        <span>S</span>
        <span>D</span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs font-body">
        {days.map(day => {
          const hasDeadline = deadlineDays.has(day)
          return (
            <div
              key={day}
              className={`
                h-8 flex items-center justify-center rounded-full
                ${
                  hasDeadline
                    ? "bg-[#00E8FF] text-[#070707] shadow-[0_0_12px_rgba(0,232,255,0.8)] font-semibold"
                    : "text-[#004F62]/80 hover:bg-[#E4FCFF] cursor-default"
                }
              `}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DeadlinesList({ deadlines }: { deadlines: { day: number; label: string }[] }) {
  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-[#00E8FF]/20 shadow-[0_18px_50px_rgba(0,79,98,0.14)] p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-title text-base md:text-lg text-[#070707]">
          Próximos plazos
        </h3>
      </div>

      <div className="space-y-2">
        {deadlines.map((d, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between text-xs font-body rounded-2xl bg-[#E4FCFF] border border-[#00E8FF]/25 px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#00A6C4] font-semibold">
                {d.day}
              </div>
              <span className="text-[#004F62]/80">{d.label}</span>
            </div>
            <span className="text-[10px] text-[#004F62]/60">
              Este mes
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
