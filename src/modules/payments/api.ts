import api from "../../lib/axios";

export async function payCommissionInvoice({
  email,
  amount,
  cardToken
}: {
  email: string;
  amount: number;
  cardToken: string;
}) {
  const body = {
    email,
    amount: amount * 100,
    sourceId: cardToken,
  };

  const { data } = await api.post("/payments/charge", body);
  return data;
}
