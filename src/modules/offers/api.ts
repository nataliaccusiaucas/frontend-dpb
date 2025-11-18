import api from "../../lib/axios"
import type { Offer } from "./types"

// Create Offer
export async function createOffer(input: {
  proposedBudget: number
  proposalText: string
  jobRequestId: string
  freelancerId: string
}): Promise<Offer> {
  const { data } = await api.post("/api/offers", input)
  return data
}

// Get all offers
export async function listOffers(): Promise<Offer[]> {
  const { data } = await api.get("/api/offers")
  return data
}

// Get offers by JobRequest
export async function listOffersByJobRequest(jobRequestId: string): Promise<Offer[]> {
  const { data } = await api.get(`/api/offers/job-request/${jobRequestId}`)
  return data
}

// Get offers by Freelancer
export async function listOffersByFreelancer(freelancerId: string): Promise<Offer[]> {
  const { data } = await api.get(`/api/offers/freelancer/${freelancerId}`)
  return data
}

// Update offer status
export async function updateOfferStatus(offerId: string, status: string): Promise<Offer> {
  const { data } = await api.patch(`/api/offers/${offerId}/status?status=${status}`)
  return data
}

// Get single offer (optional)
export async function getOffer(id: string): Promise<Offer> {
  const { data } = await api.get(`/api/offers/${id}`)
  return data
}
