import api from "../../lib/axios"
import type { JobRequest } from "./types"

export async function listJobRequests(): Promise<JobRequest[]> {
  const { data } = await api.get("/job-requests")
  return data
}

export async function getJobRequest(id: string): Promise<JobRequest> {
  const { data } = await api.get(`/job-requests/${id}`)
  return data
}

export async function createJobRequest(input: {
  title: string
  description: string
  budget: number
  clientId: string
  category?: string
}): Promise<JobRequest> {
  const { data } = await api.post("/job-requests", input)
  return data
}
