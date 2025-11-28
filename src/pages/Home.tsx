import { StepsTimeline } from "../components/StepsTimeline"
import { OfferCard } from "../components/OfferCard"

const mockOffers = [
  {
    id: "1",
    proposedBudget: 1050,
    proposalText: "Puedo desarrollar la landing en React...",
    freelancerName: "Ana Martínez",
    freelancerTitle: "Frontend Developer",
    freelancerDescription:
      "4 años de experiencia en React, Tailwind y UI moderna. Enfoque en performance y accesibilidad.",
    freelancerSkills: "React, Tailwind, Figma, Responsive, SEO",
    freelancerPortfolioUrl: "https://dribbble.com",
    freelancerLocation: "Lima, Perú",
  },
  {
    id: "2",
    proposedBudget: 980,
    proposalText: "Trabajo rápido y con buenas prácticas...",
    freelancerName: "Carla Ruiz",
    freelancerTitle: "UI/UX Designer",
    freelancerDescription:
      "3 años diseñando interfaces para apps y webs. Experiencia en flujos de usuario y prototipado.",
    freelancerSkills: "Figma, UX Writing, Design Systems",
    freelancerPortfolioUrl: "https://behance.net",
    freelancerLocation: "Cusco, Perú",
  },
  {
    id: "3",
    proposedBudget: 1400,
    proposalText: "Puedo entregar versión admin adicional...",
    freelancerName: "Luis Hernández",
    freelancerTitle: "Fullstack Developer",
    freelancerDescription:
      "6 años de experiencia con React, Node y PostgreSQL. Especialista en arquitectura limpia.",
    freelancerSkills: "React, Node, SQL, Docker, Clean Architecture",
    freelancerPortfolioUrl: "https://github.com",
    freelancerLocation: "Arequipa, Perú",
  },
  {
    id: "4",
    proposedBudget: 1100,
    proposalText: "Incluye documentación y deploy...",
    freelancerName: "Daniela Robles",
    freelancerTitle: "Backend Developer",
    freelancerDescription:
      "5 años trabajando con Spring Boot y microservicios. Experta en APIs escalables.",
    freelancerSkills: "Spring Boot, PostgreSQL, AWS, Microservicios",
    freelancerPortfolioUrl: "https://github.com",
    freelancerLocation: "Trujillo, Perú",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#E4FCFF] via-white to-[#E4FCFF] text-[#004F62]">

      <section className="relative max-w-6xl mx-auto px-6 pt-32 pb-16 md:pb-24">
        <div className="pointer-events-none absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#00E8FF]/30 blur-3xl opacity-70" />
        <div className="pointer-events-none absolute top-40 -left-20 w-72 h-72 rounded-full bg-[#004F62]/20 blur-3xl opacity-70" />

        <div className="grid md:grid-cols-[1.2fr,1fr] gap-10 items-center relative z-10">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-[#004F62]/70 mb-4 font-medium">
              DOERS FOR DREAMERS
            </p>

            <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#070707]">
              Encuentra al{" "}
              <span className="text-[#00A6C4]">freelancer ideal</span>{" "}
              para tu próximo proyecto.
            </h1>

            <p className="font-body text-base md:text-lg text-[#004F62]/80 max-w-xl mb-8">
              Publica lo que necesitas, recibe propuestas de profesionales verificados y elige con transparencia.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <a
                href="/register"
                className="px-7 py-3 rounded-full bg-[#00E8FF] text-[#070707] font-semibold shadow-[0_12px_40px_rgba(0,232,255,0.45)] hover:bg-[#00C6E0]"
              >
                Comenzar ahora
              </a>

              <a
                href="/login"
                className="px-7 py-3 rounded-full border border-[#00E8FF]/60 bg-white/60 backdrop-blur-xl text-[#004F62] font-semibold hover:bg-[#E4FCFF]"
              >
                Ya tengo una cuenta
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-[#004F62]/70">
              <div className="flex flex-col">
                <span className="font-semibold text-[#004F62]">Match inteligente</span>
                <span>Algoritmo de categorías y skills.</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#004F62]">Comisiones claras</span>
                <span>5% por proyecto completado.</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#004F62]">Enfocado en LATAM</span>
                <span>Precios pensados para la región.</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto w-full max-w-2xl">
              <div className="rounded-4xl bg-white/80 backdrop-blur-2xl border border-[#00E8FF]/20 shadow-[0_24px_80px_rgba(7,7,7,0.18)] p-5">

                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-[#00A6C4] bg-[#E4FCFF] px-3 py-1 rounded-full">
                    Vista del cliente
                  </span>
                  <span className="text-[10px] text-[#004F62]/60">Ofertas en tiempo real</span>
                </div>

                <div className="rounded-2xl border border-[#004F62]/10 bg-[#F8FEFF] p-3 mb-4">
                  <p className="text-xs uppercase tracking-wide text-[#004F62]/60 mb-1">SOLICITUD</p>
                  <p className="text-sm font-semibold text-[#070707]">Landing page para startup fintech</p>
                  <p className="text-xs text-[#004F62]/70 mt-1">
                    Presupuesto: <span className="font-semibold">S/ 1,200</span>
                  </p>
                </div>

                <div className="space-y-4">
                  {mockOffers.map((offer) => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      onAccept={(id) => console.log("ACEPTAR →", id)}
                      onReject={(id) => console.log("RECHAZAR →", id)}
                    />
                  ))}
                </div>

                <button className="mt-4 w-full text-xs font-semibold text-white bg-[#004F62] rounded-xl py-2 hover:bg-[#003647] transition">
                  Ver todas las ofertas
                </button>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <h2 className="font-title text-2xl md:text-3xl font-bold text-[#070707] mb-3">
          Un flujo simple para trabajar sin fricciones.
        </h2>
        <p className="font-body text-sm md:text-base text-[#004F62]/80 max-w-xl mb-10">
          Publicas una necesidad, recibes propuestas, comparas, eliges y pagas con total claridad.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Match rápido e inteligente"
            description="Sistema de categorías y skills para conectar proyectos con freelancers adecuados."
          />
          <FeatureCard
            title="Transparencia y seguridad"
            description="Ofertas claras, historial de reseñas y comisiones visibles desde el inicio."
          />
          <FeatureCard
            title="Pensado para crecer contigo"
            description="Desde encargos pequeños hasta proyectos grandes y escalables."
          />
        </div>
      </section>

      <section className="bg-white/80 border-y border-[#E4FCFF] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-[0.25em] text-[#004F62]/60 mb-3">
              ¿CÓMO FUNCIONA?
            </p>
            <h2 className="font-title text-2xl md:text-3xl font-bold text-[#070707] mb-4">
              De idea a proyecto terminado en 4 pasos.
            </h2>
          </div>

          <StepsTimeline />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-[#004F62]/60 mb-3">
            CATEGORÍAS DESTACADAS
          </p>
          <h2 className="font-title text-2xl md:text-3xl font-bold text-[#070707] mb-4">
            Donde más suele contratarse en HireHub.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <CategoryCard
            title="Diseño & Branding"
            description="Identidad visual, logos, piezas creativas."
            icon="/icons/diseño.png"
          />
          <CategoryCard
            title="Desarrollo Web & Software"
            description="Sitios web, apps, APIs y dashboards."
            icon="/icons/desarrollo web.png"
          />
          <CategoryCard
            title="Marketing Digital"
            description="SEO, Ads, redes, campañas, embudos."
            icon="/icons/digital marketing.png"
          />
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-linear-to-r from-[#004F62] via-[#003A4B] to-[#004F62] text-white p-8 md:p-10 shadow-[0_24px_80px_rgba(0,58,75,0.55)] relative overflow-hidden">

          <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full bg-[#00E8FF]/30 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="font-title text-2xl md:text-3xl font-bold mb-2">¿Listo para tu siguiente proyecto?</h2>
              <p className="font-body text-sm md:text-base text-[#E4FCFF]/90">
                Regístrate como cliente o freelancer y empieza hoy mismo.
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <a
                href="/register"
                className="px-6 py-3 rounded-full bg-white text-[#004F62] font-semibold hover:bg-[#E4FCFF]"
              >
                Crear cuenta
              </a>
              <a
                href="/login"
                className="px-6 py-3 rounded-full border border-[#E4FCFF]/70 text-[#E4FCFF] font-semibold hover:bg-white/10"
              >
                Iniciar sesión
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-[#00E8FF]/20 shadow-[0_18px_50px_rgba(0,79,98,0.08)] p-5">
      <h3 className="font-title text-lg mb-2 text-[#070707]">{title}</h3>
      <p className="font-body text-sm text-[#004F62]/80">{description}</p>
    </div>
  )
}

type CategoryCardProps = {
  title: string
  description: string
  icon: string
}

function CategoryCard({ title, description, icon }: CategoryCardProps) {
  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-[#00E8FF]/20 shadow-[0_18px_50px_rgba(0,79,98,0.08)] p-6 flex flex-col gap-3">
      <div className="w-12 h-12 rounded-2xl bg-[#E4FCFF] flex items-center justify-center mb-1 overflow-hidden">
        <img src={icon} alt={title} className="w-8 h-8 object-contain" />
      </div>
      <h3 className="font-title text-lg text-[#070707]">{title}</h3>
      <p className="font-body text-sm text-[#004F62]/80">{description}</p>
    </div>
  )
}
