import { StepsTimeline } from "../components/StepsTimeline";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#E4FCFF] via-white to-[#E4FCFF] text-[#004F62]">
      <section className="relative max-w-6xl mx-auto px-6 pt-32 pb-16 md:pb-24">
        <div className="pointer-events-none select-none absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#00E8FF]/30 blur-3xl opacity-70" />
        <div className="pointer-events-none select-none absolute top-40 -left-20 w-72 h-72 rounded-full bg-[#004F62]/20 blur-3xl opacity-70" />

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
              Publica lo que necesitas, recibe propuestas de profesionales
              verificados y elige con total transparencia. Todo en un solo lugar,
              sin fricciones.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <a
                href="/register"
                className="px-7 py-3 rounded-full bg-[#00E8FF] text-[#070707] font-semibold font-body shadow-[0_12px_40px_rgba(0,232,255,0.45)] hover:bg-[#00C6E0] transition-transform hover:-translate-y-0.5"
              >
                Comenzar ahora
              </a>

              <a
                href="/login"
                className="px-7 py-3 rounded-full border border-[#00E8FF]/60 bg-white/60 backdrop-blur-xl text-[#004F62] font-semibold font-body hover:bg-[#E4FCFF] transition"
              >
                Ya tengo una cuenta
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-xs md:text-sm text-[#004F62]/70 font-body">
              <div className="flex flex-col">
                <span className="font-semibold text-[#004F62]">
                  Match inteligente
                </span>
                <span>Algoritmo de categorías y skills.</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#004F62]">
                  Comisiones claras
                </span>
                <span>5% por proyecto completado.</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#004F62]">
                  Enfocado en LATAM
                </span>
                <span>Precios y pagos pensados para la región.</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto w-full max-w-sm">
              <div className="rounded-4x! bg-white/80 backdrop-blur-2xl border border-[#00E8FF]/20 shadow-[0_24px_80px_rgba(7,7,7,0.18)] p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-[#00A6C4] bg-[#E4FCFF] px-3 py-1 rounded-full">
                    Vista del cliente
                  </span>
                  <span className="text-[10px] text-[#004F62]/60">
                    Ofertas en tiempo real
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-[#004F62]/10 bg-[#F8FEFF] p-3">
                    <p className="text-xs uppercase tracking-wide text-[#004F62]/60 mb-1">
                      SOLICITUD
                    </p>
                    <p className="text-sm font-semibold text-[#070707]">
                      Landing page para startup fintech
                    </p>
                    <p className="text-xs text-[#004F62]/70 mt-1">
                      Presupuesto: <span className="font-semibold">S/ 1,200</span>
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#00E8FF]/30 bg-white p-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-[#070707]">
                        Ana, Frontend Dev
                      </p>
                      <p className="text-xs text-[#004F62]/70">
                        Entrego en 5 días. Incluye versión mobile.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#004F62]/60 mb-1">Propuesta</p>
                      <p className="text-sm font-semibold text-[#00A6C4]">
                        S/ 1,050
                      </p>
                    </div>
                    <button className="text-xs font-semibold text-[#00A6C4] underline">
                      Ver detalles
                    </button>
                  </div>

                  <div className="rounded-2xl border border-[#00E8FF]/30 bg-white p-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-[#070707]">
                        Ana, Frontend Dev
                      </p>
                      <p className="text-xs text-[#004F62]/70">
                        Entrego en 5 días. Incluye versión mobile.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#004F62]/60 mb-1">Propuesta</p>
                      <p className="text-sm font-semibold text-[#00A6C4]">
                        S/ 1,050
                      </p>
                    </div>
                    <button className="text-xs font-semibold text-[#00A6C4] underline">
                      Ver detalles
                    </button>
                  </div>

                  <div className="rounded-2xl border border-[#00E8FF]/30 bg-white p-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-[#070707]">
                        Ana, Frontend Dev
                      </p>
                      <p className="text-xs text-[#004F62]/70">
                        Entrego en 5 días. Incluye versión mobile.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#004F62]/60 mb-1">Propuesta</p>
                      <p className="text-sm font-semibold text-[#00A6C4]">
                        S/ 1,400
                      </p>
                    </div>
                    <button className="text-xs font-semibold text-[#00A6C4] underline">
                      Ver detalles
                    </button>
                  </div>

                  <div className="rounded-2xl border border-[#00E8FF]/30 bg-white p-3 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-[#070707]">
                        Carla, Backend Dev
                      </p>
                      <p className="text-xs text-[#004F62]/70">
                        Entrego 7 días.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#004F62]/60 mb-1">Propuesta</p>
                      <p className="text-sm font-semibold text-[#00A6C4]">
                        S/ 1,100
                      </p>
                    </div>
                    <button className="text-xs font-semibold text-[#00A6C4] underline">
                      Ver detalles
                    </button>
                  </div>

                  <button className="mt-2 w-full text-xs font-semibold text-white bg-[#004F62] rounded-xl py-2 hover:bg-[#003647] transition">
                    Ver todas las ofertas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.25em] text-[#004F62]/60 mb-3">
              PARA CLIENTES Y FREELANCERS
            </p>
            <h2 className="font-title text-2xl md:text-3xl font-bold text-[#070707] mb-3">
              Un flujo simple para trabajar sin fricciones.
            </h2>
            <p className="font-body text-sm md:text-base text-[#004F62]/80 max-w-xl">
              Publicas una necesidad, recibes propuestas, comparas, eliges y pagas
              con total claridad. HireHub se encarga del resto.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-[#00E8FF]/20 shadow-[0_18px_50px_rgba(0,79,98,0.08)] p-5">
            <h3 className="font-title text-lg mb-2 text-[#070707]">
              Match rápido e inteligente
            </h3>
            <p className="font-body text-sm text-[#004F62]/80">
              Sistema de categorías y skills para conectar proyectos con
              freelancers que realmente encajan.
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-[#00E8FF]/20 shadow-[0_18px_50px_rgba(0,79,98,0.08)] p-5">
            <h3 className="font-title text-lg mb-2 text-[#070707]">
              Transparencia y seguridad
            </h3>
            <p className="font-body text-sm text-[#004F62]/80">
              Ofertas claras, historial de reseñas y comisiones visibles desde el
              inicio.
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-[#00E8FF]/20 shadow-[0_18px_50px_rgba(0,79,98,0.08)] p-5">
            <h3 className="font-title text-lg mb-2 text-[#070707]">
              Pensado para crecer contigo
            </h3>
            <p className="font-body text-sm text-[#004F62]/80">
              Desde encargos pequeños hasta proyectos grandes y recurrentes.
              Lleva el seguimiento desde un solo panel.
            </p>
          </div>
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
            <p className="font-body text-sm md:text-base text-[#004F62]/80 max-w-2xl mx-auto">
              Diseñamos un flujo sencillo tanto para clientes como para
              freelancers, para que todos sepan en qué parte del proceso están.
            </p>
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
            description="Identidad visual, logos, banners, presentaciones y piezas creativas para tu marca."
            icon="/icons/diseño.png"
          />
          <CategoryCard
            title="Desarrollo Web & Software"
            description="Sitios web, apps, APIs, integraciones y dashboards para tu negocio."
            icon="/icons/desarrollo web.png"
          />
          <CategoryCard
            title="Marketing Digital"
            description="Gestión de redes, anuncios, SEO, embudos y campañas orientadas a resultados."
            icon="/icons/digital marketing.png"
          />
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-linear-to-r from-[#004F62] via-[#003A4B] to-[#004F62] text-white p-8 md:p-10 shadow-[0_24px_80px_rgba(0,58,75,0.55)] relative overflow-hidden">
          <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full bg-[#00E8FF]/30 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="font-title text-2xl md:text-3xl font-bold mb-2">
                ¿Listo para tu siguiente proyecto?
              </h2>
              <p className="font-body text-sm md:text-base text-[#E4FCFF]/90">
                Regístrate como cliente o freelancer y empieza a construir tu
                próximo caso de éxito hoy mismo.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <a
                href="/register"
                className="px-6 py-3 rounded-full bg-white text-[#004F62] font-semibold font-body hover:bg-[#E4FCFF] transition"
              >
                Crear cuenta
              </a>
              <a
                href="/login"
                className="px-6 py-3 rounded-full border border-[#E4FCFF]/70 text-[#E4FCFF] font-semibold font-body hover:bg-white/10 transition"
              >
                Iniciar sesión
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/** Card pequeña para categorías */
type CategoryCardProps = {
  title: string;
  description: string;
  icon: string;
};

function CategoryCard({ title, description, icon }: CategoryCardProps) {
  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-[#00E8FF]/20 shadow-[0_18px_50px_rgba(0,79,98,0.08)] p-6 flex flex-col gap-3">
      <div className="w-12 h-12 rounded-2xl bg-[#E4FCFF] flex items-center justify-center mb-1 overflow-hidden">
        <img
          src={icon}
          alt={title}
          className="w-8 h-8 object-contain"
        />
      </div>
      <h3 className="font-title text-lg text-[#070707]">{title}</h3>
      <p className="font-body text-sm text-[#004F62]/80">{description}</p>
    </div>
  );
}
