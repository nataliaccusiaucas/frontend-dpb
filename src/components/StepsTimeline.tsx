import { useEffect, useRef, useState } from "react";

export function StepsTimeline() {
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.4 }
    );

    stepRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: "Publica tu solicitud",
      text: "Describe lo que necesitas, define el presupuesto y el plazo. Tu solicitud llega a freelancers verificados al instante.",
      icon: "/icons/formulario.png",
    },
    {
      title: "Recibe y compara ofertas",
      text: "Cotizaciones reales con precio, tiempo y condiciones. Elige la propuesta que mejor encaje con tu proyecto.",
      icon: "/icons/recibe propuestas.png",
    },
    {
      title: "Contrata con confianza",
      text: "Una vez aceptada la oferta, inicia el trabajo con seguridad, seguimiento y evaluaciones reales.",
      icon: "/icons/contrata.png",
    },
  ];

  return (
    <section className="bg-white text-[#004F62] py-24 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.25em] text-[#004F62]/60 mb-3">
            PROCESO SIMPLE Y TRANSPARENTE
          </p>

          <h2 className="font-title text-3xl md:text-4xl font-bold mb-4">
            ¿Cómo funciona <span className="text-[#00BFCB]">HireHub</span>?
          </h2>

          <p className="font-body text-base md:text-lg text-[#004F62]/80">
            Te conectamos con talento real mediante un sistema de ofertas dinámicas,
            claro y sin intermediarios.
          </p>
        </div>

        <div className="timeline relative ml-8">
          <div className="timeline-line"></div>

          {steps.map((step, i) => (
            <div
              key={i}
              data-index={i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="timeline-step"
            >
              <div className={`timeline-dot ${activeIndex === i ? "active" : ""}`}></div>

              <div className={`timeline-card ${activeIndex === i ? "active" : ""}`}>
                <img src={step.icon} className="w-12 h-12 mb-4" />
                <h3 className="font-title text-xl mb-2">{step.title}</h3>
                <p className="font-body text-[#004F62]/80">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}