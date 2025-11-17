import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#070707] text-[#E4FCFF] py-12 mt-20 border-t border-[#004F62]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold tracking-wide">HireHub</h2>
          <p className="mt-3 text-sm text-[#E4FCFF]/80 leading-relaxed">
            Doers for dreamers.
            <br />
            Conectamos talento real con oportunidades reales.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#00E8FF] mb-3">Explorar</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/offers" className="hover:text-[#00E8FF] transition">
                Ofertas
              </a>
            </li>
            <li>
              <a href="/job-requests" className="hover:text-[#00E8FF] transition">
                Solicitudes
              </a>
            </li>
            <li>
              <a href="/freelancers" className="hover:text-[#00E8FF] transition">
                Freelancers
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#00E8FF] mb-3">Para usuarios</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/login" className="hover:text-[#00E8FF] transition">
                Iniciar sesión
              </a>
            </li>
            <li>
              <a href="/register" className="hover:text-[#00E8FF] transition">
                Registrarse
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#00E8FF] transition">
                Sobre HireHub
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[#00E8FF] mb-3">Contacto</h3>
          <ul className="space-y-2 text-sm">
            <li>support@hirehub.com</li>
            <li>Lima, Perú</li>
          </ul>
        </div>
      </div>

      <div className="w-full mt-10 border-t border-[#004F62] pt-6 text-center text-xs text-[#E4FCFF]/60">
        © {new Date().getFullYear()} HireHub. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
