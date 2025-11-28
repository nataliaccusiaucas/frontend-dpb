import { useEffect, useMemo, useState } from "react";
import { listAllInvoices, markInvoiceAsPaid } from "./api";
import type { CommissionInvoice } from "./types";
import { useToast } from "../../components/ui/Toaster";
import { PayInvoiceModal } from "../../components/PayInvoiceModal";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export function InvoiceList() {
  const [invoices, setInvoices] = useState<CommissionInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<CommissionInvoice | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    listAllInvoices().then((data) => {
      setInvoices(data);
      setLoading(false);
    });
  }, []);

  const totals = useMemo(() => {
    const total = invoices.reduce((s, i) => s + i.amount, 0);
    const pending = invoices.filter(i => i.status === "PENDING").reduce((s, i) => s + i.amount, 0);
    const paid = invoices.filter(i => i.status === "PAID").reduce((s, i) => s + i.amount, 0);
    const overdue = invoices.filter(i => i.status === "OVERDUE").reduce((s, i) => s + i.amount, 0);
    return { total, pending, paid, overdue };
  }, [invoices]);

  const handlePaid = async (id: string) => {
    const updated = await markInvoiceAsPaid(id);
    setInvoices(prev =>
      prev.map(i => (i.id === id ? { ...i, status: updated.status } : i))
    );
    toast("Factura pagada exitosamente");
  };

  return (
    <section className="max-w-6xl mx-auto mt-8 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-[#E4FCFF] drop-shadow-md">
          Facturas de comisión
        </h1>
        <p className="text-gray-300 text-sm">
          Resumen de facturas generadas automáticamente por tus comisiones.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard label="Total facturado" value={totals.total} color="text-[#00E8FF]" />
        <SummaryCard label="Pendiente" value={totals.pending} color="text-yellow-300" />
        <SummaryCard label="Pagado" value={totals.paid} color="text-emerald-300" />
        <SummaryCard label="Vencido" value={totals.overdue} color="text-red-300" />
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg">
        <table className="w-full text-sm text-left text-[#E4FCFF]">
          <thead className="bg-[#070707]/80 border-b border-white/10">
            <tr>
              <th className="px-4 py-3">Mes</th>
              <th className="px-4 py-3">Monto</th>
              <th className="px-4 py-3">Emitida</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-300">
                  Cargando…
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-300">
                  No hay facturas registradas.
                </td>
              </tr>
            ) : (
              invoices.map(inv => {
                const issued = inv.issuedAt
                  ? new Date(inv.issuedAt).toLocaleDateString()
                  : "-";

                const invoiceMonth =
                  inv.issuedAt ? MONTHS[new Date(inv.issuedAt).getMonth()] : "Mes desconocido";

                return (
                  <tr key={inv.id} className="border-t border-white/10">
                    <td className="px-4 py-3">{invoiceMonth}</td>

                    <td className="px-4 py-3">
                      <span className="font-semibold text-[#00E8FF]">
                        S/ {inv.amount.toFixed(2)}
                      </span>
                    </td>

                    <td className="px-4 py-3">{issued}</td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          inv.status === "PAID"
                            ? "bg-emerald-400/20 text-emerald-300"
                            : inv.status === "OVERDUE"
                            ? "bg-red-400/20 text-red-300"
                            : "bg-yellow-400/20 text-yellow-300"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      {inv.status === "PENDING" && (
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="
                            px-3 py-1 text-xs rounded-lg 
                            bg-[#00E8FF] text-[#070707] font-semibold
                            hover:bg-[#00C2D8] shadow
                          "
                        >
                          Pagar factura
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {selectedInvoice && (
        <PayInvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onPaid={async () => {
            await handlePaid(selectedInvoice.id);
            setSelectedInvoice(null);
          }}
        />
      )}
    </section>
  );
}

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg">
      <p className="text-gray-300 text-sm">{label}</p>
      <p className={`mt-2 text-2xl font-bold drop-shadow ${color}`}>
        S/ {value.toFixed(2)}
      </p>
    </div>
  );
}
