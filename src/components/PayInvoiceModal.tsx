import { useEffect } from "react";
import { useAuth } from "../modules/auth/AuthContext";
import type { CommissionInvoice } from "../modules/commissions/types";

const MONTHS = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

type Props = {
  invoice: CommissionInvoice;
  onClose: () => void;
  onPaid: () => void;
};

export function PayInvoiceModal({ invoice, onClose, onPaid }: Props) {
  const { user } = useAuth();

  useEffect(() => {
    const scriptExists = document.getElementById("culqi-script");
    if (!scriptExists) {
      const script = document.createElement("script");
      script.id = "culqi-script";
      script.src = "https://checkout.culqi.com/js/v4";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const monthName = invoice.issuedAt
    ? MONTHS[new Date(invoice.issuedAt).getMonth()]
    : "este mes";

  const initPayment = () => {
    if (!window.Culqi) {
      alert("Culqi no está listo todavía.");
      return;
    }

    window.Culqi.publicKey = import.meta.env.VITE_CULQI_PUBLIC_KEY;

    window.Culqi.settings({
      title: "HireHub",
      currency: "PEN",
      amount: Math.round(invoice.amount * 100),
      email: user?.email ?? "",
      modal: true,
    });

    window.Culqi.token = async (token: any) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/charge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          amount: Math.round(invoice.amount * 100),
          sourceId: token.id,
        }),
      });

      const json = await response.json();
      if (json.success) {
        onPaid();
        onClose();
      } else {
        alert("Error al procesar el pago.");
      }
    };

    window.Culqi.open();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-[#F8FEFF] p-8 rounded-3xl shadow-xl w-[420px] border border-[#00E8FF]/30">

        <h2 className="text-2xl font-bold text-[#003647]">Pagar factura</h2>

        <p className="mt-2 text-[#004F62]/80 text-sm">
          Estás a punto de pagar tu factura del mes de:
        </p>

        <p className="mt-1 font-semibold text-[#00A6C4] text-lg">
          {monthName}
        </p>

        <p className="mt-4 text-[#070707] font-semibold text-xl">
          Monto: <span className="text-[#00C2D8]">S/ {invoice.amount.toFixed(2)}</span>
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#00E8FF]/40 text-[#004F62] hover:bg-[#E4FCFF]"
          >
            Cancelar
          </button>

          <button
            onClick={initPayment}
            className="px-5 py-2 rounded-xl bg-[#00E8FF] text-[#070707] font-semibold shadow-md hover:bg-[#00C2D8]"
          >
            Pagar ahora
          </button>
        </div>

      </div>
    </div>
  );
}
