import { useEffect, useRef, useState } from "react";

export function StepsTimeline() {
  const refs = useRef<HTMLDivElement[]>([]);
  const [active, setActive] = useState(0);

  const steps = [
    {
      title: "Publica tu solicitud",
      text: "Describe lo que necesitas, define el presupuesto y el plazo.",
      icon: "/icons/formulario.png",
    },
    {
      title: "Recibe y compara ofertas",
      text: "Cotizaciones reales con precio, tiempo y condiciones.",
      icon: "/icons/recibe propuestas.png",
    },
    {
      title: "Contrata con confianza",
      text: "Inicia el trabajo con seguridad y evaluaciones reales.",
      icon: "/icons/contrata.png",
    },
    {
      title: "Finaliza y califica",
      text: "Entrega asegurada y mejora continua en HireHub.",
      icon: "/icons/calificación.png",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));

          if (entry.isIntersecting) {
            setActive(index);
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline-wrapper relative pl-10">

      <div className="timeline-line"></div>

      {steps.map((step, i) => (
        <div
          key={i}
          data-index={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          className="timeline-step"
        >
          <div className={`timeline-dot ${active === i ? "active" : ""}`} />

          <div className={`timeline-card ${active === i ? "active" : ""}`}>
            <div className="flex items-start gap-4">
              <img src={step.icon} className="w-10 h-10" />
              <div>
                <h3 className="font-title text-xl text-[#004F62]">{step.title}</h3>
                <p className="font-body text-[#004F62]/80 mt-1">{step.text}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
