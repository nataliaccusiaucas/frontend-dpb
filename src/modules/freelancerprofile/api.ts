import api from "../../lib/axios"
import type { FreelancerProfile } from "./types"

export async function getFreelancerProfile(freelancerId: string): Promise<FreelancerProfile> {
  const { data } = await api.get(`/api/freelancers/${freelancerId}/profile`)
  return data
}

export async function updateFreelancerProfile(
  freelancerId: string,
  input: {
    title?: string
    description?: string
    skills?: string
    portfolioUrl?: string
    location?: string
  }
): Promise<FreelancerProfile> {
  const { data } = await api.put(`/api/freelancers/${freelancerId}/profile`, input)
  return data
}
