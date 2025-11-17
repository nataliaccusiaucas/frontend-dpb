import { StepsTimeline } from "../components/StepsTimeline";
export default function Home() {
  return (
    <div className="w-full">

    <section className="relative min-h-screen bg-[#070707] text-white flex flex-col items-center justify-center px-6 pt-32 overflow-hidden">
        <img
            src="/logo-h.png"
            alt="HireHub Logo"
            className="
            absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2
            w-[70rem] opacity-10 
            pointer-events-none select-none 
            animate-hero-logo animate-hero-float
            "
        />

        <h1 className="font-title text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8">
          Bienvenido a{" "}
          <span className="text-[#00E8FF] drop-shadow-[0_0_12px_#00E8FF]">
            HireHub
          </span>
        </h1>

        <p className="font-body text-lg md:text-xl text-[#E4FCFF] max-w-2xl text-center mb-12 leading-relaxed">
          Conecta con oportunidades, freelancers y proyectos increíbles. <br />
          Tu plataforma moderna para crecer, trabajar y crear.
        </p>

        <div className="flex gap-6">
          <a
            href="/login"
            className="px-8 py-3 bg-[#00E8FF] text-black rounded-lg font-body font-semibold shadow-[0_0_12px_#00E8FF] hover:bg-[#00C6A6] transition"
          >
            Iniciar sesión
          </a>

          <a
            href="/register"
            className="px-8 py-3 border border-[#00E8FF] text-[#00E8FF] hover:bg-[#00E8FF] hover:text-black rounded-lg font-body font-semibold transition shadow-[0_0_8px_#00E8FF]"
          >
            Regístrate
          </a>
        </div>
      </section>

      <div className="bg-[#070707]">
        <svg
          className="w-full h-16 md:h-24"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#004F62"
            d="M0,160L80,160C160,160,320,160,480,154.7C640,149,800,139,960,144C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>

      <section className="bg-[#004F62] text-white py-20 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <p className="font-body text-sm uppercase tracking-[0.25em] text-[#E4FCFF]/70 mb-3">
              PARA CLIENTES Y FREELANCERS
            </p>
            <h2 className="font-title text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué elegir{" "}
              <span className="text-[#00E8FF] drop-shadow-[0_0_8px_#00E8FF]">
                HireHub
              </span>
              ?
            </h2>
            <p className="font-body text-base md:text-lg text-[#E4FCFF]/80 max-w-2xl mx-auto">
              Creamos un puente seguro entre personas con ideas y quienes
              saben hacerlas realidad. Sin fricción, sin burocracia, con
              total transparencia.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* CARD 1 */}
            <div className="bg-[#070707]/40 border border-[#00E8FF]/30 rounded-2xl p-6 shadow-[0_0_18px_#00E8FF20] hover:-translate-y-1 hover:shadow-[0_0_26px_#00E8FF40] transition">
              <h3 className="font-title text-xl mb-2">
                Match rápido e inteligente
              </h3>
              <p className="font-body text-sm md:text-base text-[#E4FCFF]/85">
                Publica tu necesidad y recibe propuestas de freelancers
                verificados en minutos, no en semanas.
              </p>
            </div>

            <div className="bg-[#070707]/40 border border-[#00E8FF]/30 rounded-2xl p-6 shadow-[0_0_18px_#00E8FF20] hover:-translate-y-1 hover:shadow-[0_0_26px_#00E8FF40] transition">
              <h3 className="font-title text-xl mb-2">
                Transparencia y seguridad
              </h3>
              <p className="font-body text-sm md:text-base text-[#E4FCFF]/85">
                Costos claros desde el inicio y comunicación centralizada dentro de la plataforma.
              </p>
            </div>

            <div className="bg-[#070707]/40 border border-[#00E8FF]/30 rounded-2xl p-6 shadow-[0_0_18px_#00E8FF20] hover:-translate-y-1 hover:shadow-[0_0_26px_#00E8FF40] transition">
              <h3 className="font-title text-xl mb-2">
                Pensado para crecer contigo
              </h3>
              <p className="font-body text-sm md:text-base text-[#E4FCFF]/85">
                Desde pequeños encargos hasta proyectos complejos: organiza,
                compara ofertas y haz seguimiento desde un solo lugar.
              </p>
            </div>
          </div>
        </div>
      </section>
        <section className="bg-white text-[#004F62] py-24 px-6">
        <div className="max-w-6xl mx-auto">
<StepsTimeline />
</div>

        </section>

        {/* SECCIÓN 4 — CATEGORÍAS DE SERVICIOS */}
<section className="bg-[#070707] text-white py-24 px-6 relative overflow-hidden">

  {/* Fondo sutil en diagonal */}
  <div className="absolute inset-0 opacity-[0.06] select-none pointer-events-none">
    <img 
      src="/logo-h.png" 
      className="w-full h-full object-cover rotate-12 scale-110"
    />
  </div>

  <div className="max-w-6xl mx-auto relative z-10">

    <div className="text-center mb-16">
      <p className="font-body text-sm uppercase tracking-[0.25em] text-[#E4FCFF]/70 mb-3">
        ESPECIALIDADES DISPONIBLES
      </p>

      <h2 className="font-title text-3xl md:text-4xl font-bold mb-4">
        Encuentra al profesional <span className="text-[#00E8FF] drop-shadow-[0_0_8px_#00E8FF]">ideal</span>
      </h2>

      <p className="font-body text-base md:text-lg text-[#E4FCFF]/80 max-w-2xl mx-auto">
        Desde creatividad hasta ingeniería, HireHub reúne a especialistas listos para competir por tu proyecto.
      </p>
    </div>

    {/* GRID DE CATEGORÍAS */}
    <div className="grid md:grid-cols-3 gap-8">

      {/* CARD 1 */}
      <div className="bg-[#004F62]/30 border border-[#00E8FF]/30 rounded-2xl p-6 shadow-[0_0_20px_#00E8FF20] hover:-translate-y-1 hover:shadow-[0_0_26px_#00E8FF40] transition">
          <img
            src="/icons/diseño.png"
            alt="Branding Icon"
                className="w-14 h-14 mb-4 neon-card-icon"
            />

        <h3 className="font-title text-xl mb-2 text-white">Diseño & Branding</h3>
        <p className="font-body text-[#E4FCFF]/80">
          Identidad visual, logos, diseño publicitario y contenido creativo para marcas modernas.
        </p>
      </div>

      {/* CARD 2 */}
      <div className="bg-[#004F62]/30 border border-[#00E8FF]/30 rounded-2xl p-6 shadow-[0_0_20px_#00E8FF20] hover:-translate-y-1 hover:shadow-[0_0_26px_#00E8FF40] transition">
          <img
                src="/icons/desarrollo web.png"
                alt="Branding Icon"
                className="w-14 h-14 mb-4 neon-card-icon"
            />
        <h3 className="font-title text-xl mb-2 text-white">Desarrollo Web & Software</h3>
        <p className="font-body text-[#E4FCFF]/80">
          Sitios web, aplicaciones, APIs, integración de sistemas y soluciones empresariales.
        </p>
      </div>

      {/* CARD 3 */}
      <div className="bg-[#004F62]/30 border border-[#00E8FF]/30 rounded-2xl p-6 shadow-[0_0_20px_#00E8FF20] hover:-translate-y-1 hover:shadow-[0_0_26px_#00E8FF40] transition">
          <img
                src="/icons/digital marketing.png"
                alt="Branding Icon"
                className="w-14 h-14 mb-4 neon-card-icon"
            />
        <h3 className="font-title text-xl mb-2 text-white">Marketing Digital</h3>
        <p className="font-body text-[#E4FCFF]/80">
          Gestión de redes, campañas, copywriting, SEO, anuncios y estrategias de crecimiento.
        </p>
      </div>

      {/* CARD 4 */}
      <div className="bg-[#004F62]/30 border border-[#00E8FF]/30 rounded-2xl p-6 shadow-[0_0_20px_#00E8FF20] hover:-translate-y-1 hover:shadow-[0_0_26px_#00E8FF40] transition">
          <img
                src="/icons/finanzas.png"
                alt="Branding Icon"
                className="w-14 h-14 mb-4 neon-card-icon"
            />
        <h3 className="font-title text-xl mb-2 text-white">Negocios & Finanzas</h3>
        <p className="font-body text-[#E4FCFF]/80">
          Gestión empresarial, análisis financiero, contabilidad, asesoría y optimización de procesos.
        </p>
      </div>

      {/* CARD 5 */}
      <div className="bg-[#004F62]/30 border border-[#00E8FF]/30 rounded-2xl p-6 shadow-[0_0_20px_#00E8FF20] hover:-translate-y-1 hover:shadow-[0_0_26px_#00E8FF40] transition">
          <img
                src="/icons/asistente.png"
                alt="Branding Icon"
                className="w-14 h-14 mb-4 neon-card-icon"
            />
        <h3 className="font-title text-xl mb-2 text-white">Asistencia Virtual</h3>
        <p className="font-body text-[#E4FCFF]/80">
          Gestión de agendas, soporte administrativo, coordinación y tareas operativas.
        </p>
      </div>

      {/* CARD 6 */}
      <div className="bg-[#004F62]/30 border border-[#00E8FF]/30 rounded-2xl p-6 shadow-[0_0_20px_#00E8FF20] hover:-translate-y-1 hover:shadow-[0_0_26px_#00E8FF40] transition">
          <img
                src="/icons/edicion multimedia.png"
                alt="Branding Icon"
                className="w-14 h-14 mb-4 neon-card-icon"
            />
        <h3 className="font-title text-xl mb-2 text-white">Edición Multimedia</h3>
        <p className="font-body text-[#E4FCFF]/80">
          Edición de video, animación, fotografía, efectos visuales y contenido para redes.
        </p>
      </div>

    </div>
  </div>

</section>

    </div>
  );
}
