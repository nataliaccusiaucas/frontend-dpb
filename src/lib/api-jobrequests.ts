import api from "./axios"

export type JobRequest = {
  id: string
  title: string
  description: string
  category: string
  budget: number
  createdAt: string
  clientId: string
}

export async function listJobRequests() {
  const { data } = await api.get("/api/jobrequests")
  return data
}

export async function createJobRequest(input: {
  title: string
  description: string
  category: string
  budget: number
}) {
  const { data } = await api.post("/api/jobrequests", input)
  return data
}

export async function getJobRequest(id: string) {
  const { data } = await api.get(`/api/jobrequests/${id}`)
  return data
}
