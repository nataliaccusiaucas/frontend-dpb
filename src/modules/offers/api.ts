import api from "../../lib/axios"
import type { Offer } from "./types"

export async function createOffer(input: {
  proposedBudget: number
  proposalText: string
  jobRequestId: string
  freelancerId: string
}): Promise<Offer> {
  const { data } = await api.post("/offers", input)
  return data
}

export async function getOffer(id: string): Promise<Offer> {
  const { data } = await api.get(`/offers/${id}`)
  return data
}

export async function listOffers(): Promise<Offer[]> {
  const { data } = await api.get("/offers")
  return data
}

export async function listOffersForClient(clientId: string): Promise<Offer[]> {
  const { data } = await api.get(`/offers/client/${clientId}`)
  return data
}

export async function listOffersByFreelancer(freelancerId: string): Promise<Offer[]> {
  const { data } = await api.get(`/offers/freelancer/${freelancerId}`)
  return data
}

export async function updateOfferStatus(
  offerId: string,
  status: "ACCEPTED" | "REJECTED"
): Promise<Offer> {
  const { data } = await api.patch(`/offers/${offerId}/status`, null, {
    params: { status }
  })
  return data
}